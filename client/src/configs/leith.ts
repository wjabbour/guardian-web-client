export const config = {
    title: "Leith",
    company_logo: "leith.png",
    logo_placements: ["Left Chest","Yoke"],
    show_modification_thumbnail: true,
    minimum_apparel_order: true,
    render_logo_preview: true,
    embroideries: {
      mens: ["Hondastacked"],
      womens: ["Hondastacked"],
      hat: [],
      customs: [],
    },
    stores: [
      "Leith Honda, 3940 Capital Hills Drive, NC 27606",      
    ],
    bypass_codes: ["LEITH"],  
    
    server_hostname: "https://mxfj3q6m01.execute-api.us-east-1.amazonaws.com",
    account_reps: [
      { name: "Bob Sugden", phone: "678-287-1662" },
      { name: "Louis Budbill", phone: "678-287-1659" },
    ],
    route_prefix: "/leith",
    paypal_not_supported: true,
    password: "LeitH",
  };