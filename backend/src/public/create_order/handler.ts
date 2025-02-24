import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import {
  logger,
  addCors,
  getStoreCode,
  getCatalogItemDescription,
  sendEmail,
  getCatalogItem,
} from "../utils";
import axios from "axios";
import qs from "qs";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { Catalog } from "../catalog";
import { COMPANIES } from "../utils";
import { dynamoClient } from "../dynamoClient";

const sm = new SecretsManagerClient({ region: "us-east-1" });
const command = new GetSecretValueCommand({
  SecretId: "stivers-website",
});

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

    if (!body.email.includes("@")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Please use a valid email" }),
        headers: addCors(event.headers?.origin),
      };
    }

    const email = body.email;
    const first_name = body.first_name;
    const customer_po = body.customer_po || "";
    const last_name = body.last_name;
    const store = getStoreCode(body.store);

    if (!store) {
      logger.warn({ message: "Unrecognized store" });
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Please select a store" }),
        headers: addCors(event.headers?.origin),
      };
    }

    logger.info({ message: "Determined store code", store });

    const cart = construct_cart(body.cart, customer_po, event.headers?.origin);
    logger.info({ message: "Constructed cart", cart });

    const price = calculate_price(cart, event.headers?.origin);
    logger.info({ message: "Calculated cart price", price });

    const company_name = COMPANIES[event.headers?.origin];
    logger.info({ message: "Determined company name", company_name });

    /*
      Tameron orders should be sent immediately, so we don't need to wait for the send_order_data cron
      to run and move the order from orders table to archived_orders
    */
    if (company_name === "Tameron") {
      // this prevents Tameron client being able to submit arbitrary orders
      if (!body.bypassPaypal) {
        logger.warn("All Tameron orders should have bypassPaypal as true");
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Must enter code to place order" }),
          headers: addCors(event.headers?.origin),
        };
      }
      logger.info({ message: "Tameron order, sending immediately" });

      const created_at = await dynamoClient.createOrder(
        {
          email,
          order: cart,
          first_name,
          last_name,
          store,
          company_name,
          customer_po,
          bypass: 1,
          order_id: "-1",
          paid: 1,
        },
        "archived_orders"
      );

      const order = await dynamoClient.getOrder(email, created_at);
      await sendEmail([order], "Tameron");
      return {
        statusCode: 200,
        headers: addCors(event.headers?.origin),
      };
    }

    if (body.bypassPaypal) {
      logger.info({ message: "Bypassing PayPal" });

      if (company_name === "Cannon") {
        const created_at = await dynamoClient.createOrder(
          {
            email,
            order: cart,
            first_name,
            last_name,
            store,
            company_name,
            customer_po,
            bypass: 1,
            order_id: "-1",
            paid: 1,
          },
          "archived_orders"
        );

        const order = await dynamoClient.getOrder(email, created_at);
        await sendEmail([order], "Cannon");
        return {
          statusCode: 200,
          headers: addCors(event.headers?.origin),
        };
      }

      // company is not cannon but is bypassPaypal
      await dynamoClient.createOrder(
        {
          email,
          order: cart,
          first_name,
          last_name,
          store,
          customer_po,
          company_name,
          bypass: 1,
          order_id: "-1",
          paid: 1,
        },
        "orders"
      );

      return {
        statusCode: 200,
        headers: addCors(event.headers?.origin),
      };
    }

    // bypassPaypal = false
    const order_id = await create_paypal_order(price);
    logger.info({ message: "Received order id", order_id });

    await dynamoClient.createOrder(
      {
        email,
        order: cart,
        first_name,
        last_name,
        store,
        customer_po,
        company_name,
        bypass: 0,
        order_id,
        paid: 0,
      },
      "orders"
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ order_id }),
      headers: addCors(event.headers?.origin),
    };
  } catch (e) {
    logger.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create order" }),
      headers: addCors(event.headers?.origin),
    };
  }
};

function construct_cart(cart: any, customer_po: string, origin: string) {
  const massaged_cart = [];
  Object.keys(cart).forEach((k) => {
    const obj = {};
    const cart_item = cart[k];

    obj["quantity"] = cart_item["quantity"];
    obj["code"] = cart_item["code"];
    obj["size"] = cart_item["size"];
    obj["color"] = cart_item["color"];
    if (cart_item["embroidery"]) obj["embroidery"] = cart_item["embroidery"];
    if (cart_item["placement"]) obj["placement"] = cart_item["placement"];
    obj["description"] = getCatalogItemDescription(cart_item["code"], origin);

    const catalog_item = getCatalogItem(
      cart_item["code"],
      cart_item["size"],
      origin
    );

    obj["price"] = getPriceWithDiscount(
      catalog_item,
      obj["size"],
      obj["quantity"]
    );

    obj["customer_po"] = customer_po;
    massaged_cart.push(obj);
  });

  return massaged_cart;
}

function getPriceWithDiscount(item, size, quantity) {
  if (!item.discount) {
    return item.sizes[size];
  }

  /*
    this is currently the case for all items with discounts (all items with a discount property
    also have only one size, default)

    but im adding this check so we dont accidentally apply this logic to future items which may require
    discounts but have multiple sizes
  */
  if (Object.keys(item.sizes).length === 1) {
    let basePrice = item.sizes["default"];
    for (let i = 0; i < item.discount.length; i++) {
      if (quantity >= item.discount[i].quantity)
        basePrice = item.discount[i].price;
    }

    return basePrice;
  }
}

function calculate_price(cart, origin) {
  let price = 0;

  cart.forEach((item) => {
    logger.info({ message: "Determining price for item", item });
    const catalog_item = Catalog(origin).find((i) => item.code === i.code);
    logger.info({ message: "Retrieved catalog item", catalog_item });
    price += item.price * item.quantity;
    logger.info({ message: "Updated price", price, quantity: item.quantity });
  });

  return price.toFixed(2);
}

async function create_paypal_order(price) {
  logger.info({ message: "Retrieving credential" });
  const secret = await sm.send(command);

  const config = JSON.parse(secret.SecretString);
  logger.info({ message: "Retrieved config", config });

  const retrieve_access_token_headers = {
    Authorization: `Basic ${config.credential}`,
  };

  const form_data = {
    grant_type: "client_credentials",
  };

  const token_response = await axios.post(
    "https://api-m.paypal.com/v1/oauth2/token",
    qs.stringify(form_data),
    { headers: retrieve_access_token_headers }
  );
  const access_token = token_response.data.access_token;
  logger.info({ message: "Retrieved access token", access_token });

  const create_order_headers = {
    Authorization: `Bearer ${access_token}`,
  };

  const create_order_body = {
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: `${price}`,
        },
        // TODO: create uuid
        reference_id: "123",
      },
    ],
    intent: "CAPTURE",
    payment_source: {
      paypal: {
        experience_context: {
          payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
          payment_method_selected: "PAYPAL",
          brand_name: "Guardian",
          locale: "en-US",
          landing_page: "LOGIN",
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
        },
      },
    },
  };

  const order_response = await axios.post(
    "https://api-m.paypal.com/v2/checkout/orders",
    create_order_body,
    { headers: create_order_headers }
  );
  console.log("order response", order_response);
  return order_response.data.id;
}
