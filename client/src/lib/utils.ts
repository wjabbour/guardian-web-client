import { getWebConfigValue } from "guardian-common";

export function getDomainAwarePath(destination) {
  const prefix = getWebConfigValue("route_prefix");
  const url = window.location.href;
  const shouldPrefixRoute = url.includes("gpc81") || url.includes("localhost");

  return shouldPrefixRoute ? prefix + destination : destination;
}

export function calculate_item_count(cart) {
  let count = 0;

  Object.keys(cart).forEach((k) => {
    count += cart[k].quantity;
  });

  return count;
}

export function calculate_item_price(cart) {
  let price = 0;

  Object.keys(cart).forEach((k) => {
    price += cart[k].price * cart[k].quantity;
  });

  return price.toFixed(2);
}

export function getEmbroidery(type) {
  return getWebConfigValue("embroideries")[type];
}
