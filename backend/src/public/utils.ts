import pino from 'pino';
import { Catalog } from './catalog';

export const logger = pino();

const ALLOWED_ORIGINS = ['http://localhost:3000', 'https://gpstivers.com', 'https://gptameron.com', 'https://gp-premier.com']


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

export const COMPANIES: { [index: string]: string } = {
  'localhost:3000': 'Stivers',
  'https://gpstivers.com': 'Stivers',
  'https://gptameron.com': 'Tameron',
  'https://gp-premier.com': 'Premier'
}

const STORES = {
  'Stivers Ford Montgomery, 4000 Eastern Blvd Montgomery, AL, 36116': "STIFMO",
  'Stivers Ford Montgomery, 500 Palisades Blvd, Birmingham, AL, 35209': "STIFBI",
  'Stivers Hyundai, 9950 Farrow Rd, Columbia, SC, 29203': "STIHCO",
  'Stivers CDJR, 2209 Cobbs Ford Road, Prattville, AL 36066': "STICPR",
  'Stivers Decatur Subaru, 1950 Orion DR, Decatur, GA 30033': "STISDE",
  'Stivers Chevrolet, 111 Newland Road, Columbia, SC 29229': "STICCO",
  'Tameron Honda, 9871 Justina Ave Daphne, AL 36526': "TAMHDA",
  'Tameron Buick GMC, 27161 US - 98 Daphne, AL 36526': "TAMBDA",
  'Tameron CDJR, 27161 US - 98 Daphne, AL 36526': "TAMCDA",
  'Tameron Subaru, 1431 I-65 Service Road Mobile, AL 36606': "TAMSMO",
  'Tameron Nissan, 1015 E. I65 Service Road South Mobile, AL 36606': "TAMNMO",
  'Tameron Kia, 10611 Boney Ave D\'Iberville, MS 39540': "TAMKDI",
  'Tameron Kia Westbank, 1884 Westbank Expressway Harvey, LA 70058': "TAMKWE",
  'Tameron Honda, 1675 Montgomery Blvd Birmingham, AL 35216': "TAMHBI",
  'Tameron Hyundai, 1595 Montgomery Hwy Hoover, AL 35216': "TAMEHO",
  'Premier Honda, 11801 E I-10 Service Rd, New Orleans, LA 70128': "PREHNE",
  'Toyota of New Orleans, 13150 I-10 Service Rd, New Orleans, LA 70128': "TOYNNE",
  'Premier Hyundai of Harvey, 1700 Westbank Expressway, Harvey, LA 70058': "PREHHA",
  'Premier Nissan of Harvey, 4000 LaPalco Boulevard, Harvey, LA 70058': "PRENHA",
  'Premier VW of Harvey, 4050 LaPalco Boulevard, Harvey, LA 70058': "PREVHA",
  'Premier CDJR of Harvey, 1660 Westbrook Expressway, Harvey, LA 70058': "PRECHB",
  'Premier Nissan, 6636 Veterans Blvd, Metarie, LA 70003': "PRENME"
}

export function getStoreCode(store) {
  return STORES[store]
}

export function getStore(store_code) {
  const keys = Object.keys(STORES)

  for (let i = 0; i < keys.length; i++) {
    if (STORES[keys[i]] === store_code) {
      return keys[i]
    }
  }
}

export function getCatalogItemPrice(item_code, size, origin) {
  const item = Catalog(origin).find((i) => { return i.code === item_code })
  return item.sizes[size]
}

export function getCatalogItemDescription(item_code, origin) {
  const item = Catalog(origin).find((i) => { return i.code === item_code })
  return item.fullname
}