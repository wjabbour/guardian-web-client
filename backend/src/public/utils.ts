import pino from 'pino';
import { catalog } from './catalog';

export const logger = pino();

const ALLOWED_ORIGINS = ['http://localhost:3000', 'https://gpstivers.com']


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

const STORE_NAMES = [
  'Stivers Ford Montgomery, 4000 Eastern Blvd Montgomery, AL, 36116',  
  'Stivers Ford Montgomery, 500 Palisades Blvd, Birmingham, AL, 35209', 
  'Stivers Hyundai, 9950 Farrow Rd, Columbia, SC, 29203', 
  'Stivers CDJR, 2209 Cobbs Ford Road, Prattville, AL 36066', 
  'Stivers Decatur Subaru, 1950 Orion DR, Decatur, GA 30033', 
  'Stivers Chevrolet, 111 Newland Road, Columbia, SC 29229', 
]

const STORE_CODES = ["STIFMO", "STIFBI", "STIHCO", "STICPR", "STISDE", "STICCO"]

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