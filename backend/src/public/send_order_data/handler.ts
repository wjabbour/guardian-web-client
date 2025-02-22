import { APIGatewayProxyResult } from "aws-lambda";
import { logger, sendEmail } from "../utils";
import { Dynamo } from "./dynamo";
import { getConfigValue } from "../utils";

const dynamo = new Dynamo();

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const paidOrders = await dynamo.getPaidOrders();
    logger.info({ message: "Retrieved paid orders for the week", paidOrders });

    if (paidOrders.length === 0) {
      logger.info({ message: "No orders this week" });
      return {
        statusCode: 200,
      };
    }

    await sendEmail(paidOrders);
    await dynamo.archivePaidOrders();
    await dynamo.deleteOldUnpaidOrders();
    logger.info("deleted old unpaid orders");

    return {
      statusCode: 200,
    };
  } catch (e) {
    logger.error(e);
    return {
      statusCode: 500,
    };
  }
};

handler();
