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
    const body = JSON.parse(event.body) || "{}";
    const company_name = body.companyName;

    if (!company_name) {
      return await buildResponse(400, { message: "Missing companyName" }, origin, event);
    }

    const currentOrders = await dynamo.getCurrentOrders(company_name);
    logger.info({ message: "Retrieved current orders", currentOrders });

    const archivedOrders = await dynamo.getArchivedOrders(company_name);
    logger.info({ message: "Retrieved archived orders", archivedOrders });

    return await buildResponse(200, {
      orders: [...currentOrders, ...archivedOrders],
    }, origin, event);
  } catch (e) {
    logger.error(e);
    const origin = event.headers?.origin || event.headers?.Origin || "";
    return await buildResponse(500, { message: "Failed to retrieve orders" }, origin, event);
  }
};
