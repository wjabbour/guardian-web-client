export const config = {
  title: "Guardian",
  company_logo: "guardian.png",
  logo_placements: ["Left Chest", "Left Sleeve", "Right Sleeve", "Yoke"],
  show_image_preview: true,
  embroideries: {
    hat: ["Guardian"],
    mens: ["Guardian"],
    womens: ["Guardian"],
    accessory: ["Guardian"],
    customs: [],
    office: [],
    service: [],
    sales: [],
    detail: [],
    bodyshop: [],
    parts: [],
  },
  email_recipients: [
    "lbudbill@gpcorp.com",
    "lbudbell@comcast.net",
    "doubleujabbour@gmail.com",
  ],
  stores: {
    "Guardian Products, 5575 Spalding Drive, Peachtree Corners, GA 30092":
      "GUAPRO",
  },
  bypass_codes: ["GUARDI"],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [{ name: "Louis Budbill", phone: "678-287-1659" }],
  route_prefix: "/guardian",
  paypal_not_supported: true,
  password: "GuardiaN",
};
