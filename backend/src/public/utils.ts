import pino from "pino";
import dayjs from "dayjs";
import { SendRawEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { getStore, getConfigValue } from "guardian-common";
import { getCatalog } from "guardian-common";
import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

export const logger = pino();

const ALLOWED_ORIGINS = [
  "https://localhost:3000",
  "https://gpc81.com",
  "https://cannonemployeestore.com",
  "https://gpstivers.com",
  "https://gptameron.com",
];

export const handleOptionsRequest = (
  event: APIGatewayEvent
): APIGatewayProxyResult | null => {
  if (event.httpMethod !== "OPTIONS") {
    return null;
  }

  const origin = event.headers?.origin || event.headers?.Origin || "";
  let allowedOrigin = ALLOWED_ORIGINS[0]; // Default to first allowed origin

  if (origin) {
    const normalizedOrigin = origin.trim();
    if (ALLOWED_ORIGINS.includes(normalizedOrigin)) {
      allowedOrigin = normalizedOrigin;
    }
  }

  return {
    statusCode: 200,
    body: "",
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "86400", // 24 hours
    },
  };
};

async function sendErrorNotification(
  statusCode: number,
  body: any,
  event?: APIGatewayEvent
): Promise<void> {
  try {
    const adminEmail = "doubleujabbour@gmail.com";
    const ses = new SESClient({});

    const errorType = statusCode >= 500 ? "5xx Server Error" : "4xx Client Error";
    const path = event?.path || "unknown";
    const method = event?.httpMethod || "unknown";
    let requestBody = null;
    try {
      requestBody = event?.body ? JSON.parse(event.body) : null;
    } catch (e) {
      requestBody = event?.body || "Unable to parse request body";
    }
    const errorMessage = body?.message || JSON.stringify(body);
    const timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const emailBody = `
Backend Error Notification

Error Type: ${errorType}
Status Code: ${statusCode}
Timestamp: ${timestamp}

Endpoint: ${method} ${path}
Error Message: ${errorMessage}

Request Details:
${requestBody ? JSON.stringify(requestBody, null, 2) : "No request body"}

Headers:
${event?.headers ? JSON.stringify(event.headers, null, 2) : "No headers"}
    `.trim();

    let ses_mail = `From: orders@gpc81.com\n`;
    ses_mail += `To: ${adminEmail}\n`;
    ses_mail += `Subject: [${errorType}] ${statusCode} Error - ${path}\n`;
    ses_mail += `Content-Type: text/plain; charset=utf-8\n`;
    ses_mail += "\n";
    ses_mail += emailBody;

    const input = {
      RawMessage: {
        Data: Buffer.from(ses_mail),
      },
    };

    const command = new SendRawEmailCommand(input);
    await ses.send(command);
    logger.info(`Error notification email sent to ${adminEmail}`);
  } catch (error) {
    // Don't fail the request if email sending fails
    logger.error({ message: "Failed to send error notification email", error });
  }
}

export const buildResponse = async (
  statusCode: number,
  body: any,
  origin?: string,
  event?: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // Send error notification for 4xx and 5xx errors
  if (statusCode >= 400 && event) {
    // Fire and forget - don't wait for email to send
    sendErrorNotification(statusCode, body, event).catch((error) => {
      logger.error({ message: "Error sending notification email", error });
    });
  }

  // Determine which origin to allow based on the provided origin
  let allowedOrigin = ALLOWED_ORIGINS[0]; // Default to first allowed origin

  if (origin) {
    // Check if the provided origin is in the allowed list
    const normalizedOrigin = origin.trim();
    if (ALLOWED_ORIGINS.includes(normalizedOrigin)) {
      allowedOrigin = normalizedOrigin;
    }
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Credentials": "true",
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
    "Date,Store Code,Store Name,First Name,Last Name,Item,Quantity,Description,Size,Color,Logo,Placement,Second Logo,Second Placement,Price,usedStoreCode,transactionId,orderId\n";

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    console.log(order);
    for (let j = 0; j < order.order.length; j++) {
      const item = order.order[j];
      const time = dayjs(Number(order.created_at));
      const formatted_time = time.format("MM/DD/YYYY");
      const itemCode = item.sapVariation 
        ? `${item.code}${item.sapVariation}` 
        : item.code;
      save({
        date: formatted_time,
        store_code: order.store,
        store_name: getStore(order.company_name, order.store),
        first_name: order.first_name,
        last_name: order.last_name,
        item: itemCode,
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
        orderId: order.order_id || "N/A",
      });
    }
  }

  return csv;
}

function constructEmail(recipient: string, companyName: string, csv: string) {
  const fromAddress = companyName === 'Cannon' ? 'orders@cannonemployeestore.com' : 'orders@gpc81.com'
  const date = dayjs();
  const date_str = date.format("MM-DD-YYYY");
  const buffer = Buffer.from(csv);
  let ses_mail = `From: ${fromAddress}\n`;
  ses_mail += `To: ${recipient}\n`;
  ses_mail += `Subject: Weekly ${companyName} Orders\n`;
  ses_mail += `Content-Type: text/csv; name="${date_str}-orders.csv"\n`;
  ses_mail += `Content-Disposition: attachment; filename="${date_str}-orders.csv"\n`;
  ses_mail += "Content-Transfer-Encoding: base64\n";
  ses_mail += "\n"; // separate email headers from body
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
  adminOnly: if true, only send to recipient and skip config email recipients
*/
export async function sendEmail(
  orders: {},
  companyName: string,
  recipient?: string,
  adminOnly?: boolean
) {
  logger.info("Creating orders csv");
  const csv = createOrderCsv(orders);
  logger.info(`Created orders csv: ${csv}`);
  const ses = new SESClient({});
  const recipients: string[] = [];

  if (adminOnly) {
    // Admin mode: only send to the recipient (order email), not config emails
    if (recipient) {
      recipients.push(recipient);
    }
  } else {
    // Normal mode: send to config recipients and optionally add recipient
    recipients.push(...getConfigValue("email_recipients", companyName));
    if (recipient) {
      recipients.push(recipient);
    }
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
