export interface CatalogItem {
  code: string;
  name: string;
  fullname: string;
  colors: string[];
  sizes: {};
  default_color: string;
  type: "mens" | "womens" | "hat" | "accessory";
  halfColors?: string[]; // C112 is capable of being two-colored. We need this field to present specially colored divs for the color selector for those colors
  // some items are only purchasble by Service and Parts counter employees only
  restricted?: boolean;
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
}
