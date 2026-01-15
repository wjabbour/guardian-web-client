import { APIGatewayProxyResult } from "aws-lambda";
import { logger, buildResponse } from "../utils";
import { Dynamo } from "./dynamo";

const dynamo = new Dynamo();

export const handler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const origin = event.headers?.origin || event.headers?.Origin || "";
    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

    await dynamo.updateOrderData(body.email, body.created_at, body.cart);

    return buildResponse(200, {}, origin);
  } catch (e) {
    logger.error(e);
    const origin = event.headers?.origin || event.headers?.Origin || "";
    return buildResponse(500, { message: "Failed to update order" }, origin);
  }
};
