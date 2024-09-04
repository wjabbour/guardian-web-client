import { CatalogItem } from './interfaces'

export const Catalog = function (): CatalogItem[] {
  const url = window.location.href
  if (url.includes('localhost:3000')) {
    return [
      {
        code: 'J317',
        name: 'Port Authority® Jacket',
        fullname: 'Port Authority® Core Soft Shell Jacket',
        colors: ['Black', 'Battleship Grey'],
        type: 'mens',
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
        name: 'Port Authority® Jacket',
        fullname: 'Port Authority® Ladies Core Soft Shell Jacket',
        colors: ['Black', 'Battleship Grey'],
        type: 'womens',
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
        name: 'Sport-Tek® Polo Shirt',
        fullname: 'Sport-Tek® Sport-Wick Polo',
        colors: ['Black', 'True Royal', 'Iron Grey', 'Grey Concrete', 'White', 'Navy', 'Blue Lake'],
        type: 'mens',
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
        name: 'Sport-Tek® Tall Polo Shirt',
        fullname: 'Sport-Tek® Tall Sport-Wick Polo',
        colors: ['Black', 'True Royal', 'Iron Grey', 'Grey Concrete', 'White', 'Navy', 'Blue Lake'],
        type: 'mens',
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
        name: 'Sport-Tek® Polo Shirt',
        fullname: 'Sport-Tek® Sport-Wick Polo',
        colors: ['Black', 'True Royal', 'Iron Grey', 'Grey Concrete', 'White', 'Navy', 'Blue Lake'],
        type: 'womens',
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
      // {
      //   code: 'CP80',
      //   name: 'Twill Cap',
      //   fullname: 'Port & Company® Six-Panel Twill Cap',
      //   colors: ['Black', 'True Red', 'Navy', 'Hunter', 'Royal', 'Charcoal', 'Woodland Brown'],
      //   type: 'hat',
      //   default_color: 'Black',
      //   sizes: {
      //     'One Size Fits All': 14.29
      //   }
      // },
      {
        code: '04032',
        name: '20oz. Revolve Tumbler',
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
        name: '10oz. Perfect-Fit Tumbler',
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
      // {
      //   code: 'C112',
      //   name: 'Snapback',
      //   fullname: 'Port Authority® Snapback Trucker Cap',
      //   colors: ['Black', 'Navy', 'Black White', 'Patriot Royal', 'Red White', 'Royal White', 'Grey Steel', 'Pink White', 'Woodland Camo', 'Khaki White'],
      //   type: 'hat',
      //   halfColors: ['Black White', 'Red White', 'Royal White', 'Pink White', 'Khaki White'],
      //   default_color: 'Black',
      //   sizes: {
      //     'One Size Fits All': 14.29
      //   }
      // },
      {
        code: 'NKDC1963',
        name: 'Nike® Dri-FIT Polo Shirt',
        fullname: 'Nike® Dri-FIT Polo',
        colors: ['Gym Blue', 'Valor Blue', 'Black', 'White', 'Anthracite', 'University Red', 'Navy', 'Blue Tint'],
        type: 'mens',
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
        code: 'CGM451',
        name: 'Opti-Vent Polo',
        fullname: 'Opti-Vent Polo',
        colors: ['Peacoat', 'Salsa', 'White'],
        type: 'mens',
        default_color: 'Black',
        sizes: {
          Small: 44.99,
          Medium: 44.99,
          Large: 44.99,
          XLarge: 44.99,
          '2XLarge': 46.99,
          '3XLarge': 47.99,
          '4XLarge': 48.99,
        }
      },
      {
        code: 'NKDC1991',
        name: 'Nike® Dri-FIT Polo Shirt',
        fullname: 'Nike® Dri-FIT Polo',
        colors: ['Gym Blue', 'Valor Blue', 'Black', 'White', 'Anthracite', 'University Red', 'Navy', 'Blue Tint'],
        type: 'womens',
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
        name: 'Port Authority® Rain Jacket',
        fullname: 'Port Authority® All-Conditions Jacket',
        colors: ['Black', 'Direct Blue'],
        type: 'mens',
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
        name: 'Port Authority® Rain Jacket',
        fullname: 'Port Authority® All-Conditions Jacket',
        colors: ['Black'],
        type: 'womens',
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
        name: 'Port Authority® 1/4-Zip Pullover',
        fullname: 'Port Authority® 1/4-Zip Pullover',
        colors: ['Black', 'Regatta Blue', 'True Navy', 'Iron Grey'],
        type: 'mens',
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
        code: 'ST657',
        name: 'Sport-Tek® Long Sleeve Polo Shirt',
        fullname: 'Sport-Tek® Long Sleeve Sport-Wick Polo',
        colors: ['Black','Iron Grey','White'],
        type: 'mens',
        default_color: 'Black',
        sizes: {
          Small: 26.99,
          Medium: 26.99,
          Large: 26.99,
          XLarge: 26.99,
          '2XLarge': 28.99,
          '3XLarge': 29.99,
          '4XLarge': 31.99,
        }
      },
      {
        code: 'L805',
        name: 'Port Authority® 1/4-Zip Pullover',
        fullname: 'Port Authority® 1/4-Zip Pullover',
        colors: ['Black', 'Regatta Blue', 'True Navy', 'Iron Grey'],
        type: 'womens',
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
  } else if (url.includes('gpstivers.com')) {
    return [
      {
        code: 'J317',
        name: 'Port Authority® Jacket',
        fullname: 'Port Authority® Core Soft Shell Jacket',
        colors: ['Black', 'Battleship Grey'],
        type: 'mens',
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
        name: 'Port Authority® Jacket',
        fullname: 'Port Authority® Ladies Core Soft Shell Jacket',
        colors: ['Black', 'Battleship Grey'],
        type: 'womens',
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
        name: 'Sport-Tek® Polo Shirt',
        fullname: 'Sport-Tek® Sport-Wick Polo',
        colors: ['Black', 'True Royal', 'Iron Grey', 'Grey Concrete', 'White', 'Navy', 'Blue Lake'],
        type: 'mens',
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
          '6XLarge': 29.99
        }
      },
      {
        code: 'TST650',
        name: 'Sport-Tek® Tall Polo Shirt',
        fullname: 'Sport-Tek® Tall Sport-Wick Polo',
        colors: ['Black', 'True Royal', 'Iron Grey', 'Grey Concrete', 'White', 'Navy', 'Blue Lake'],
        type: 'mens',
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
        name: 'Sport-Tek® Polo Shirt',
        fullname: 'Sport-Tek® Sport-Wick Polo',
        colors: ['Black', 'True Royal', 'Iron Grey', 'Grey Concrete', 'White', 'Navy', 'Blue Lake'],
        type: 'womens',
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
      // {
      //   code: 'CP80',
      //   name: 'Twill Cap',
      //   fullname: 'Port & Company® Six-Panel Twill Cap',
      //   colors: ['Black', 'True Red', 'Navy', 'Hunter', 'Royal', 'Charcoal', 'Woodland Brown'],
      //   type: 'hat',
      //   default_color: 'Black',
      //   sizes: {
      //     'One Size Fits All': 14.29
      //   }
      // },
      {
        code: '04032',
        name: '20oz. Revolve Tumbler',
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
        name: '10oz. Perfect-Fit Tumbler',
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
      // {
      //   code: 'C112',
      //   name: 'Snapback',
      //   fullname: 'Port Authority® Snapback Trucker Cap',
      //   colors: ['Black', 'Navy', 'Black White', 'Patriot Royal', 'Red White', 'Royal White', 'Grey Steel', 'Pink White', 'Woodland Camo', 'Khaki White'],
      //   type: 'hat',
      //   halfColors: ['Black White', 'Red White', 'Royal White', 'Pink White', 'Khaki White'],
      //   default_color: 'Black',
      //   sizes: {
      //     'One Size Fits All': 14.29
      //   }
      // },
      {
        code: 'NKDC1963',
        name: 'Nike® Dri-FIT Polo Shirt',
        fullname: 'Nike® Dri-FIT Polo',
        colors: ['Gym Blue', 'Valor Blue', 'Black', 'White', 'Anthracite', 'University Red', 'Navy', 'Blue Tint'],
        type: 'mens',
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
        name: 'Nike® Dri-FIT Polo Shirt',
        fullname: 'Nike® Dri-FIT Polo',
        colors: ['Gym Blue', 'Valor Blue', 'Black', 'White', 'Anthracite', 'University Red', 'Navy', 'Blue Tint'],
        type: 'womens',
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
        name: 'Port Authority® Rain Jacket',
        fullname: 'Port Authority® All-Conditions Jacket',
        colors: ['Black', 'Direct Blue'],
        type: 'mens',
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
        name: 'Port Authority® Rain Jacket',
        fullname: 'Port Authority® All-Conditions Jacket',
        colors: ['Black'],
        type: 'womens',
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
        code: 'CGM451',
        name: 'Opti-Vent Polo',
        fullname: 'Opti-Vent Polo',
        colors: ['Peacoat', 'Salsa', 'White'],
        type: 'mens',
        default_color: 'Black',
        sizes: {
          Small: 44.99,
          Medium: 44.99,
          Large: 44.99,
          XLarge: 44.99,
          '2XLarge': 46.99,
          '3XLarge': 47.99,
          '4XLarge': 48.99,
        }
      },
      {
        code: 'K805',
        name: 'Port Authority® 1/4-Zip Pullover',
        fullname: 'Port Authority® 1/4-Zip Pullover',
        colors: ['Black', 'Regatta Blue', 'True Navy', 'Iron Grey'],
        type: 'mens',
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
        name: 'Port Authority® 1/4-Zip Pullover',
        fullname: 'Port Authority® 1/4-Zip Pullover',
        colors: ['Black', 'Regatta Blue', 'True Navy', 'Iron Grey'],
        type: 'womens',
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
  } else if (url.includes('gptameron.com')) {
    return [
      {
        code: 'NKDC1963',
        name: 'Nike® Dri-FIT Polo Shirt',
        fullname: 'Nike® Dri-FIT Polo Shirt',
        colors: ['Anthracite', 'Game Royal', 'University Red', 'Black'],
        type: 'mens',
        default_color: 'Black',
        sizes: {
          Small: 36.99,
          Medium: 36.99,
          Large: 36.99,
          XLarge: 36.99,
          '2XLarge': 38.99,
          '3XLarge': 39.99,
          '4XLarge': 40.99,
          'LT': 40.99,
          'XLT': 42.99,
          '2XLT': 43.99,
          '3XLT': 44.99,
          '4XLT': 45.99
        }
      },
      {
        code: 'ST650',
        name: 'Sport-Tek® Polo Shirt',
        fullname: 'Sport-Tek® Micro Pique Polo',
        colors: ['Iron Grey', 'True Red', 'Black', 'True Royal'],
        type: 'mens',
        default_color: 'Black',
        sizes: {
          Small: 22.99,
          Medium: 22.99,
          Large: 22.99,
          XLarge: 22.99,
          '2XLarge': 24.99,
          '3XLarge': 26.99,
          '4XLarge': 27.99,
          '5XLarge': 28.99,
          '6XLarge': 29.99,
        }
      },
      {
        code: 'J317',
        name: 'Port Authority® Jacket',
        fullname: 'Port Authority® Core Soft Shell Jacket',
        colors: ['Black'],
        type: 'mens',
        default_color: 'Black',
        sizes: {
          Small: 37.99,
          Medium: 37.99,
          Large: 37.99,
          XLarge: 37.99,
          '2XLarge': 38.99,
          '3XLarge': 39.99,
          '4XLarge': 40.99,
          '5XLarge': 41.99,
          '6XLarge': 42.99
        }
      },
      {
        code: 'J7710',
        name: 'Port Authority® Slicker',
        fullname: 'Port Authority® Northwest Slicker',
        colors: ['Black'],
        type: 'mens',
        default_color: 'Black',
        sizes: {
          Small: 58.98,
          Medium: 58.98,
          Large: 58.98,
          XLarge: 58.98,
          '2XLarge': 60.98,
          '3XLarge': 61.98,
          '4XLarge': 62.98,
         }
      },
      {
        code: 'L7710',
        name: 'Port Authority® Slicker',
        fullname: 'Port Authority® Ladies Northwest Slicker',
        colors: ['Black'],
        type: 'womens',
        default_color: 'Black',
        sizes: {
          Small: 58.98,
          Medium: 58.98,
          Large: 58.98,
          XLarge: 58.98,
          '2XLarge': 60.98,
          '3XLarge': 61.98,
          '4XLarge': 62.98,
        }
      },
      {  
        code: 'MCK01086',
        name: 'Cutter & Buck® 1/4" Zip',
        fullname: 'Cutter & Buck® Eco Mens 1/4" Zip',
        colors: ['Black', 'Tour Blue'],
        type: 'mens',
        default_color: 'Black',
        sizes: {
          Small: 59.99,
          Medium: 59.99,
          Large: 59.99,
          XLarge: 59.99,
          '2XLarge': 61.99,
          '3XLarge': 62.99,
          '4XLarge': 63.99,
        }
      },
      {
        code: 'LST650',
        name: 'Sport-Tek® Polo Shirt',
        fullname: 'Sport-Tek® Micro Pique Polo',
        colors: ['Iron Grey', 'True Red', 'Black', 'True Royal'],
        type: 'womens',
        default_color: 'Black',
        sizes: {
          Small: 22.99,
          Medium: 22.99,
          Large: 22.99,
          XLarge: 22.99,
          '2XLarge': 24.99,
          '3XLarge': 26.99,
          '4XLarge': 27.99
        }
      },
      {
        code: 'NKDC1991',
        name: 'Ladies Nike® Polo',
        fullname: 'Ladies Nike® Micro Pique Polo',
        colors: ['Anthracite', 'Game Royal', 'University Red', 'Black'],
        type: 'womens',
        default_color: 'Black',
        sizes: {
          Small: 36.99,
          Medium: 36.99,
          Large: 36.99,
          XLarge: 36.99,
          '2XLarge': 38.99
        }
      },
      {
        code: 'LCK00151',
        name: 'Cutter & Buck® 1/4" Zip',
        fullname: 'Cutter & Buck® Eco Ladies 1/4" Zip',
        colors: ['Black', 'Tour Blue'],
        type: 'womens',
        default_color: 'Black',
        sizes: {
          Small: 59.99,
          Medium: 59.99,
          Large: 59.99,
          XLarge: 59.99,
          '2XLarge': 61.99,
          '3XLarge': 62.99,
          '4XLarge': 63.99
        }
      },
      {
        code: 'L317',
        name: 'Port Authority® Jacket',
        fullname: 'Port Authority® Ladies Core Soft Shell Jacket',
        colors: ['Black'],
        type: 'womens',
        default_color: 'Black',
        sizes: {
          Small: 37.99,
          Medium: 37.99,
          Large: 37.99,
          XLarge: 37.99,
          '2XLarge': 38.99,
          '3XLarge': 39.99,
          '4XLarge': 40.99,
        }
      },
    ]
  } else if (url.includes('gp-premier.com')) {
    return [
      {
        code: 'ST650',
        name: 'Sport-Tek® Polo Shirt',
        fullname: 'Sport-Tek® Sport-Wick Polo',
        colors: ['Black', 'Iron Grey', 'White'],
        type: 'mens',
        default_color: 'Black',
        sizes: {
            Small: 22.99,
            Medium: 22.99,
            Large: 22.99,
            XLarge: 22.99,
            '2XLarge': 24.98,
            '3XLarge': 28.98,
            '4XLarge': 30.98,
            '5XLarge': 34.98,
            '6XLarge': 36.98,
          }
        },
        {         
            code: 'LST650',
            name: 'Sport-Tek® Polo Shirt',
            fullname: 'Sport-Tek® Sport-Wick Polo',
            colors: ['Black', 'Iron Grey', 'White'],
            type: 'womens',
            default_color: 'Black',
            sizes: {
              Small: 22.99,
              Medium: 22.99,
              Large: 22.99,
              XLarge: 22.99,
              '2XLarge': 24.98,
              '3XLarge': 28.98,
              '4XLarge': 30.98,
            }
        },
        {   
          code: 'TST650',
          name: 'Sport-Tek® Tall Polo Shirt',
          fullname: 'Sport-Tek® Tall Sport-Wick Polo',
          colors: ['Black', 'Iron Grey', 'White'],
          type: 'mens',
          default_color: 'Black',
          sizes: {
            LT: 24.98,
            XLT: 26.98,
            '2XLT': 28.98,
            '3XLT': 30.98,
            '4XLT': 32.98,
          }
        },
        {
          code: 'ST657',
          name: 'Sport-Tek® Long Sleeve Polo Shirt',
          fullname: 'Sport-Tek® Long Sleeve Sport-Wick Polo',
          colors: ['Black','Iron Grey','White'],
          type: 'mens',
          default_color: 'Black',
          sizes: {
            Small: 26.99,
            Medium: 26.99,
            Large: 26.99,
            XLarge: 26.99,
            '2XLarge': 28.99,
            '3XLarge': 29.99,
            '4XLarge': 31.99,
          }
        },
        {
          code: 'NKDC1963',
          name: 'Nike® Dri-FIT Polo Shirt',
          fullname: 'Nike® Dri-FIT Polo',
          colors: ['Anthracite','Black', 'University Red', 'White'],
          type: 'mens',
          default_color: 'Black',
          sizes: {
            Small: 36.99,
            Medium: 36.99,
            Large: 36.99,
            XLarge: 36.99,
            '2XLarge': 38.99,
            '3XLarge': 39.99,
            '4XLarge': 40.99,
            'LT': 40.99,
            'XLT': 42.99,
            '2XLT': 43.99,
            '3XLT': 44.99,
            '4XLT': 45.99
          }
        },
        {   
          code: 'NKDC1991',
          name: 'Ladies Nike® Polo',
          fullname: 'Ladies Nike® Micro Pique Polo',
          colors: ['Anthracite','Black', 'University Red', 'White'],
          type: 'womens',
          default_color: 'Black',
          sizes: {
            Small: 36.99,
            Medium: 36.99,
            Large: 36.99,
            XLarge: 36.99,
            '2XLarge': 38.99
          }
        },
        {
          code: 'L317',
          name: 'Port Authority® Jacket',
          fullname: 'Port Authority® Ladies Core Soft Shell Jacket',
          colors: ['Black'],
          type: 'womens',
          default_color: 'Black',
          sizes: {
            Small: 37.99,
            Medium: 37.99,
            Large: 37.99,
            XLarge: 37.99,
            '2XLarge': 38.99,
            '3XLarge': 39.99,
            '4XLarge': 40.99,
          }
        },
        {
          code: 'J317',
          name: 'Port Authority® Jacket',
          fullname: 'Port Authority® Core Soft Shell Jacket',
          colors: ['Black'],
          type: 'mens',
          default_color: 'Black',
          sizes: {
            Small: 37.99,
            Medium: 37.99,
            Large: 37.99,
            XLarge: 37.99,
            '2XLarge': 38.99,
            '3XLarge': 39.99,
            '4XLarge': 40.99,
            '5XLarge': 41.99,
            '6XLarge': 42.99
          }
        },      
        {
          code: 'K805',
          name: 'Port Authority® 1/4-Zip Pullover',
          fullname: 'Port Authority® 1/4-Zip Pullover',
          colors: ['Black'],
          type: 'mens',
          default_color: 'Black',
          sizes: {
            Small: 30.99,
            Medium: 30.99,
            Large: 30.99,
            XLarge: 30.99,
            '2XLarge': 32.99,
            '3XLarge': 33.99,
            '4XLarge': 34.99,
        }
      },
      {
        code: 'L805',
        name: 'Port Authority® 1/4-Zip Pullover',
        fullname: 'Port Authority® 1/4-Zip Pullover',
        colors: ['Black'],
        type: 'womens',
        default_color: 'Black',
        sizes: {
          Small: 30.99,
          Medium: 30.99,
          Large: 30.99,
          XLarge: 30.99,
          '2XLarge': 32.99,
          '3XLarge': 33.99,
          '4XLarge': 34.99,
        }
      },
     ]
  } else if (url.includes('gp-------.com')) {
    return [
      {
        code: 'J317',
        name: 'Port Authority® Jacket',
        fullname: 'Port Authority® Core Soft Shell Jacket',
        colors: ['Black', 'Battleship Grey'],
        type: 'mens',
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
        name: 'Port Authority® Jacket',
        fullname: 'Port Authority® Ladies Core Soft Shell Jacket',
        colors: ['Black', 'Battleship Grey'],
        type: 'womens',
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
        name: 'Sport-Tek® Polo Shirt',
        fullname: 'Sport-Tek® Sport-Wick Polo',
        colors: ['Black', 'True Royal', 'Iron Grey', 'Grey Concrete', 'White', 'Navy', 'Blue Lake'],
        type: 'mens',
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
          '6XLarge': 29.99
        }
      },
      {
        code: 'TST650',
        name: 'Sport-Tek® Tall Polo Shirt',
        fullname: 'Sport-Tek® Tall Sport-Wick Polo',
        colors: ['Black', 'True Royal', 'Iron Grey', 'Grey Concrete', 'White', 'Navy', 'Blue Lake'],
        type: 'mens',
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
        name: 'Sport-Tek® Polo Shirt',
        fullname: 'Sport-Tek® Sport-Wick Polo',
        colors: ['Black', 'True Royal', 'Iron Grey', 'Grey Concrete', 'White', 'Navy', 'Blue Lake'],
        type: 'womens',
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
      // {
      //   code: 'CP80',
      //   name: 'Twill Cap',
      //   fullname: 'Port & Company® Six-Panel Twill Cap',
      //   colors: ['Black', 'True Red', 'Navy', 'Hunter', 'Royal', 'Charcoal', 'Woodland Brown'],
      //   type: 'hat',
      //   default_color: 'Black',
      //   sizes: {
      //     'One Size Fits All': 14.29
      //   }
      // },
      {
        code: '04032',
        name: '20oz. Revolve Tumbler',
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
        name: '10oz. Perfect-Fit Tumbler',
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
      // {
      //   code: 'C112',
      //   name: 'Snapback',
      //   fullname: 'Port Authority® Snapback Trucker Cap',
      //   colors: ['Black', 'Navy', 'Black White', 'Patriot Royal', 'Red White', 'Royal White', 'Grey Steel', 'Pink White', 'Woodland Camo', 'Khaki White'],
      //   type: 'hat',
      //   halfColors: ['Black White', 'Red White', 'Royal White', 'Pink White', 'Khaki White'],
      //   default_color: 'Black',
      //   sizes: {
      //     'One Size Fits All': 14.29
      //   }
      // },
      {
        code: 'NKDC1963',
        name: 'Nike® Dri-FIT Polo Shirt',
        fullname: 'Nike® Dri-FIT Polo',
        colors: ['Gym Blue', 'Valor Blue', 'Black', 'White', 'Anthracite', 'Navy', 'Blue Tint'],
        type: 'mens',
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
        name: 'Nike® Dri-FIT Polo Shirt',
        fullname: 'Nike® Dri-FIT Polo',
        colors: ['Gym Blue', 'Valor Blue', 'Black', 'White', 'Anthracite', 'Navy', 'Blue Tint'],
        type: 'womens',
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
        name: 'Port Authority® Rain Jacket',
        fullname: 'Port Authority® All-Conditions Jacket',
        colors: ['Black', 'Direct Blue'],
        type: 'mens',
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
        name: 'Port Authority® Rain Jacket',
        fullname: 'Port Authority® All-Conditions Jacket',
        colors: ['Black'],
        type: 'womens',
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
        name: 'Port Authority® 1/4-Zip Pullover',
        fullname: 'Port Authority® 1/4-Zip Pullover',
        colors: ['Black', 'Regatta Blue', 'True Navy', 'Iron Grey'],
        type: 'mens',
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
        name: 'Port Authority® 1/4-Zip Pullover',
        fullname: 'Port Authority® 1/4-Zip Pullover',
        colors: ['Black', 'Regatta Blue', 'True Navy', 'Iron Grey'],
        type: 'womens',
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
      }
    ]
  }
}