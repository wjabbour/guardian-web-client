export interface CatalogItem {
  code: string;
  name: string;
  fullname: string;
  colors: string[];
  sizes: {};
  default_color: string;
  type: "mens" | "womens" | "hat" | "accessory" | "customs" | "office"| "service";
  halfColors?: string[]; // C112 is capable of being two-colored. We need this field to present specially colored divs for the color selector for those colors
  // some items are only purchasble by Service and Parts counter employees only
  restricted?: boolean;
  /*
    Customs and decals are ordered in high quantities and should have discounts applied to them when the order
    quantity reaches specific thresholds
  */
  discount?: Discount[];
}

interface Discount {
  price: number;
  quantity: number;
}

interface Embroidery {
  [key: string]: string[];
}

export interface Config {
  title: string; // the text that will appear in the browser tab
  company_logo: string; // the name of the image file to render in the navbar
  logo_placements: string[]; // the text values in the logo select on the item modification page
  embroideries: Embroidery; // the text values in the placement select on the item modification page
  stores: string[]; // the text values in the stores select on the checkout screen
  show_modification_thumbnail: boolean;
  minimum_apparel_order: boolean;
  render_logo_preview: boolean;
  bypass_codes: string[]; // the codes that will enable a user to place an order without the paypal flow
  server_hostname: string; // cannon client talks to a different server than all the other clients
  account_reps: AccountRep[]; // the account reps contact info to be displayed on the footer
}

interface AccountRep {
  name: string;
  phone: string;
}

export interface CartItem {
  code: string;
  color: string;
  quantity: number;
  size: string;
  price: number;
  placement: string;
  embroidery: string;
}

export interface Order {
  email: string;
  created_at: string;
  first_name: string;
  last_name: string;
  order: CartItem[];
  order_id: string;
  paid: 0 | 1;
  paid_at: number;
  store: string;
}
