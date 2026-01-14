import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import {
  logger,
  buildResponse,
} from "../utils";
import { dynamoClient } from "../dynamoClient";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

    const { order_id } = body;

    if (!order_id) {
      return buildResponse(400, { message: "order_id is required" });
    }

    const command = new QueryCommand({
      Select: "ALL_ATTRIBUTES",
      ExpressionAttributeValues: {
        ":order_id": order_id,
      },
      KeyConditionExpression: "order_id = :order_id",
      TableName: "orders",
      IndexName: "order-id-index",
    });

    const response = await dynamoClient.documentClient.send(command);

    if (response.Items.length === 0) {
      return buildResponse(404, { message: "Order not found" });
    }

    const item = response.Items[0];
    const { email, created_at } = item;

    await dynamoClient.deleteOrder(created_at, email);

    return buildResponse(200, { message: "Order deleted successfully" });
  } catch (e) {
    logger.error(e);
    return buildResponse(500, { message: "Failed to delete order" });
  }
};
