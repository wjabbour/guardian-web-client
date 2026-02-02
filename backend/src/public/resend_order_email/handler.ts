import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { logger, buildResponse, sendEmail, handleOptionsRequest } from "../utils";
import { Dynamo } from "./dynamo";

const dynamo = new Dynamo();

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // Handle OPTIONS preflight request
  const optionsResponse = handleOptionsRequest(event);
  if (optionsResponse) {
    return optionsResponse;
  }

  try {
    const origin = event.headers?.origin || event.headers?.Origin || "";
    const cookies = event.headers?.Cookie || event.headers?.cookie || "";
    const isAdmin = cookies.includes("admin_session=");

    if (!isAdmin) {
      return await buildResponse(401, {
        message: "Unauthorized: Admin access required",
      }, origin, event);
    }

    const body = JSON.parse(event.body) || "{}";
    logger.info({ message: "Received body", body });

    const { email, created_at } = body;

    if (!email || !created_at) {
      return await buildResponse(400, {
        message: "Email and created_at are required",
      }, origin, event);
    }

    let order = await dynamo.getOrder(email, created_at, "orders");

    if (!order) {
      order = await dynamo.getOrder(email, created_at, "archived_orders");
    }

    if (!order) {
      return await buildResponse(404, { message: "Order not found" }, origin, event);
    }

    await sendEmail([order], order.company_name, order.email);

    return await buildResponse(200, { message: "Email resent successfully" }, origin, event);
  } catch (e) {
    logger.error(e);
    const origin = event.headers?.origin || event.headers?.Origin || "";
    return await buildResponse(500, { message: "Failed to resend email" }, origin, event);
  }
};
