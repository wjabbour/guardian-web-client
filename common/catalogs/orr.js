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
    code: "ORRATE-FRAME",
    name: "Chrome Faced Frames",
    fullname: "Chrome Faced Black Plastic Frames",
    disableColorSelector: true,
    description: `200 frames per box`,
    type: "customs",
    sapVariations: [
      {code: '-CF-LA', color:'Style EN - 2 holes'},
      {code: '-CF', color:'Style J - 4 holes'},      
    ],        
    quantities: [200, 600, 1000],
    pricing: {
      base: {
        price: 1.18,
      },
    },
  },
];
