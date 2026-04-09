export const catalog = [
  {
    code: "ORRATE-CPMO",
    name: "Plastic Nameplates",
    fullname: "Plastic Nameplates",
    description: `ORR (3.5 in. x 1.31 in.); CLASSIC (5.25 in. x .75 in.)`,
    type: "customs",    
    disableColorSelector: true,    
    sapVariations: [
      {code: '-505644A', color:'ORR - Chrome Plated'},
      {code: '-496293', color:'ORR - Black'},
      {code: '-476237', color:'CLASSIC - Chrome Plated'},
    ],
    quantities: [1000, 2500, 5000],
    pricing: {
      base: {
        price: 1.89,
        discount: {
          2500: 1.69,
          5000: 1.62,          
        }, 
      },
    },
  },
  {
    code: "ORRATE-LWS-525166",
    name: "Long Window Sticker",
    fullname: "Long Window Sticker - Red (13 in. x 1.5 in.)",
    description: `Grey does not print.`,
    type: "customs",    
    disableColorSelector: true, 
    quantities: [250, 500, 1000],
    pricing: {
      base: {
        price: .69,
      },
    },
  }, 
  {
    code: "ORRATE-PLATE",
    name: "White Aluminum Plate",
    fullname: "White Aluminum Plate w/black & 186 red imprint",
    disableColorSelector: true,
    description: `250 plates per box; 12 in. x 6 in.`,
    type: "customs",        
    quantities: [250, 500],
    pricing: {
      base: {
        price: 2.69,
      },
    },
  },
  {
    code: "ORR-FRAME",
    name: "Chrome Faced Frames",
    fullname: "Chrome Faced Black Plastic Frames",
    disableColorSelector: true,
    description: `200 frames per box`,
    type: "customs",
    sapVariations: [
      {code: '-CF-LA', color:'Style EN - 4 holes'},
      {code: '-CF', color:'Style J - 2 holes'},      
    ], 
    variationTextOverride: ['Style:'],       
    quantities: [200, 600, 1000],
    pricing: {
      base: {
        price: 1.18,
      },
    },
  },
  {
    code: "ORRATE-TC",
    name: "Tire Covers",
    fullname: "32 in. Black Vinyl Tire Cover w/white & 186 red imprint",
    disableColorSelector: true,    
    type: "customs",
    sapVariations: [
      {code: '-CAM', color:'Camera'},
      {code: '-NOCAM', color:'No Camera'},      
    ],
    variationTextOverride: ['Style:'],        
    quantities: [22],
    pricing: {
      base: {
        price: 46.99,
      },
    },
  },
  {
    code: "ORRATE-AWMATT",
    name: "All Weather Mats",
    fullname: "All Weather Mats w/white & 186 red imprint",
    description: `Sold as a 2pc set`,
    disableColorSelector: true,    
    type: "customs",          
    quantities: [1, 2, 3, 4, 5],
    pricing: {
      base: {
        price: 28.50,
      },
    },
  },
  {
    code: "ORRATE-3333",
    name: "Black Shopper Tote",
    fullname: "Black Non-Woven Shopper Tote w/white & 186 red imprint (200/bx)",
    description: `size: 20 in. x 13 in. x 8 in.; imprint area: 10 in. x 8 in.`,
    colors: ["Black"],     
    type: "customs",
    default_color: "Black",          
    quantities: [200],
    pricing: {
      base: {
        price: 1.25,
      },
    },
  },
];
