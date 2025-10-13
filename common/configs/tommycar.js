export const config = {
  title: "Tommycar",
  company_logo: "tommycar.png",
  logo_placements: {
    mens: ["Left Chest"],
    womens: ["Left Chest"],
    hat: ["Full Front", "Full Back"],
    tshirts: ["Left Chest"],
  },
  show_image_preview: true,
  embroideries: {
    mens: ["Tommycar", "Tommycar Collision"],
    womens: ["Tommycar", "Tommycar Collision"],
    tshirts: ["Tommycar", "Tommycar Collision"],
    service: [],
    sales: [],
    customs: [],
  },
  email_recipients: [
    "lbudbill@gpcorp.com",
    "lbudbell@comcast.net",
    "hpeck@gpcorp.com",
    "lfernandes@tommycarmgt.com",
  ],
  stores: [
    {
      name: "Genesis of Northampton",
      address: "347 King Street, Northampton, MA 01060",
      code: "GENGNO",
    },
    {
      name: "Country Nissan",
      address: "40 Russell Street, Hadley, MA 01035",
      code: "COUNHA",
    },
    {
      name: "Country Hyundai",
      address: "347 King Street, Northampton, MA 01060",
      code: "COUHGR",
    },
    {
      name: "Northampton Volkswagen",
      address: "361 King Street, Northampton, MA 01060",
      code: "NORVNO",
    },
    {
      name: "Volvo Cars of Pioneer Valley",
      address: "48 Damon Road, Northampton, MA 01060",
      code: "VOLCNO",
    },
  ],
  bypass_codes: ["LISA1"],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [
    { name: "Hunter Peck", phone: "678-287-1642" },
    { name: "Louis Budbill", phone: "678-287-1659" },
  ],
  route_prefix: "/tommycar",
  paypal_not_supported: false,
  password: "TommycaR",
};
