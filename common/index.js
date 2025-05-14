import { config as CannonConfig } from "./configs/cannon";

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

export { CannonConfig };
