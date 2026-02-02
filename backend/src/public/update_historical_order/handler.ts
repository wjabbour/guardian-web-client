import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { logger, buildResponse, handleOptionsRequest } from "../utils";
import { Dynamo } from "./dynamo";

const dynamo = new Dynamo();

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
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

    await dynamo.updateOrderData(body.email, body.created_at, body.cart);

    return await buildResponse(200, {}, origin, event);
  } catch (e) {
    logger.error(e);
    const origin = event.headers?.origin || event.headers?.Origin || "";
    return await buildResponse(500, { message: "Failed to update order" }, origin, event);
  }
};
