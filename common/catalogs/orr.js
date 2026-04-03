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
];
