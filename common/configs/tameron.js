export const config = {
  title: "Tameron",
  company_logo: "tameron.png",
  logo_placements: ["Right Sleeve", "Front","Left Chest"],
  show_modification_thumbnail: true,
  minimum_apparel_order: true,
  render_logo_preview: true,
  show_image_preview: true,
  embroideries: {
    mens: ["Tameron"],
    womens: ["Tameron"],
    hat: ["Tameron"],
    customs: [],
  },
  email_recipients: ["lbudbill@gpcorp.com", "lbudbell@comcast.net"],
  stores: [
    {
      name: "C11 Tameron CDJR",
      address: "",
      code: "TAMCDA",
    },
    {
      name: "C12 Tameron GMC",
      address: "",
      code: "TAMBDA",
    },
    {
      name: "C15 Tameron Subaru",
      address: "",
      code: "TAMSMO",
    },
    {
      name: "C16 Tameron Honda",
      address: "",
      code: "TAMHDA",
    },
    {
      name: "C17 Tameron Kia",
      address: "",
      code: "TAMKDI",
    },
    {
      name: "C18 Tameron Nissan Mobile",
      address: "",
      code: "TAMNMO",
    },
    {
      name: "C19 Tameron Kia Nola",
      address: "",
      code: "TAMKWE",
    },
    {
      name: "C20 Tameron Nissan E Shore",
      address: "",
      code: "ONLINE",
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
