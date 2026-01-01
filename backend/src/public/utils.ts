import pino from "pino";
import dayjs from "dayjs";
import { SendRawEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { getStore, getConfigValue } from "guardian-common";
import { getCatalog } from "guardian-common";
import { APIGatewayProxyResult } from "aws-lambda";

export const logger = pino();

export const buildResponse = (
  statusCode: number,
  body: any
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};

export function getCatalogItemPrice(item_code, size, company_name) {
  const item = getCatalog(company_name).find((i) => {
    return i.code === item_code;
  });
  return item.sizes[size];
}

export function getCatalogItemDescription(item_code, company_name) {
  logger.info(
    `Getting item description from catalog for item code ${item_code}`
  );
  const item = getCatalog(company_name).find((i) => {
    return i.code === item_code;
  });

  if (item) {
    logger.info(`Found item: ${item.fullname}`);
  } else {
    logger.warn("Did not find item");
  }

  return item.fullname;
}

function createOrderCsv(orders): string {
  let csv = "";

  function save(obj) {
    let str = "";

    Object.keys(obj).forEach((k) => {
      str += `"${obj[k]}"` + ",";
    });

    str += "\n";
    csv += str;
  }

  csv +=
    "Date,Store Code,Store Name,First Name,Last Name,Item,Quantity,Description,Size,Color,Logo,Placement,Second Logo,Second Placement,Price,usedStoreCode,transactionId\n";

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    console.log(order);
    for (let j = 0; j < order.order.length; j++) {
      const item = order.order[j];
      const time = dayjs(Number(order.created_at));
      const formatted_time = time.format("MM/DD/YYYY");
      save({
        date: formatted_time,
        store_code: order.store,
        store_name: getStore(order.company_name, order.store),
        first_name: order.first_name,
        last_name: order.last_name,
        item: item.code,
        quantity: item.quantity,
        description: item.description,
        size: item.size || "",
        color: item.color,
        logo: item.embroidery || "",
        placement: item.placement || "",
        secondLogo: item.secondEmbroidery || "",
        secondPlacement: item.secondPlacement || "",
        price: item.price,
        usedStoreCode: order.bypass,
        transactionId: order.transaction_id || "N/A",
      });
    }
  }

  return csv;
}

function constructEmail(recipient: string, companyName: string, csv: string) {
  const date = dayjs();
  const date_str = date.format("MM-DD-YYYY");
  const buffer = Buffer.from(csv);
  let ses_mail = "From: doubleujabbour@gmail.com\n";
  ses_mail += `To: ${recipient}\n`;
  ses_mail += `Subject: Weekly ${companyName} Orders\n`;
  ses_mail += `Content-Type: text/plain; name="${date_str}-orders.csv"\n`;
  ses_mail += `Content-Disposition: attachment; filename="${date_str}-orders.csv"\n`;
  ses_mail += "Content-Transfer-Encoding: base64\n";
  ses_mail += `${buffer.toString("base64")}\n`;

  const input = {
    RawMessage: {
      Data: Buffer.from(ses_mail),
    },
  };

  return input;
}

/*
  recipient is an optional email to also send the order to. This is used
  for Cannon to send the user who just placed the order an order email
*/
export async function sendEmail(
  orders: {},
  companyName: string,
  recipient?: string
) {
  logger.info("Creating orders csv");
  const csv = createOrderCsv(orders);
  logger.info(`Created orders csv: ${csv}`);
  const ses = new SESClient({});
  const recipients: string[] = getConfigValue("email_recipients", companyName);

  if (recipient) {
    recipients.push(recipient);
  }

  for (const recipient of recipients) {
    logger.info("Preparing email");
    const input = constructEmail(recipient, companyName, csv);
    logger.info(`Sending email to ${recipient}`);
    const command = new SendRawEmailCommand(input);
    await ses.send(command);
    logger.info("Email sent");
  }

  logger.info("All emails sent");
}
