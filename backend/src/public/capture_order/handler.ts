import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import {
  logger,
  addCors,
  COMPANIES,
  sendEmail,
  getConfigValue,
} from "../utils";
import axios from "axios";
import qs from "qs";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { dynamoClient } from "../dynamoClient";

const sm = new SecretsManagerClient({ region: "us-east-1" });
const command = new GetSecretValueCommand({
  SecretId: getConfigValue("secretName"),
});

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    logger.info({ message: "Retrieving credential" });
    const secret = await sm.send(command);
    const config = JSON.parse(secret.SecretString);
    logger.info({ message: "Retrieved config", config });

    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

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

    const order_id = body.order_id;
    logger.info({ message: "Received order id", order_id });

    const txId = await capture_paypal_order(access_token, order_id);
    logger.info({ message: "Captured paypal order" });

    const company_name = body.companyName;

    if (!company_name) {
      logger.warn({ message: "Unrecognized company name" });
      return {
        statusCode: 400,
      };
    }
    logger.info({ message: "Determined company name", company_name });

    const { email, created_at } = await dynamoClient.setPaid(order_id, txId);
    logger.info({ message: "Set the order as paid in the database" });
    logger.info(`Retrieved the following order keys: ${email}, ${created_at}`);

    // send cannon orders immediately
    if (email && created_at && company_name === "Cannon") {
      logger.info("Cannon order, sending immediately");
      await dynamoClient.archiveCannonOrder(created_at, email);
      const order = await dynamoClient.getOrder(email, created_at);
      await sendEmail([order], "Cannon", email);
    }

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

async function capture_paypal_order(access_token, order_id) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };

  const response = await axios.post(
    `https://api-m.paypal.com/v2/checkout/orders/${order_id}/capture`,
    null,
    { headers }
  );
  logger.info({
    message: "Received transactionId",
    transactionId: response.data.purchase_units[0].payments.captures[0].id,
  });
  return response.data.purchase_units[0].payments.captures[0].id;
}
