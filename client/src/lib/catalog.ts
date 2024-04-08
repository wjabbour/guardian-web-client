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
    colors: ['Black', 'Grey'],
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
    colors: ['Black', 'Grey'],
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
    colors: ['Black', 'Red', 'Royal', 'Green', 'Grey', 'Concrete', 'White'],
    gender: 'male',
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
    code: 'LST650',
    name: 'Polo Shirt',
    fullname: 'Sport-Tek® Sport-Wick Polo',
    colors: ['Black', 'Red', 'Royal', 'Green', 'Grey', 'Concrete', 'White'],
    gender: 'female',
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
    code: 'NKDC1963',
    name: 'Dri-FIT Polo Shirt',
    fullname: 'Nike® Dri-FIT Polo',
    colors: ['Blue', 'Red', 'Black', 'White', 'Green', 'Anthracite','Grey'],
    gender: 'male',
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
    colors: ['Blue', 'Red', 'Black', 'White', 'Green', 'Anthracite','Grey'],
    gender: 'female',
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
    colors: ['Black', 'Blue'],
    gender: 'male',
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
    gender: 'female',
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
  }
]

