import { Config } from "../lib/interfaces";

export const config: Config = {
  title: "Guardian",
  company_logo: "guardian.png",
  logo_placements: ["Left Chest", "Left Sleeve", "Right Sleeve", "Yoke"],
  show_modification_thumbnail: true,
  minimum_apparel_order: true,
  render_logo_preview: true,
  embroideries: {
    hat: [
      "Guardian",
       ],
    mens: [
      "Guardian",
       ],
    womens: [
      "Guardian",
       ],
    accessory: [
      "Guardian",
       ],
    customs: [],
    office: [],
    service: [],
    sales: [],
    detail: [],
    bodyshop: [],
    parts: [],
  },
  stores: [
    "Guardian Products, 5575 Spalding Drive, Peachtree Corners, GA 30092",
    ],
  bypass_codes: ["GUARDI"],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [
    { name: "Louis Budbill", phone: "678-287-1659" },
    ],
  route_prefix: "/guardian",
  paypal_not_supported: true,
  password: "GuardiaN",
};
