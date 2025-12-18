export interface CatalogItem {
  code: string;
  name: string;
  fullname: string;
  colors: string[];
  sizes: {};
  default_color: string;
  type:
  | "mens"
  | "womens"
  | "hat"
  | "accessory"
  | "customs"
  | "office"
  | "service"
  | "sales"
  | "tshirts"
  | "detail"
  | "bodyshop"
  | "parts";
  halfColors?: string[]; // C112 is capable of being two-colored. We need this field to present specially colored divs for the color selector for those colors
  // some items are only purchasble by Service and Parts counter employees only
  restricted?: boolean;
}

// once an order has been processed and sent to Guardian, we move it to the archived_orders table
interface Order {
  paid: number; // this is set to 1 once the user pays via Paypal
  code: string;
  quantity: number;
  first_name: string;
  last_name: string;
  store: string;
  email: string;
  order_id: string; // this is the id from Paypal. We need this during capture to find the order to set paid=true
}