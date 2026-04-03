export const config = {
  title: "Orr",
  company_logo: "orr.png",
  logo_placements: {
    mens:    ["Left Chest"],
    womens:  ["Left Chest"],
    hat:     ["Front Center"],
    tshirts: ["Left Chest"],
  },
  show_image_preview: true,
  minimum_apparel_order: false,
  enable_customs_store_picker: false,
  embroideries: {
    mens:      [],
    womens:    [],
    tshirts:   [],
    hat:       [],
    customs:   [],
    office:    [],
    service:   [],
    sales:     [],
    detail:    [],
    bodyshop:  [],
    parts:     [],
    accessory: [],
  },
  email_recipients: [
    "shanell@gpcorp.com",
    "webportalorders@gpcorp.com",
    "gmurray@gpcorp.com"
  ],
  stores: [
    {
      name: "Classic Chevrolet (Ashdown)",
      address: "640 S Constitution Ave, Ashdown, AR 71822",
      code: "CLACAS",
    },
    {
      name: "Porsche of Destin",
      address: "808 Airport Rd, Destin, FL 32541",
      code: "PORODE",
    },  
    {
      name: "Gregg Orr Cadillac (Hot Springs)",
      address: "4555 Central Ave, Hot Springs, AR 71913",
      code: "ORRCHO",
    },
    {
      name: "Gregg Orr Honda (Hot Springs)",
      address: "4701 Central Ave, Hot Springs, AR 71913",
      code: "ORRHHO",
    }, 
    {
      name: "Gregg Orr Honda (Hot Springs)",
      address: "4709 Central Ave, Hot Springs, AR 71913",
      code: "ORRTHO",
    }, 
    {
      name: "Orr Motors Cadillac GMC (Longview)",
      address: "400 TX-63 Spur N, Longview, TX 75601",
      code: "ORRMLO",
    },
    {
      name: "Orr GM SuperStore (Searcy)",
      address: "1000 Truman Baker Dr, Searcy, AR 72143",
      code: "ORRGSE",
    },
    {
      name: "Orr Toyota of Searcy",
      address: "301 South Poplar, Searcy, AR 72143",
      code: "ORRTSE",
    },
    {
      name: "Orr Acura (Shreveport)",
      address: "7571 E Kings Hwy, Shreveport, LA 71105",
      code: "ORRASH",
    },
    {
      name: "Orr BMW (Shreveport)",
      address: "7561 E Kings Hwy, Shreveport, LA 71105",
      code: "ORRBSH",
    },
    {
      name: "Orr Cadillac of Shreveport",
      address: "7581 E Kings Hwy, Shreveport, LA 71105",
      code: "ORRCLA",
    },
    {
      name: "Orr Infiniti (Shreveport)",
      address: "1400 E 70th St, Shreveport, LA 71105",
      code: "ORRISH",
    },
    {
      name: "Classic Auto Park (Texarkana)",
      address: "4333 Mall Drive, Texarkana, TX 75501",
      code: "CLAATE",
    },
    {
      name: "Classic CDJR (Texarkana)",
      address: "1102 Walton Drive, Texarkana, TX 75503",
      code: "CLACTE",
    },
    {
      name: "Classic Kia (Texarkana)",
      address: "902 Walton Drive, Texarkana, TX 75501",
      code: "CLAKTE",
    },                    
  ],
  bypass_codes: ["OrrCheck"],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com)",
  account_reps: [
    { name: "Greg Murray", email: "gmurray@gpcorp.com / (770) 448-6982 ext 210" }
  ],
  route_prefix: "/orr",
  paypal_not_supported: true,
  password: "GregorR",
};
