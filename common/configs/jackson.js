export const config = {
  title: "Jackson",
  company_logo: "jackson.png",
  logo_placements: {
    mens:    ["Left Chest"],
    womens:  ["Left Chest"],
    hat:     ["Front Center"],
    tshirts: ["Left Chest"],
  },
  show_image_preview: true,
  minimum_apparel_order: false,
  enable_customs_store_picker: true,
  embroideries: {
    mens:      [
      "Subaru of Albany.EMB",
      "Toyota of Newport.EMB",
      "Toyota of Corvallis.EMB"
    ],
    womens:    [
      "Subaru of Albany.EMB",
      "Toyota of Newport.EMB",
      "Toyota of Corvallis.EMB"
    ],
    tshirts:   [
      "Subaru of Albany",
      "Toyota of Newport",
      "Toyota of Corvallis"
    ],
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
    "rgreenberg@gpcorp.com",
    "shanell@gpcorp.com",
    "webportalorders@gpcorp.com"
  ],
  stores: [
    {
      name: "Subaru of Albany",
      address: "520 Airport Rd SE, Albany, OR 97322",
      code: "SUBSAL",
    },
    {
      name: "Toyota of Corvallis",
      address: "800 NW 5th St, Corvallis, OR 97330",
      code: "TOYCCO",
    },
    {
      name: "Toyota of Newport",
      address: "3234 SW Coast Hwy, Newport, OR 97366",
      code: "TOYONO",
    },
    {
      name: "Albany Chrysler Dodge Jeep Ram",
      address: "2315 Santiam Hwy SE, Albany, OR 97322",
      code: "ACDJRA",
    },
    {
      name: "Hyundai of Albany",
      address: "1620 Fescue St SE, Albany, OR 97322",
      code: "HYUHAL",
    },
  ],
  bypass_codes: ["JACKSON"],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [
    { name: "Richard Greenberg", phone: "678-287-1635" }
  ],
  route_prefix: "/jackson",
  paypal_not_supported: true,
  password: "JacksoN",
};
