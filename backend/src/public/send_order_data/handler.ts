import { APIGatewayProxyResult } from 'aws-lambda';
import { logger } from '../utils';
import { Dynamo } from './dynamo';
import { getStore, getCatalogItemDescription, getCatalogItemPrice } from "../utils";
import dayjs from 'dayjs';
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';

const dynamo = new Dynamo();
const ses = new SESClient({});

export const handler = async (): Promise<APIGatewayProxyResult> => {

  try {
    const orders = await dynamo.getPaidOrders();
    logger.info({ message: 'Retrieved orders for the week', orders });

    if (orders.length === 0) {
      logger.info({ message: 'No orders this week' });
      return {
        statusCode: 200
      }
    }

    const csv = createOrderCsv(orders)
    logger.info({ message: 'Created CSV file of orders' });

    await sendEmail(csv)
    logger.info({ message: 'Successfully sent CSV file to Guardian' });

    await dynamo.archivePaidOrders()
    logger.info('successfully triggered lambda')

    await dynamo.deleteOldUnpaidOrders();
    logger.info('deleted old unpaid orders')

    return {
      statusCode: 200,
    };
  } catch (e) {
    logger.error(e)
    return {
      statusCode: 500,
    }
  }
};

function createOrderCsv(orders) {
  let csv = ''

  function save(obj) {
    let str = ''

    Object.keys(obj).forEach((k) => {
      str += obj[k] + ','
    })

    str += '\n'
    csv += str
  }

  csv += 'Date,Store Code,Store Name,First Name,Last Name,Item,Quantity,Description,Size,Color,Price\n'

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    console.log(order)
    for (let j = 0; j < order.order.length; j++) {
      const item = order.order[j];
      const time = dayjs(Number(order.created_at))
      const formatted_time = time.format('MM/DD/YYYY')
      save({
        date: formatted_time,
        store_code: order.store,
        store_name: getStore(order.store),
        first_name: order.first_name,
        last_name: order.last_name,
        item: item.code,
        quantity: item.quantity,
        description: getCatalogItemDescription(item.code),
        size: item.size,
        color: item.color,
        price: getCatalogItemPrice(item.code, item.size)
      })
    }
  }

  return csv
}

async function sendEmail(csv) {
  const date = dayjs()
  const date_str = date.format('MM-DD-YYYY')
  const buffer = Buffer.from(csv)
  let ses_mail = 'From: Cannon Employee Store <turner@cannonemployeestore.com>\n'
  ses_mail += `To: doubleujabbour@gmail.com\n`
  ses_mail += 'Subject: Weekly Cannon Orders\n'
  ses_mail += `Content-Type: text/plain; name="${date_str}-orders.csv"\n`
  ses_mail += `Content-Disposition: attachment; filename="${date_str}-orders.csv"\n`
  ses_mail += 'Content-Transfer-Encoding: base64\n'
  ses_mail += `${buffer.toString('base64')}\n`

  const input = {
    RawMessage: {
      Data: Buffer.from(ses_mail),
    },
  };

  const command = new SendRawEmailCommand(input);
  await ses.send(command);
}

