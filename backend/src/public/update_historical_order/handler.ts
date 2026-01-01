import { APIGatewayProxyResult } from "aws-lambda";
import { logger, buildResponse } from "../utils";
import { Dynamo } from "./dynamo";

const dynamo = new Dynamo();

export const handler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

    await dynamo.updateOrderData(body.email, body.created_at, body.cart);

    return buildResponse(200, {});
  } catch (e) {
    logger.error(e);
    return buildResponse(500, { message: "Failed to update order" });
  }
};
