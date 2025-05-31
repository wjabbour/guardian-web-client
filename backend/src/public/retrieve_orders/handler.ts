import { APIGatewayProxyResult } from "aws-lambda";
import { addCors, logger } from "../utils";
import { Dynamo } from "./dynamo";

const dynamo = new Dynamo();

export const handler = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body) || "{}";
    const company_name = body.companyName;

    if (!company_name) {
      return {
        statusCode: 400,
      };
    }

    const currentOrders = await dynamo.getCurrentOrders(company_name);
    logger.info({ message: "Retrieved current orders", currentOrders });

    const archivedOrders = await dynamo.getArchivedOrders(company_name);
    logger.info({ message: "Retrieved archived orders", archivedOrders });

    return {
      statusCode: 200,
      body: JSON.stringify({ orders: [...currentOrders, ...archivedOrders] }),
      headers: addCors(),
    };
  } catch (e) {
    logger.error(e);
    return {
      statusCode: 500,
    };
  }
};
