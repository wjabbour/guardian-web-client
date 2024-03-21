import pino from 'pino';
import { catalog } from './catalog';

export const logger = pino();

const ALLOWED_ORIGINS = ['http://localhost:3000', 'https://cannonemployeestore.com']


export function addCors(origin, map?) {

  const headers = {}

  if (!origin) return headers

  for (let i = 0; i < ALLOWED_ORIGINS.length; i++) {
    if (origin.includes(ALLOWED_ORIGINS[i])) {
      headers['Access-Control-Allow-Origin'] = ALLOWED_ORIGINS[i];
    }
  }

  return headers
}

const STORE_NAMES = ['Cannon Ford of Cleveland', 'Cannon Ford of Starkville', 'Cannon Chevrolet Buick GMC',
'Cannon Chevrolet Greenwood', 'Cannon Chevrolet Buick GMC of West Point', 'Cannon Chevrolet Buick Cadillac of Oxford',
'Cannon Honda', 'Cannon CDJR of Cleveland', 'Cannon Ford of Pascagoula', 'Cannon CDJR Greenwood', 'Cannon Preowned Grenada',
'Cannon Toyota of Vicksburg', 'Cannon Toyota of Mosspoint', 'Cannon Ford Nissan of Pascagula', 'Cannon CDJR of West Point',
'Cannon Preowned of Jackson', 'Cannon Preowned Calhoun City', 'Cannon Nissan of Greenwood', 'Cannon Nissan of Jackson',
'Cannon Nissan of Oxford', 'Grenada Nissan', 'Cannon Chevrolet Nissan of Laurel']

const STORE_CODES = ['CANFCL', 'CANLST', 'CANBCL', 'CANCGR', 'CANCWE', 'CANCOX', 'CANHPO',
'CANCCL', 'CANFPA', 'CANCGE', 'CANPGR', 'CANTVI', 'CANTMO', 'CANNPA', 'CANDWE', 'CANPJA',
'CANPCC', 'CANNGR', 'CANNJA', 'CANNOX', 'GREIGR', 'CANCLR']

export function getStoreCode(store) {
  const idx = STORE_NAMES.indexOf(store);
  return STORE_CODES[idx]
}

export function getStore(store_code) {
  const idx = STORE_CODES.indexOf(store_code);
  return STORE_NAMES[idx]
}

export function getCatalogItemPrice (item_code, size) {
  const item = catalog.find((i) => { return i.code === item_code })
  return item.sizes[size]
}

export function getCatalogItemDescription (item_code) {
  const item = catalog.find((i) => { return i.code === item_code })
  return item.fullname
}