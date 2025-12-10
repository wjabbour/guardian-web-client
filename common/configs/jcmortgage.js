export const config = {
  title: "Jcmortgage",
  company_logo: "jc_mortgage.png",
  logo_placements: {
    mens: ["Left Chest"],
    womens: ["Left Chest"],
    hat: ["Front Center"],
    tshirts: [],
    accessory: ["Front Center","Bottom Right Corner"]
  },  
  show_image_preview: true,
  embroideries: {
    hat: ["Johns Creek Mortgage"],
    mens: ["Johns Creek Mortgage"],
    womens: ["Johns Creek Mortgage"],
    accessory: ["Johns Creek Mortgage"],
    customs: [],
    office: [],
    service: [],
    sales: [],
    detail: [],
    bodyshop: [],
    parts: [],
  },
  email_recipients: [
    "rgreenberg@gpcorp.com",
    "mthede@johnscreekmortgage.com",
    "webportalorders@gpcorp.com",
    "shanell@gpcorp.com",
  ],
  stores: [
    {
      name: "Johns Creek Mortgage",
      address: "6455 E Johns Crossing, Ste 350, Johns Creek, GA 30097",
      code: "JCMOGA",
    },    
  ],
  bypass_codes: ["JCMORTGAGE"],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [{ name: "Richard Greenberg", phone: "678-287-1635" }],
  route_prefix: "/jcmortgage",
  paypal_not_supported: true,
  password: "JcmortgagE",
};