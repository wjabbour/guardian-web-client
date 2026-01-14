import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import {
  logger,
  buildResponse,
} from "../utils";
import { dynamoClient } from "../dynamoClient";

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

    const { email, created_at } = body;

    if (!email || !created_at) {
      return buildResponse(400, { message: "email and created_at are required" });
    }

    await dynamoClient.deleteOrder(created_at, email);

    return buildResponse(200, { message: "Order deleted successfully" });
  } catch (e) {
    logger.error(e);
    return buildResponse(500, { message: "Failed to delete order" });
  }
};
