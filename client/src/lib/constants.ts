export const STORES = [
    'Stivers Ford Montgomery, 4000 Eastern Blvd Montgomery, AL, 36116',  
    'Stivers Ford Montgomery, 500 Palisades Blvd, Birmingham, AL, 35209', 
    'Stivers Hyundai, 9950 Farrow Rd, Columbia, SC, 29203', 
    'Stivers CDJR, 2209 Cobbs Ford Road, Prattville, AL 36066', 
    'Stivers Decatur Subaru, 1950 Orion DR, Decatur, GA 30033', 
    'Stivers Chevrolet, 111 Newland Road, Columbia, SC 29229', 
]

export const EMBROIDERIES = {
  hat: ['Stivers', 'Quicklane', 'Ford', 'Hyundai', 'Chrysler', 'Dodge', 'Jeep', 'Ram'],
  mens: ['Stivers', 'Quicklane', 'Subaru'],
  womens: ['Stivers', 'Quicklane', 'Subaru'],
  accessory: ['Ford', 'Hyundai', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'Subaru']
}

export const LOGO_PLACEMENTS = function () {
  const url = window.location.href
  if (url.includes('localhost:3000')) {
    return ['Right Sleeve', 'Left Chest'];
  } else if (url.includes('gpstivers.com')) {
    return ['Right Sleeve', 'Left Chest'];
  }
}

