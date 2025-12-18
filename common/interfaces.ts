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
