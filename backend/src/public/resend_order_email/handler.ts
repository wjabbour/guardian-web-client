import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { logger, buildResponse, sendEmail } from "../utils";
import { Dynamo } from "./dynamo";

const dynamo = new Dynamo();

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const origin = event.headers?.origin || event.headers?.Origin || "";
    const cookies = event.headers?.Cookie || event.headers?.cookie || "";
    const isAdmin = cookies.includes("admin_session=");

    if (!isAdmin) {
      return buildResponse(401, {
        message: "Unauthorized: Admin access required",
      }, origin);
    }

    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

    const { email, created_at } = body;

    if (!email || !created_at) {
      return buildResponse(400, {
        message: "Email and created_at are required",
      }, origin);
    }

    let order = await dynamo.getOrder(email, created_at, "orders");

    if (!order) {
      order = await dynamo.getOrder(email, created_at, "archived_orders");
    }

    if (!order) {
      return buildResponse(404, { message: "Order not found" }, origin);
    }

    await sendEmail([order], order.company_name, order.email);

    return buildResponse(200, { message: "Email resent successfully" }, origin);
  } catch (e) {
    logger.error(e);
    const origin = event.headers?.origin || event.headers?.Origin || "";
    return buildResponse(500, { message: "Failed to resend email" }, origin);
  }
};
