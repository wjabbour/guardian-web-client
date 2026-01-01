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
    | "sales"
    | "detail"
    | "bodyshop"
    | "parts"
    | "tshirts"
    | "service";

  halfColors?: string[]; // C112 is capable of being two-colored. We need this field to present specially colored divs for the color selector for those colors
  // some items are only purchasble by Service and Parts counter employees only
  restricted?: boolean;
  /**
   * An array of addresses of the stores which are able to order this particular item. If a store is not in this array, then this item
   * wont be shown when viewing the customs items for that store.
   */
  supportedStores?: string[];
}

interface Embroidery {
  [key: string]: string[];
}

export interface Config {
  title: string; // VERY IMPORTANT: this value is passed to the backend in every API so the backend can perform company specific logic... this is also the text that will appear in the browser tab
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
  /** for gpc81, prepends the store name to the url */
  route_prefix?: string;
  // true for websites where we dont want to show the end user the paypal buttons during checkout
  paypal_not_supported?: boolean;
  /** for gpc81, the password that the user will enter to navigate to this website */
  password?: string;
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
