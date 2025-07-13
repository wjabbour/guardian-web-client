export const config = {
  title: "Tameron",
  company_logo: "tameron.png",
  logo_placements: ["Right Sleeve", "Front"],
  show_modification_thumbnail: true,
  minimum_apparel_order: true,
  render_logo_preview: true,
  embroideries: {
    mens: ["Tameron"],
    womens: ["Tameron"],
    hat: ["Tameron"],
    customs: [],
  },
  email_recipients: ["lbudbill@gpcorp.com", "lbudbell@comcast.net"],
  stores: [
    {
      name: "Tameron Honda",
      address: "9871 Justina Ave Daphne, AL 36526",
      code: "TAMHDA",
    },
    {
      name: "Tameron Buick GMC",
      address: "27161 US - 98 Daphne, AL 36526",
      code: "TAMBDA",
    },
    {
      name: "Tameron CDJR",
      address: "27161 US - 98 Daphne, AL 36526",
      code: "TAMCDA",
    },
    {
      name: "Tameron Subaru",
      address: "1431 I-65 Service Road Mobile, AL 36606",
      code: "TAMSMO",
    },
    {
      name: "Tameron Nissan",
      address: "1015 E. I65 Service Road South Mobile, AL 36606",
      code: "TAMNMO",
    },
    {
      name: "Tameron Kia",
      address: "10611 Boney Ave D, Iberville, MS 39540",
      code: "TAMKDI",
    },
    {
      name: "Tameron Kia Westbank",
      address: "1884 Westbank Expressway Harvey, LA 70058",
      code: "TAMKWE",
    },
  ],
  bypass_codes: ["TAMERO"],
  server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
  account_reps: [
    { name: "Louis Budbill", phone: "678-287-1659" },
    { name: "Glenn Rodney", phone: "678-287-1608" },
  ],
  route_prefix: "/tameron",
  paypal_not_supported: true,
  password: "TameroN",
};
