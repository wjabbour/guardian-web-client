import pino from "pino";
import { Catalog } from "./catalog";
import dayjs from "dayjs";
import { SendRawEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { cannonConfig } from "./configs/cannon";
import { standardConfig } from "./configs/standard";
import { Config } from "./interfaces";

export const logger = pino();

// TODO: these should live in configs so that only cannon server allows cannon origin, etc
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://newcustomer.gpstivers.com",
  "https://gpstivers.com",
  "https://gptameron.com",
  "https://gp-premier.com",
  "https://cannonemployeestore.com",
];

export function addCors(origin, map?) {
  const headers = {};

  if (!origin) return headers;

  for (let i = 0; i < ALLOWED_ORIGINS.length; i++) {
    if (origin.includes(ALLOWED_ORIGINS[i])) {
      headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGINS[i];
    }
  }

  return headers;
}

export function getConfigValue(
  configProperty: string
): Config[typeof configProperty] {
  const deployment = process.env["DEPLOYMENT"];
  if (deployment === "standard") {
    return standardConfig[configProperty];
  }

  return standardConfig[configProperty];
}

export const COMPANIES: { [index: string]: string } = {
  "http://localhost:3000": "Stivers",
  "https://gpstivers.com": "Stivers",
  "https://newcustomer.gpstivers.com": "Stivers",
  "https://gptameron.com": "Tameron",
  "https://gp-premier.com": "Premier",
  "https://cannonemployeestore.com": "Cannon",
};

const STORES = {
  "Cannon Ford of Cleveland": "CANFCL",
  "Cannon Ford of Starkville": "CANLST",
  "Cannon Chevrolet Buick GMC": "CANBCL",
  "Cannon Chevrolet Greenwood": "CANCGR",
  "Cannon Chevrolet Buick GMC of West Point": "CANCWE",
  "Cannon Chevrolet Buick Cadillac of Oxford": "CANCOX",
  "Cannon Honda": "CANHPO",
  "Cannon CDJR of Cleveland": "CANCCL",
  "Cannon Ford of Pascagoula": "CANFPA",
  "Cannon CDJR Greenwood": "CANCGE",
  "Cannon Preowned Grenada": "CANPGR",
  "Cannon Toyota of Vicksburg": "CANTVI",
  "Cannon Toyota of Mosspoint": "CANTMO",
  "Cannon Nissan of Moss Point": "CANNMO",
  "Cannon CDJR of West Point": "CANDWE",
  "Cannon Preowned of Jackson": "CANPJA",
  "Cannon Preowned Calhoun City": "CANPCC",
  "Cannon Nissan of Greenwood": "CANNGR",
  "Cannon Nissan of Jackson": "CANNJA",
  "Cannon Nissan of Oxford": "CANNOX",
  "Grenada Nissan": "GREIGR",
  "Cannon Chevrolet Nissan of Laurel": "CANCLR",
  "Cannon GMC Vicksburg": "CANBVI",
  "Cannon CDJR Senatobia": "CANCSE",
  "Stivers Ford Montgomery, 4000 Eastern Blvd Montgomery, AL, 36116": "STIFMO",
  "Stivers Ford Montgomery, 500 Palisades Blvd, Birmingham, AL, 35209":
    "STIFBI",
  "Stivers Hyundai, 9950 Farrow Rd, Columbia, SC, 29203": "STIHCO",
  "Stivers CDJR, 2209 Cobbs Ford Rd, Prattville, AL 36066": "STICPR",
  "Stivers Decatur Subaru, 1950 Orion Dr, Decatur, GA 30033": "STISDE",
  "Stivers Chevrolet, 111 Newland Road, Columbia, SC 29229": "STICCO",
  "Stivers Ford South Atlanta, 4355 Jonesboro Rd, Union City, GA 30291":
    "STIFSO",
  "Stivers Ford Troy, 121 US-231, Troy, AL 36081": "STIFTR",
  "Tameron Honda, 9871 Justina Ave Daphne, AL 36526": "TAMHDA",
  "Tameron Buick GMC, 27161 US - 98 Daphne, AL 36526": "TAMBDA",
  "Tameron CDJR, 27161 US - 98 Daphne, AL 36526": "TAMCDA",
  "Tameron Subaru, 1431 I-65 Service Road Mobile, AL 36606": "TAMSMO",
  "Tameron Nissan, 1015 E. I65 Service Road South Mobile, AL 36606": "TAMNMO",
  "Tameron Kia, 10611 Boney Ave D, Iberville, MS 39540": "TAMKDI",
  "Tameron Kia Westbank, 1884 Westbank Expressway Harvey, LA 70058": "TAMKWE",
  "Premier Honda, 11801 E I-10 Service Rd, New Orleans, LA 70128": "PREHNE",
  "Toyota of New Orleans, 13150 I-10 Service Rd, New Orleans, LA 70128":
    "TOYNNE",
  "Premier Hyundai of Harvey, 1700 Westbank Expressway, Harvey, LA 70058":
    "PREHHA",
  "Premier Nissan of Harvey, 4000 LaPalco Boulevard, Harvey, LA 70058":
    "PRENHA",
  "Premier VW of Harvey, 4050 LaPalco Boulevard, Harvey, LA 70058": "PREVHA",
  "Premier CDJR of Harvey, 1660 Westbrook Expressway, Harvey, LA 70058":
    "PRECHB",
  "Premier Nissan, 6636 Veterans Blvd, Metarie, LA 70003": "PRENME",
  "Leith Acura, 2300 Capital Summit Court, Raleigh, NC 27616": "10118LEIARA",
  "Chris Leith Automotive, PO Box 1707, Wake Forest, NC 27588": "CHRIWA",
  "Leith Acura, 2300 Capital Summit Ct, Raleigh, NC 27616": "LEIARA",
  "Leith CDJR, 11220 N. US HWY 15 501 N, Aberdeen, NC 27603": "LEICAB",
  "Leith Chrysler Jeep, 400 Autopark Boulevard, Cary, NC 27511": "LEICCA",
  "Leith Corporate Headquarters, 8005 Capital Blvd, Raleigh, NC 27616":
    "LEICRA",
  "Leith Ford, PO Box 1809, Wendell, NC 27591": "LEIFWE",
  "Leith Honda, 3940 Capital Hills Drive, Raleigh, NC 27616": "LEIHRA",
  "Leith Lincoln, 2350 Capital Summit Ct, Raleigh, NC 27616": "LEILRA",
  "Leith Nissan, 2100 Auto Park Drive, Cary, NC 27511": "LEINCA",
  "Leith Nissan, 2000 Auto Park Drive, Cary, NC 27511": "LEITCA",
  "Leith BMW/Mercedes Benz, 5603 Capital Blvd, Raleigh, NC 27616": "LEITR2",
  "Leith Mercedes, 5601 Capital Boulevard, Raleigh, NC 27616": "LEITRA",
  "Leith Toyota, 8005 Capital Blvd, Raleigh, NC 27616": "LEITRL",
  "Leith Autopark Kia, 5330 Rolesville Rd, Wendell, NC 27591": "LEITWE",
  "Leith Volkswagen, 4005 Capital Hills Drive, Raleigh, NC 27616": "LEIVRA",
  "Leith Chrysler Jeep, 5500 Capital Blvd, Raleigh, NC 27619": "LETCRA",
  "Hennessy Jaguar Land Rover, 3040 Piedmont Rd NE, Atlanta, GA 30305":
    "HENCAT",
  "Hennessy Cadillac, 3377 Satellite Blvd, Duluth, GA 30096": "HENCDU",
  "Hennessy Ford, 5675 Peachtree Ind Blvd, Atlanta, GA 30341": "HENFAT",
  "Hennessy Honda, 8931 Highway 92, Woodstock, GA 30189": "HENHWO",
  "Hennessy Jaguar, 3423 Old Norcross Rd, Duluth, GA 30096": "HENJDU",
  "Hennessy Land Rover, 1505 Mansell Rd, Alpharetta, GA 30004": "HENLAL",
  "Hennessy Lexus, 5955 Peachtree Ind Blvd, Atlanta, GA 30341": "HENLAT",
  "Hennessy Lexus Duluth, 3383 Satellite Blvd, Duluth, GA 30096": "HENLDU",
  "Hennessy Mazda Buick GMC, 7261 Jonesboro Rd, Morrow, GA 30260": "HENMMO",
  "Hennessy Porsche Marietta, 2501 Windy Hill Rd SE, Marietta, GA 30067":
    "HENPMA",
  "Hennessy Porsche, 990 Mansell Rd, Roswell, GA 30076": "HENPRO",
};

export function getStoreCode(store) {
  return STORES[store];
}

export function getStore(store_code) {
  const keys = Object.keys(STORES);

  for (let i = 0; i < keys.length; i++) {
    if (STORES[keys[i]] === store_code) {
      return keys[i];
    }
  }
}

export function getCatalogItem(item_code, size, origin) {
  return Catalog(origin).find((i) => {
    return i.code === item_code;
  });
}

export function getCatalogItemPrice(item_code, size, origin) {
  const item = Catalog(origin).find((i) => {
    return i.code === item_code;
  });
  return item.sizes[size];
}

export function getCatalogItemDescription(item_code, origin) {
  logger.info(
    `Getting item description from catalog for item code ${item_code}`
  );
  const item = Catalog(origin).find((i) => {
    return i.code === item_code;
  });

  if (item) {
    logger.info(`Found item: ${item.fullname}`);
  } else {
    logger.warn("Did not find item");
  }

  return item.fullname;
}

function createOrderCsv(orders) {
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
    "Date,Store Code,Store Name,First Name,Last Name,Item,Quantity,Description,Size,Color,Logo,Placement,Price,usedStoreCode,transactionId\n";

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
        store_name: getStore(order.store),
        first_name: order.first_name,
        last_name: order.last_name,
        item: item.code,
        quantity: item.quantity,
        description: item.description,
        size: item.size || "",
        color: item.color,
        logo: item.embroidery || "",
        placement: item.placement || "",
        price: item.price,
        usedStoreCode: order.bypass,
        transactionId: order.transaction_id || "N/A",
      });
    }
  }

  return csv;
}

// TODO: send order to kristy if cannon
export async function sendEmail(orders: {}, companyName: string) {
  logger.info("Creating orders csv");
  const csv = createOrderCsv(orders);
  logger.info("Created orders csv", csv);
  const ses = new SESClient({});
  const recipients: string[] = getConfigValue("email_recipients");

  logger.info("Preparing email");
  const date = dayjs();
  const date_str = date.format("MM-DD-YYYY");
  const buffer = Buffer.from(csv);
  let ses_mail = "From: doubleujabbour@gmail.com\n";
  ses_mail += `To: ${recipients.join(", ")}\n`;
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

  logger.info("Sending email");
  const command = new SendRawEmailCommand(input);
  await ses.send(command);
  logger.info("Email sent");
}
