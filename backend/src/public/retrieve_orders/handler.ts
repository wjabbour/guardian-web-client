import { APIGatewayProxyResult } from 'aws-lambda';
import { addCors, logger } from '../utils';
import { Dynamo } from './dynamo';
import { COMPANIES } from "../utils";

const dynamo = new Dynamo();

export const handler = async (event): Promise<APIGatewayProxyResult> => {

  try {
    const company_name = COMPANIES[event.headers?.origin]
  
    const currentOrders = await dynamo.getCurrentOrders(company_name);
    logger.info({ message: 'Retrieved current orders', currentOrders });

    const archivedOrders = await dynamo.getArchivedOrders(company_name);
    logger.info({ message: 'Retrieved archived orders', archivedOrders });

    return {
      statusCode: 200,
      body: JSON.stringify({ orders: [...currentOrders, ...archivedOrders] }),
      headers: addCors(event.headers?.origin)
    };
  } catch (e) {
    logger.error(e)
    return {
      statusCode: 500,
    }
  }
};