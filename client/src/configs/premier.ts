import { Config } from "../lib/interfaces";

export const config: Config = {
  title: "Premier",
  company_logo: "premier.png",
  logo_placements: ["Left Chest"],
  show_modification_thumbnail: false,
  minimum_apparel_order: false,
  render_logo_preview: false,
  embroideries: {
    mens: [
      "Premier",
      "Premier Honda",
      "Premier Nissan Harvey",
      "Premier VW Harvey",
      "Premier Hyundai",
      "Toyota New Orleans",
      "Premier Nissan",
    ],
    womens: [
      "Premier",
      "Premier Honda",
      "Premier Nissan Harvey",
      "Premier VW Harvey",
      "Premier Hyundai",
      "Toyota New Orleans",
      "Premier Nissan",
    ],
    customs: [],
  },
  stores: [
    "Premier Honda, 11801 E I-10 Service Rd, New Orleans, LA 70128",
    "Toyota of New Orleans, 13150 I-10 Service Rd, New Orleans, LA 70128",
    "Premier Hyundai of Harvey, 1700 Westbank Expressway, Harvey, LA 70058",
    "Premier Nissan of Harvey, 4000 LaPalco Boulevard, Harvey, LA 70058",
    "Premier VW of Harvey, 4050 LaPalco Boulevard, Harvey, LA 70058",
    "Premier CDJR of Harvey, 1660 Westbrook Expressway, Harvey, LA 70058",
  ],
  bypass_codes: [
    "PREHNE",
    "TOYNNE",
    "PREHHA",
    "PRENHA",
    "PREVHA",
    "PRECHB",
    "PRENME",
  ],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [
    { name: "Louis Budbill", phone: "678-287-1659" },
    { name: "Glenn Rodney", phone: "678-287-1608" },
  ],
};
