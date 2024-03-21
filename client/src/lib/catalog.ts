interface ClothingItem {
  code: string
  name: string
  fullname: string
  colors: string[]
  sizes: {}
  default_color: string
  gender: 'male' | 'female' | 'accessory'
  // some items are only purchasble by Service and Parts counter employees only
  restricted?: boolean;
}

export const catalog: ClothingItem[] = [
  {
    code: 'J317',
    name: 'Soft Shell Jacket',
    fullname: 'Port Authority® Core Soft Shell Jacket',
    colors: ['Black'],
    gender: 'male',
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
    colors: ['Black'],
    gender: 'female',
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
    colors: ['Black', 'Navy'],
    gender: 'male',
    default_color: 'Black',
    sizes: {
      XSmall: 33.53,
      Small: 33.53,
      Medium: 33.53,
      Large: 33.53,
      XLarge: 33.53,
      '2XLarge': 35.73,
      '3XLarge': 40.13,
      '4XLarge': 42.33,
    }
  },
  {
    code: 'A430',
    name: 'Sport Polo',
    fullname: 'Adidas® Men\'s Basic Sport Polo',
    colors: ['Black'],
    default_color: 'Black',
    sizes: {
      Small: 36.29,
      Medium: 36.29,
      Large: 36.29,
      XLarge: 36.29,
      '2XLarge': 37.39,
      '3XLarge': 38.49,
    },
    gender: 'male',
    restricted: true
  },
  {
    code: 'J333',
    name: 'Waterproof Jacket',
    fullname: 'Port Authority® Torrent Waterproof Jacket',
    colors: ['Black', 'Gray'],
    default_color: 'Black',
    gender: 'male',
    sizes: {
      XSmall: 50.58,
      Small: 50.58,
      Medium: 50.58,
      Large: 50.58,
      XLarge: 50.58,
      '2XLarge': 51.68,
      '3XLarge': 52.78,
      '4XLarge': 53.88,
    }
  },
  {
    code: 'J792',
    name: 'Nootka Jacket',
    fullname: 'Port Authority® Nootka Jacket',
    colors: ['Black'],
    default_color: 'Black',
    gender: 'male',
    sizes: {
      XSmall: 98.99,
      Small: 98.99,
      Medium: 98.99,
      Large: 98.99,
      XLarge: 98.99,
      '2XLarge': 100.09,
      '3XLarge': 101.19,
      '4XLarge': 102.29,
    }
  },
  {
    code: 'MQO00055',
    name: 'Soft Shell Jacket',
    fullname: 'Clique Telemark Eco Stretch Softshell Jacket',
    colors: ['Black'],
    default_color: 'Black',
    gender: 'male',
    sizes: {
      Small: 49.99,
      Medium: 49.99,
      Large: 49.99,
      XLarge: 49.99,
      '2XLarge': 51.99,
      '3XLarge': 52.99,
      '4XLarge': 53.99,
      '5XLarge': 54.99,
    }
  },
  {
    code: 'BB18002',
    name: 'Nailhead Shirt',
    fullname: 'Brooks Brothers® Wrinkle-Free Stretch Nailhead Shirt',
    colors: ['White'],
    default_color: 'White',
    gender: 'male',
    sizes: {
      XSmall: 50.59,
      Small: 50.59,
      Medium: 50.59,
      Large: 50.59,
      XLarge: 45.99,
      '2XLarge': 51.69,
      '3XLarge': 52.79,
      '4XLarge': 53.89,
    }
  },
  {
    code: 'TLS608',
    name: 'Long Sleeve Shirt',
    fullname: 'Port Authority® Tall Long Sleeve Easy Care Shirt',
    colors: ['White'],
    default_color: 'White',
    gender: 'male',
    sizes: {
      LT: 31.88,
      XLT: 34.08,
      '2XLT': 36.28,
      '3XLT': 38.48,
      '4XLT': 40.68
    }
  },
  {
    code: 'L407',
    name: 'Rain Jacket',
    fullname: 'Port Authority® Ladies Essential Rain Jacket',
    colors: ['Black', 'Graphite'],
    default_color: 'Black',
    sizes: {
      XSmall: 50.58,
      Small: 50.58,
      Medium: 50.58,
      Large: 50.58,
      XLarge: 50.58,
      '2XLarge': 51.68,
      '3XLarge': 52.78,
      '4XLarge': 53.88
    },
    gender: 'female'
  },
  {
    code: 'L123',
    name: 'All Weather Jacket',
    fullname: 'Port Authority® Ladies All Weather 3 in 1 Jacket',
    colors: ['Black'],
    default_color: 'Black',
    sizes: {
      XSmall: 87.98,
      Small: 87.98,
      Medium: 87.98,
      Large: 87.98,
      XLarge: 87.98,
      '2XLarge': 89.08,
      '3XLarge': 90.18,
      '4XLarge': 91.28
    },
    gender: 'female'
  },
  {
    code: 'LQO00041',
    name: 'Soft Shell Jacket',
    fullname: 'Clique Telemark Eco Stretch Softshell Jacket',
    colors: ['Black'],
    default_color: 'Black',
    sizes: {
      Small: 49.99,
      Medium: 49.99,
      Large: 49.99,
      XLarge: 49.99,
      '2XLarge': 51.99,
      '3XLarge': 52.99,
    },
    gender: 'female'
  },
  {
    code: 'L233',
    name: 'Fleece Full Zip Jacket',
    fullname: 'Port Authority® Ladies Summit Fleece Full Zip Jacket',
    colors: ['Black'],
    default_color: 'Black',
    sizes: {
      XSmall: 40.69,
      Small: 40.69,
      Medium: 40.69,
      Large: 40.69,
      XLarge: 40.69,
      '2XLarge': 41.79,
      '3XLarge': 42.89,
      '4XLarge': 43.99
    },
    gender: 'female'
  },
  {
    code: 'LST253',
    name: '1/4" Zip Sweatshirt',
    fullname: 'Sport Tek® Ladies 1/4 Zip Sweatshirt',
    colors: ['Black', 'Navy', 'Graphite'],
    default_color: 'Black',
    sizes: {
      XSmall: 37.39,
      Small: 37.39,
      Medium: 37.39,
      Large: 37.39,
      XLarge: 37.39,
      '2XLarge': 38.49,
      '3XLarge': 39.59,
      '4XLarge': 40.69,
    },
    gender: 'female'
  },
  {
    code: 'BB18003',
    name: 'Nailhead Shirt',
    fullname: 'Brooks Brothers® Women’s Wrinkle-Free Stretch Nailhead Shirt',
    colors: ['White'],
    default_color: 'White',
    sizes: {
      Small: 50.59,
      Medium: 50.59,
      Large: 50.59,
      XLarge: 50.59,
      '2XLarge': 51.69,
      '3XLarge': 52.79,
      '4XLarge': 53.89,
    },
    gender: 'female'
  },
  {
    code: 'A431',
    name: 'Sport Polo',
    fullname: 'Adidas® Women\'s Basic Sport Polo',
    colors: ['Black'],
    default_color: 'Black',
    sizes: {
      Small: 36.29,
      Medium: 36.29,
      Large: 36.29,
      XLarge: 36.29,
      '2XLarge': 37.39,
      '3XLarge': 38.49,
    },
    gender: 'female',
    restricted: true
  },
  {
    code: 'LQO00055',
    name: 'Full Zip Vest',
    fullname: 'Clique Trail Softshell Full Zip Vest',
    colors: ['Black'],
    default_color: 'Black',
    sizes: {
      XSmall: 41.79,
      Small: 41.79,
      Medium: 41.79,
      Large: 41.79,
      XLarge: 41.79,
      '2XLarge': 42.89,
      '3XLarge': 43.99,
    },
    gender: 'female',
    restricted: false
  },
  {
    code: 'MQO00068',
    name: 'Full Zip Vest',
    fullname: 'Clique Trail Softshell Full Zip Vest',
    colors: ['Black'],
    default_color: 'Black',
    sizes: {
      XSmall: 41.79,
      Small: 41.79,
      Medium: 41.79,
      Large: 41.79,
      XLarge: 41.79,
      '2XLarge': 42.89,
      '3XLarge': 43.99,
      '4XLarge': 45.09,
      '5XLarge': 46.19,
    },
    gender: 'male',
    restricted: false
  },
]

