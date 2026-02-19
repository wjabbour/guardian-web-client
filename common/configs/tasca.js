export const config = {
  title: "Tasca",
  company_logo: "tasca.png",
  logo_placements: {
    mens: ["Left Chest", "Right Sleeve","Left Sleeve","Yoke"],
    womens: ["Left Chest", "Right Sleeve","Left Sleeve","Yoke"],
    hat: ["Front Center"],
    tshirts: ["Left Chest", "Right Sleeve"],
  },
  show_image_preview: true,
  minimum_apparel_order: false,
  enable_customs_store_picker: true,
  embroideries: {
    hat: [],
    mens: ["Autorent.EMB","Tasca.EMB"],
    womens: ["Autorent.EMB","Tasca.EMB"],
    accessory: [],
    customs: [],
    office: [],
  },
   email_recipients: [
    "lbudbill@gpcorp.com",    
    "shanell@gpcorp.com",
    "webportalorders@gpcorp.com",
  ],
  stores: [
    {
      name: "Tasca Ford Cranston",
      address: "1300 Pontiac Ave, Cranston, RI 02920",
      code: "TASFCR",
    },
  ],
  bypass_codes: ["TASCA"],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [
    { name: "Louis Budbill", phone: "678-287-1649"}],
  route_prefix: "/tasca",
  paypal_not_supported: true,
  password: "TascA",
  
};
