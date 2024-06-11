import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { logger, addCors, getStoreCode } from '../utils';
import { Dynamo } from './dynamo';
import axios from 'axios';
import qs from 'qs'
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { catalog } from '../catalog';

const dynamo = new Dynamo();
const sm = new SecretsManagerClient({ region: 'us-east-1' });
const command = new GetSecretValueCommand({
  SecretId: 'stivers-website'
})

// once an order has been processed and sent to Guardian, we move it to the archived_orders table
interface Order {
  paid: number; // this is set to 1 once the user pays via Paypal
  code: string;
  quantity: number;
  first_name: string;
  last_name: string;
  store: string;
  email: string;
  order_id: string; // this is the id from Paypal. We need this during capture to find the order to set paid=true
}

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    logger.info({ message: 'Retrieving credential' })
    const secret = await sm.send(command);
    const config = JSON.parse(secret.SecretString);
    logger.info({ message: 'Retrieved config', config })

    const body = JSON.parse(event.body) || '{}';
    logger.info({ message: 'Received body', body })

    if (!body.email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Please use a valid email' }),
        headers: addCors(event.headers?.origin)
      };
    }

    const retrieve_access_token_headers = {
      Authorization: `Basic ${config.credential}`
    };

    const form_data = {
      'grant_type': 'client_credentials'
    }

    const token_response = await axios.post('https://api-m.paypal.com/v1/oauth2/token', qs.stringify(form_data), { headers: retrieve_access_token_headers })
    const access_token = token_response.data.access_token;
    logger.info({ message: 'Retrieved access token', access_token });

    const cart = []
    const store_code = getStoreCode(body.store)

    if (!store_code) {
      logger.warn({ message: 'Unrecognized store' })
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Please select a store' }),
        headers: addCors(event.headers?.origin)
      }
    }

    logger.info({ message: 'Determined store code', store_code });

    Object.keys(body.cart).forEach((k) => {
      const obj = {}
      const cart_item = body.cart[k];

      obj['quantity'] = cart_item['quantity']
      obj['code'] = cart_item['code']
      obj['size'] = cart_item['size']
      obj['color'] = cart_item['color']
      obj['embroidery'] = cart_item['embroidery']
      obj['placement'] = cart_item['placement']

      cart.push(obj)
    })

    logger.info({ message: 'Constructed cart', cart });

    const price = calculate_price(cart);
    logger.info({ message: 'Calculated cart price', price });

    if (body.bypassPaypal) {
      logger.info({ message: 'Bypassing PayPal' })
      await dynamo.createBypassOrder(body.email, cart, body.first_name, body.last_name, store_code)
      return {
        statusCode: 200,
        headers: addCors(event.headers?.origin)
      };
    } else {
      const order_id = await create_paypal_order(access_token, price);
      logger.info({ message: 'Received order id', order_id })

      await dynamo.createOrder(body.email, cart, body.first_name, body.last_name, store_code, order_id)

      return {
        statusCode: 200,
        body: JSON.stringify({ order_id }),
        headers: addCors(event.headers?.origin)
      };
    }



  } catch (e) {
    logger.error(e)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to create order' }),
      headers: addCors(event.headers?.origin)
    }
  }
};

function calculate_price(cart) {
  let price = 0;

  cart.forEach((item) => {
    logger.info({ message: 'Determining price for item', item })
    const catalog_item = catalog.find((i) => item.code === i.code)
    logger.info({ message: 'Retrieved catalog item', catalog_item })
    price += catalog_item.sizes[item.size] * item.quantity
    logger.info({ message: 'Updated price', price, quantity: item.quantity })
  })

  return price.toFixed(2);
}

async function create_paypal_order(access_token, price) {
  const create_order_headers = {
    Authorization: `Bearer ${access_token}`
  };

  const create_order_body = {
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: `${price}`
        },
        // TODO: create uuid
        reference_id: "123"
      }
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
        }
      }
    }
  }

  const order_response = await axios.post('https://api-m.paypal.com/v2/checkout/orders', create_order_body, { headers: create_order_headers })
  console.log('order response', order_response)
  return order_response.data.id;
}