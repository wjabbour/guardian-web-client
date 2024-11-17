export interface CatalogItem {
  code: string;
  name: string;
  fullname: string;
  colors: string[];
  sizes: {};
  default_color: string;
  type: "mens" | "womens" | "hat" | "accessory" | "customs";
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
  title: string;
  company_logo: string;
  logo_placements: string[];
  embroideries: Embroidery;
  stores: string[];
  show_modification_thumbnail: boolean;
  minimum_apparel_order: boolean;
}
