import { APIGatewayProxyResult } from "aws-lambda";
import { logger, buildResponse } from "../utils";
import { Dynamo } from "./dynamo";

const dynamo = new Dynamo();

export const handler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body) || "{}";
    const company_name = body.companyName;

    if (!company_name) {
      return buildResponse(400, { message: "Missing companyName" });
    }

    const currentOrders = await dynamo.getCurrentOrders(company_name);
    logger.info({ message: "Retrieved current orders", currentOrders });

    const archivedOrders = await dynamo.getArchivedOrders(company_name);
    logger.info({ message: "Retrieved archived orders", archivedOrders });

    return buildResponse(200, {
      orders: [...currentOrders, ...archivedOrders],
    });
  } catch (e) {
    logger.error(e);
    return buildResponse(500, { message: "Failed to retrieve orders" });
  }
};
