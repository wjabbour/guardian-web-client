import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { logger, buildResponse, handleOptionsRequest } from "../utils";
import { Dynamo } from "./dynamo";

const dynamo = new Dynamo();

export const handler = async (event?: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  // Handle OPTIONS preflight request
  if (event) {
    const optionsResponse = handleOptionsRequest(event);
    if (optionsResponse) {
      return optionsResponse;
    }
  }

  try {
    const origin = event?.headers?.origin || event?.headers?.Origin || "";
    /*
      This used to be responsible for sending Louis the order email, but now he wants
      to receive the order emails immediately, instead of getting a batch at the end of the week.

      We need to move the logic of archiving and deleting paid orders to the capture and create order APIs and remove this 
      job
    */
    await dynamo.archivePaidOrders();
    await dynamo.deleteOldUnpaidOrders();
    logger.info("deleted old unpaid orders");

    return await buildResponse(200, {}, origin, event);
  } catch (e) {
    logger.error(e);
    const origin = event?.headers?.origin || event?.headers?.Origin || "";
    return await buildResponse(500, { message: "Failed to run job" }, origin, event);
  }
};
