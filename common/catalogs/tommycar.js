export const catalog = [
  {
    code: "A230",
    name: "Adidas Performance Polo",
    fullname: "Adidas Men's Performance Polo",
    colors: ["Black","Collegiate Red","Collegiate Royal"],
    type: "mens",
    default_color: "Black",
    sizes: {
       Small: 0.00,
      Medium: 0.00,
      Large: 0.00,
      XLarge: 0.00,
      "2XLarge": 0.00,
      "3XLarge": 0.00,
      "4XLarge": 0.00,
    },
  },
  {
    code: "A231",
    name: "Adidas Performance Polo",
    fullname: "Adidas Women's Performance Polo",
    colors: ["Black","Collegiate Red","Collegiate Royal"],
    type: "womens",
    default_color: "Black",
    sizes: {
      Small: 0.00,
      Medium: 0.00,
      Large: 0.00,
      XLarge: 0.00,
      "2XLarge": 0.00,
      "3XLarge": 0.00,     
    },
  },
  {
    code: "GP546",
    name: "Deal Jackets",
    fullname: "Deal Jackets - Plain",
    colors: [
      "Blue",
      "Buff",
      "Fuchsia",
      "Green",
      "Grey",
      "Lavender",
      "Pink",
      "Salmon",
      "White",
      "Yellow",
    ],
    type: "sales",
    default_color: "Blue",
    discount: [{ quantity: 100, price: 0.00 },
               { quantity: 500, price: 0.00 }],
    sizes: {
      100: 0.00,
      500: 0.00,
    },
  },
  {
    code: "GP200",
    name: "Key Tags",
    fullname: "Key Tag Versa #200 (250/box)",
    colors: [
      "Blue",
      "Gray",
      "Green",
      "Lilac",
      "Lime Green",
      "Orange",
      "Red",
      "Tan",
      "White",
      "Yellow",
    ],
    type: "sales",
    default_color: "White",
    discount: [{ quantity: 250, price: 0.00 }],
    sizes: {
      250: 0.0,
    },
  },
  {
    code: "30BKHP",
    name: "7.5 in. Numbers - Bk/Htpk",
    fullname: "7.5 in. Numbers - Black/Hot Pink (12/pk)",
    colors: ["BKHP0","BKHP1","BKHP2","BKHP3","BKHP4","BKHP5","BKHP6","BKHP7","BKHP8","BKHP9","BKHPS","BKHPD","BKHPP"],
    type: "sales",
    default_color: "BKHP0",
    discount: [{ quantity: 12, price: 0.00 }],
    sizes: {
      12: 0.00,
    },
  },
  {
    code: "3088",
    name: "Floor Mats",
    fullname: "Floor Mats/Coated Paper (500/bx)",
    colors: ["White"],
    type: "service",
    default_color: "White",
    discount: [{ quantity: 500, price: 0.00 }],
    sizes: {
      500: 0.0,
    },
  },
  {
    code: "55010",
    name: "Steering Wheel Covers",
    fullname: "Steering Wheel Covers (500/bx)",
    colors: ["Plastic"],
    type: "service",
    default_color: "Plastic",
    discount: [{ quantity: 500, price: 0.00 }],
    sizes: {
      500: 0.0,
    },
  },
   {
    code: "SDNRG",
    name: "Service Numbers",
    fullname: "Service Dispatch Numbers (1000/bx)",
    colors: ["_0000","1000","2000","3000","4000","5000",
      "6000","7000","8000", "9000"],  
    type: "service",
    default_color: "1000",
    discount: [{ quantity: 1, price: 0.00 }],
    sizes: {
      1: 0.0,
    },
  },
  {
    code: "GUARDFRM",
    name: "Zinc Metal Frames",
    fullname: "Zinc Metal Frame",
    colors: ["Metal"],
    type: "customs",
    default_color: "Metal",
    supportedStores: ["GENGNO","COUNHA","COUHGR","NORVNO","VOLCNO"],
    sizes: {
      500: 0.0,
      1000: 0.0,
      2500: 0.0,
    },
  },
  {
    code: "guardianpp",
    name: "Poly Coated Plates",
    fullname: "Poly Coated Cardboard w/blue imprint",
    colors: ["White"],
    type: "customs",
    default_color: "White",
    supportedStores: ["GENGNO","COUNHA","COUHGR","NORVNO","VOLCNO"],
    sizes: {
      500: 0.0,
      1000: 0.0,
      2500: 0.0,
    },
  },
  {
    code: "GUARDECAL",
    name: "Die Cut Decals",
    fullname: "Vinyl Diecut Decals",
    colors: ["White"],
    type: "customs",
    default_color: "White",
    supportedStores: ["GENGNO","COUNHA","COUHGR","NORVNO","VOLCNO"],
    sizes: {
      500: 0.0,
      1000: 0.0,
      2500: 0.0,
    },
  },
];