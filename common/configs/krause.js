export const config = {
  title: "Krause",
  company_logo: "krause.png",
  logo_placements: {
    mens: ["Left Chest", "Left Sleeve",],
    womens: ["Left Chest", "Left Sleeve"],
    hat:[],
    tshirts: ["Left Chest", "Left Sleeve"],
  },
  show_image_preview: true,
  minimum_apparel_order: false,
  enable_customs_store_picker: true,
  embroideries: {
    mens: [
      "Angela Krause Ford Lincoln.EMB", 
      "Angela Krause Lincoln.EMB", 
      "Krause Family Ford Oval 1 Color.EMB"
    ],
    womens: [
      "Angela Krause Ford Lincoln.EMB", 
      "Angela Krause Lincoln.EMB", 
      "Krause Family Ford Oval 1 Color.EMB"
    ],
    tshirts: [
      "Angela Krause Ford Lincoln.EMB", 
      "Angela Krause Lincoln.EMB", 
      "Krause Family Ford Oval 1 Color.EMB"
    ],
    hat:  [],
    customs: [],
    office: [],
    service: [],
    sales: [],
    detail: [],
    bodyshop: [],
    parts: [],
    accessory: [],        
  },
  email_recipients: [
    "lbudbill@gpcorp.com",          
    "shanell@gpcorp.com",
    "webportalorders@gpcorp.com",    
  ],
  stores: [
    {
      name: "Angela Krause Ford (Alpharetta)",
      address: "1575 Mansell Rd, Alpharetta, GA 30009",
      code: "KRAFAL",
    },
    {
      name: "Honda of Roanoke Rapids",
      address: "403 Premier Blvd, Roanoke Rapids, NC 27870",
      code: "HONHRO",
    },                  
    ],
  bypass_codes: ["TEST"],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [{ name: "Louis Budbill", phone: "678-287-1649" },],   
  route_prefix: "/krause",
  paypal_not_supported: true,
  password: "KrausE",
};
