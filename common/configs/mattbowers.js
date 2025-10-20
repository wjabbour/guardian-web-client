export const config = {
  title: "Mattbowers",
  company_logo: "mattbowers.png",
  logo_placements: {
    mens: ["Left Chest", "Front Center"],
    womens: ["Left Chest", "Front Center"],
    hat: ["Front Center"],
    tshirts: ["Left Chest", "Front Center"],
  },
  show_image_preview: true,
  embroideries: {
    mens: [],
    womens: [],
    tshirts: [],
    hat: [],
    customs: [],
  },
  email_recipients: [
    "lbudbill@gpcorp.com",
    "shanell@gpcorp.com",
    "support@gpcorp.com",
    "rgreenberg@gpcorp.com",
  ],
  stores: [
    {
      name: "Matt Bowers Ford",
      address: "3724 Veterans Memorial Blvd, Metairie, LA 70002",
      code: "MATFME",
    },
    ],
  bypass_codes: ["MATTB"],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [
    { name: "Richard Greenberg", phone: "678-287-1635" },
    { name: "Louis Budbill", phone: "678-287-1649" },
  ],
  route_prefix: "/mattbowers",
  paypal_not_supported: true,
  password: "MattbowerS",
};
