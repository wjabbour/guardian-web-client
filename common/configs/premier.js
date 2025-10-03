export const config = {
  title: "Premier",
  company_logo: "premier.png",
  logo_placements: ["Left Chest"],
  show_image_preview: false,
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
  email_recipients: ["lbudbill@gpcorp.com", "lbudbell@comcast.net"],
  stores: [
    {
      name: "Premier Honda",
      address: "11801 E I-10 Service Rd, New Orleans, LA 70128",
      code: "PREHNE",
    },
    {
      name: "Toyota of New Orleans",
      address: "13150 I-10 Service Rd, New Orleans, LA 70128",
      code: "TOYNNE",
    },
    {
      name: "Premier Hyundai of Harvey",
      address: "1700 Westbank Expressway, Harvey, LA 70058",
      code: "PREHHA",
    },
    {
      name: "Premier Nissan of Harvey",
      address: "4000 LaPalco Boulevard, Harvey, LA 70058",
      code: "PRENHA",
    },
    {
      name: "Premier VW of Harvey",
      address: "4050 LaPalco Boulevard, Harvey, LA 70058",
      code: "PREVHA",
    },
    {
      name: "Premier CDJR of Harvey",
      address: "1660 Westbrook Expressway, Harvey, LA 70058",
      code: "PRECHB",
    },
    {
      name: "Premier Nissan",
      address: "6636 Veterans Blvd, Metarie, LA 70003",
      code: "PRENME",
    },
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
  bypass_codes: ["PREMIE"],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [
      { name: "Glenn Rodney", phone: "678-287-1608" },
      { name: "Louis Budbill", phone: "678-287-1649" },  
  ],
  route_prefix: "/premier",
  paypal_not_supported: true,
  password: "PremieR",
};
 