import { Config } from "../lib/interfaces";

export const config: Config = {
  title: "Guardian",
  company_logo: "guardian.png",
  logo_placements: ["Left Chest"],
  show_modification_thumbnail: false,
  minimum_apparel_order: false,
  render_logo_preview: false,
  embroideries: {
    hat: ["Guardian"],
    mens: ["Guardian"],
    womens: ["Guardian"],
    accessory: ["Guardian"],
    customs: [],
  },
  stores: [
    "Guardian Products, 5575 Spalding Drive, Peachtree Corners, GA 30092",
  ],
  bypass_codes: [],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [
    { name: "Louis Budbill", phone: "678-287-1659" },
    { name: "Glenn Rodney", phone: "678-287-1608" },
  ],
};
