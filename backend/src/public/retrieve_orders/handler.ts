import { APIGatewayProxyResult } from 'aws-lambda';
import { addCors, logger } from '../utils';
import { Dynamo } from './dynamo';

const dynamo = new Dynamo();

export const handler = async (event): Promise<APIGatewayProxyResult> => {

  try {
    const currentOrders = await dynamo.getCurrentOrders();
    logger.info({ message: 'Retrieved current orders', currentOrders });

    const archivedOrders = await dynamo.getArchivedOrders();
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