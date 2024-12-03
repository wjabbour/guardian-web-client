import { APIGatewayProxyResult } from "aws-lambda";
import { addCors, logger } from "../utils";
import { Dynamo } from "./dynamo";

const dynamo = new Dynamo();

export const handler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

    await dynamo.updateOrderData(body.email, body.created_at, body.cart);

    return {
      statusCode: 200,
      headers: addCors(event.headers?.origin),
    };
  } catch (e) {
    logger.error(e);
    return {
      statusCode: 500,
    };
  }
};
