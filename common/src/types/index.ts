/**
 * Pricing structure for a specific size.
 * Keys in the discount object represent quantity thresholds, values represent the price at that threshold.
 * Discounts are assumed to decrease as quantity increases.
 */
export interface SizePricing {
  price: number;
  discount?: {
    [quantity: number]: number; // quantity threshold -> price
  };
}

/**
 * Pricing structure for catalog items.
 * Keys can be "base" (for items without sizes) or size names (e.g., "Small", "Medium", "OSFA").
 */
export interface Pricing {
  [size: string]: SizePricing;
}

export interface CatalogItem {
  code: string;
  name: string;
  fullname: string;
  colors?: string[]; // Optional - some items (like service items) don't have colors
  sizes?: string[]; // Optional array of size names (e.g., ["Small", "Medium", "Large"] or ["OSFA"])
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
  /**
   * Pricing structure for the item.
   * Keys are size names or "base" for items without sizes.
   * Each size can have a base price and optional quantity-based discounts.
   */
  pricing: Pricing;
  /**
   * Sub-category of the item (e.g., "tshirt").
   * Used to determine which embroideries/logos are available on the modification page.
   */
  sub_category?: string;
  /**
   * Product description text displayed on the modification page.
   * Can use backticks for multi-line formatting.
   */
  description?: string;
  /**
   * Array of variation options (e.g., year stickers: ["2007", "2008", "2009", ...]).
   */
  variations?: string[];
  /**
   * Subset of colors that should have their color preview set as a half-colored box.
   * Currently only used for hats. Each option must contain exactly two colors.
   */
  halfColors?: string[];
  /**
   * Some items are only purchasable by Service and Parts counter employees only.
   */
  restricted?: boolean;
  /**
   * An array of addresses of the stores which are able to order this particular item.
   * If a store is not in this array, then this item won't be shown when viewing the customs items for that store.
   */
  supportedStores?: string[];
}

export interface CartItem {
  code: string;
  color: string;
  quantity: number;
  size: string;
  price: number;
  name: string;
  type: string;
  placement?: string;
  embroidery?: string;
  secondEmbroidery?: string;
  secondPlacement?: string;
}

export interface Embroidery {
  [key: string]: string[];
}

export interface AccountRep {
  name: string;
  phone: string;
}

export interface Store {
  name: string;
  address: string;
  code: string;
  password?: string;
}

export interface Config {
  title: string; // VERY IMPORTANT: this value is passed to the backend in every API so the backend can perform company specific logic... this is also the text that will appear in the browser tab
  company_logo: string; // the name of the image file to render in the navbar
  logo_placements: string[] | { [key: string]: string[] }; // the text values in the logo select on the item modification page
  embroideries: Embroidery; // the text values in the placement select on the item modification page
  stores: Store[]; // the text values in the stores select on the checkout screen
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

export interface Order {
  email: string;
  created_at: string;
  first_name: string;
  last_name: string;
  order: CartItem[];
  order_id: string;
  paid: 0 | 1;
  paid_at: string;
  store: string;
  bypass: 0 | 1;
  company_name: string;
  customer_po: string;
  /**
   * PayPal transaction ID for orders paid via PayPal.
   * Only present when paid === 1 and bypass === 0.
   */
  transaction_id?: string;
}
