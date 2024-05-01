interface CatalogItem {
  code: string
  name: string
  fullname: string
  colors: string[]
  sizes: {}
  default_color: string
  type: 'male' | 'female' | 'hat' | 'accessory'
  halfColors?: string[] // C112 is capable of being two-colored. We need this field to present specially colored divs for the color selector for those colors
  // some items are only purchasble by Service and Parts counter employees only
  restricted?: boolean;
}

export const catalog: CatalogItem[] = [
  {
    code: 'J317',
    name: 'Soft Shell Jacket',
    fullname: 'Port Authority® Core Soft Shell Jacket',
    colors: ['Black', 'Battleship Grey'],
    type: 'male',
    default_color: 'Black',
    sizes: {
      Small: 44.99,
      Medium: 44.99,
      Large: 44.99,
      XLarge: 44.99,
      '2XLarge': 45.99,
      '3XLarge': 46.99,
      '4XLarge': 47.99,
      '5XLarge': 48.99,
      '6XLarge': 49.99
    }
  },
  {
    code: 'L317',
    name: 'Soft Shell Jacket',
    fullname: 'Port Authority® Ladies Core Soft Shell Jacket',
    colors: ['Black', 'Battleship Grey'],
    type: 'female',
    default_color: 'Black',
    sizes: {
      Small: 44.99,
      Medium: 44.99,
      Large: 44.99,
      XLarge: 44.99,
      '2XLarge': 45.99,
      '3XLarge': 46.99,
      '4XLarge': 47.99,
      '5XLarge': 48.99,
      '6XLarge': 49.99
    }
  },
  {
    code: 'ST650',
    name: 'Polo Shirt',
    fullname: 'Sport-Tek® Sport-Wick Polo',
    colors: ['Black', 'True Red', 'True Royal', 'Forest Green', 'Iron Grey', 'Grey Concrete', 'White'],
    type: 'male',
    default_color: 'Black',
    sizes: {
      Small: 24.99,
      Medium: 24.99,
      Large: 24.99,
      XLarge: 24.99,
      '2XLarge': 25.99,
      '3XLarge': 26.99,
      '4XLarge': 27.99,
      '5XLarge': 28.99,
      '6XLarge': 29.99,
    }
  },
  {
    code: 'TST650',
    name: 'Tall Polo Shirt',
    fullname: 'Sport-Tek® Tall Sport-Wick Polo',
    colors: ['Black', 'True Red', 'True Royal', 'Iron Grey', 'Grey Concrete', 'White'],
    type: 'male',
    default_color: 'Black',
    sizes: {
      LT: 27.99,
      XLT: 28.99,
      '2XLT': 29.99,
      '3XLT': 31.99,
      '4XLT': 32.99
    }
  },
  {
    code: 'LST650',
    name: 'Polo Shirt',
    fullname: 'Sport-Tek® Sport-Wick Polo',
    colors: ['Black', 'True Red', 'True Royal', 'Forest Green', 'Iron Grey', 'Grey Concrete', 'White'],
    type: 'female',
    default_color: 'Black',
    sizes: {
      Small: 24.99,
      Medium: 24.99,
      Large: 24.99,
      XLarge: 24.99,
      '2XLarge': 25.99,
      '3XLarge': 26.99,
      '4XLarge': 27.99,
      '5XLarge': 28.99,
      '6XLarge': 29.99,
    }
  },
  {
    code: 'CP80',
    name: 'Twill Cap',
    fullname: 'Port & Company® Six-Panel Twill Cap',
    colors: ['Black', 'True Red', 'Navy', 'Hunter', 'Royal', 'Charcoal', 'Woodland Brown'],
    type: 'hat',
    default_color: 'Black',
    sizes: {
      'One Size Fits All': 14.29
    }
  },
  {
    code: '04032',
    name: 'Revolve Tumbler',
    fullname: '20 oz. Revolve Tumbler',
    colors: ['Black', 'Blue', 'Burgundy', 'Green', 'Navy', 'Red', 'Silver', 'White'],
    type: 'accessory',
    default_color: 'Black',
    sizes: {
      '20 oz.': 14.99
    }
  },
  {
    code: '04015',
    name: 'Perfect-Fit Tumbler',
    fullname: '10 oz. Perfect-Fit Tumbler',
    colors: ['Black', 'Blue', 'Burgundy', 'Gun Metal', 'Navy', 'Red'],
    type: 'accessory',
    default_color: 'Black',
    sizes: {
      '10 oz.': 12.99
    }
  },
  {
    code: '1640',
    name: 'Logo Key Chain',
    fullname: 'Brushed Zinc/Leather/Big Logo Key Chain',
    colors: ['Black'],
    type: 'accessory',
    default_color: 'Black',
    sizes: {
      'Default': 6.99
    }
  },
  {
    code: '1240',
    name: 'Key Tag',
    fullname: 'Zinc Strap Key Tag',
    colors: ['Grey'],
    type: 'accessory',
    default_color: 'Grey',
    sizes: {
      'Default': 6.99
    }
  },
  {
    code: '2240',
    name: 'Key Chain',
    fullname: 'Carbon Fiber Strap Metal Key Chain',
    colors: ['Grey'],
    type: 'accessory',
    default_color: 'Grey',
    sizes: {
      'Default': 6.99
    }
  },
  {
    code: 'C112',
    name: 'Snapback',
    fullname: 'Port Authority® Snapback Trucker Cap',
    colors: ['Black', 'Navy', 'Black White', 'Patriot Royal', 'Red White', 'Royal White', 'Grey Steel', 'Pink White', 'Woodland Camo', 'Khaki White'],
    type: 'hat',
    halfColors: ['Black White', 'Red White', 'Royal White', 'Pink White', 'Khaki White'],
    default_color: 'Black',
    sizes: {
      'One Size Fits All': 14.29
    }
  },
  {
    code: 'NKDC1963',
    name: 'Dri-FIT Polo Shirt',
    fullname: 'Nike® Dri-FIT Polo',
    colors: ['Gym Blue', 'University Red', 'Black', 'White', 'George Green', 'Anthracite', 'Cool Grey'],
    type: 'male',
    default_color: 'Black',
    sizes: {
      Small: 43.99,
      Medium: 43.99,
      Large: 43.99,
      XLarge: 43.99,
      '2XLarge': 44.99,
      '3XLarge': 45.99,
      '4XLarge': 46.99,
    }
  },
  {
    code: 'NKDC1991',
    name: 'Dri-FIT Polo Shirt',
    fullname: 'Nike® Dri-FIT Polo',
    colors: ['Gym Blue', 'University Red', 'Black', 'White', 'George Green', 'Anthracite', 'Cool Grey'],
    type: 'female',
    default_color: 'Black',
    sizes: {
      Small: 43.99,
      Medium: 43.99,
      Large: 43.99,
      XLarge: 43.99,
      '2XLarge': 44.99,
      '3XLarge': 45.99,
      '4XLarge': 46.99,
    }
  },
  {
    code: 'J331',
    name: 'Rain Jacket',
    fullname: 'Port Authority® All-Conditions Jacket',
    colors: ['Black', 'Direct Blue'],
    type: 'male',
    default_color: 'Black',
    sizes: {
      Small: 75.99,
      Medium: 75.99,
      Large: 75.99,
      XLarge: 75.99,
      '2XLarge': 76.99,
      '3XLarge': 77.99,
      '4XLarge': 78.99,
    }
  },
  {
    code: 'L331',
    name: 'Rain Jacket',
    fullname: 'Port Authority® All-Conditions Jacket',
    colors: ['Black'],
    type: 'female',
    default_color: 'Black',
    sizes: {
      Small: 75.99,
      Medium: 75.99,
      Large: 75.99,
      XLarge: 75.99,
      '2XLarge': 76.99,
      '3XLarge': 77.99,
      '4XLarge': 78.99,
    }
  },
  {
    code: 'K805',
    name: '1/4-Zip Pullover',
    fullname: 'Port Authority® 1/4-Zip Pullover',
    colors: ['Black', 'Regatta Blue', 'True Navy', 'Iron Grey'],
    type: 'male',
    default_color: 'Black',
    sizes: {
      Small: 35.99,
      Medium: 35.99,
      Large: 35.99,
      XLarge: 35.99,
      '2XLarge': 36.99,
      '3XLarge': 37.99,
      '4XLarge': 38.99,
    }
  },

  {
    code: 'L805',
    name: '1/4-Zip Pullover',
    fullname: 'Port Authority® 1/4-Zip Pullover',
    colors: ['Black', 'Regatta Blue', 'True Navy', 'Iron Grey'],
    type: 'female',
    default_color: 'Black',
    sizes: {
      Small: 35.99,
      Medium: 35.99,
      Large: 35.99,
      XLarge: 35.99,
      '2XLarge': 36.99,
      '3XLarge': 37.99,
      '4XLarge': 38.99,
    }
  },
]

