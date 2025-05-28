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
    | "service";
  halfColors?: string[]; // C112 is capable of being two-colored. We need this field to present specially colored divs for the color selector for those colors
  // some items are only purchasble by Service and Parts counter employees only
  restricted?: boolean;
  /*
    Customs and decals are ordered in high quantities and should have discounts applied to them when the order
    quantity reaches specific thresholds
  */
  discount?: Discount[];
  /**
   * An array of addresses of the stores which are able to order this particular item. If a store is not in this array, then this item
   * wont be shown when viewing the customs items for that store.
   */
  supportedStores?: string[];
}

interface Discount {
  price: number;
  quantity: number;
}

interface Embroidery {
  [key: string]: string[];
}
