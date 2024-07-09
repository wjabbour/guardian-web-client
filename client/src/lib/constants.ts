export const STORES = function () {
  const url = window.location.href
  if (url.includes('localhost:3000')) {
    return [
      'Stivers Ford Montgomery, 4000 Eastern Blvd Montgomery, AL, 36116',
      'Stivers Ford Montgomery, 500 Palisades Blvd, Birmingham, AL, 35209',
      'Stivers Hyundai, 9950 Farrow Rd, Columbia, SC, 29203',
      'Stivers CDJR, 2209 Cobbs Ford Road, Prattville, AL 36066',
      'Stivers Decatur Subaru, 1950 Orion DR, Decatur, GA 30033',
      'Stivers Chevrolet, 111 Newland Road, Columbia, SC 29229',
    ]
  } else if (url.includes('gpstivers.com')) {
    return [
      'Stivers Ford Montgomery, 4000 Eastern Blvd Montgomery, AL, 36116',
      'Stivers Ford Montgomery, 500 Palisades Blvd, Birmingham, AL, 35209',
      'Stivers Hyundai, 9950 Farrow Rd, Columbia, SC, 29203',
      'Stivers CDJR, 2209 Cobbs Ford Road, Prattville, AL 36066',
      'Stivers Decatur Subaru, 1950 Orion DR, Decatur, GA 30033',
      'Stivers Chevrolet, 111 Newland Road, Columbia, SC 29229',
    ]
  } else if (url.includes('gptameron.com')) {
    return [
      'Tameron Honda, 9871 Justina Ave Daphne, AL 36526',
      'Tameron Buick GMC, 27161 US - 98 Daphne, AL 36526',
      'Tameron CDJR, 27161 US - 98 Daphne, AL 36526',
      'Tameron Subaru, 1431 I-65 Service Road Mobile, AL 36606',
      'Tameron Nissan, 1015 E. I65 Service Road South Mobile, AL 36606',
      'Tameron Kia, 10611 Boney Ave D, Iberville, MS 39540',
      'Tameron Kia Westbank, 1884 Westbank Expressway Harvey, LA 70058',
      'Tameron Honda, 1675 Montgomery Blvd Birmingham, AL 35216',
      'Tameron Hyundai, 1595 Montgomery Hwy Hoover, AL 35216'
    ]
  } else if (url.includes('gp-premier.com')) {
    return [
      'Premier Honda, 11801 E I-10 Service Rd, New Orleans, LA 70128',
      'Toyota of New Orleans, 13150 I-10 Service Rd, New Orleans, LA 70128',
      'Premier Hyundai of Harvey, 1700 Westbank Expressway, Harvey, LA 70058',
      'Premier Nissan of Harvey, 4000 LaPalco Boulevard, Harvey, LA 70058',
      'Premier VW of Harvey, 4050 LaPalco Boulevard, Harvey, LA 70058',
      'Premier CDJR of Harvey, 1660 Westbrook Expressway, Harvey, LA 70058',
    ]
  }
}

export const KNOWN_CODES = [
  "STIFMO",
  "STIFBI",
  "STIHCO",
  "STICPR",
  "STISDE",
  "STICCO",
  "TAMHDA",
  "TAMBDA",
  "TAMCDA",
  "TAMSMO",
  "TAMNMO",
  "TAMKDI",
  "TAMKWE",
  "TAMHBI",
  "TAMEHO",
  "PREHNE",
  "TOYNNE",
  "PREHHA",
  "PRENHA",
  "PREVHA",
  "PRECHB"
]

export const EMBROIDERIES = function () {
  const url = window.location.href

  if (url.includes('localhost:3000')) {
    return {
      hat: ['Stivers', 'Quicklane', 'Ford', 'Hyundai', 'Chrysler', 'Dodge', 'Jeep', 'Ram'],
      mens: ['Stivers', 'Quicklane', 'Subaru'],
      womens: ['Stivers', 'Quicklane', 'Subaru'],
      accessory: ['Ford', 'Hyundai', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'Subaru']
    }
  } else if (url.includes('gpstivers.com')) {
    return {
      hat: ['Stivers', 'Quicklane', 'Ford', 'Hyundai', 'Chrysler', 'Dodge', 'Jeep', 'Ram'],
      mens: ['Stivers', 'Quicklane', 'Subaru'],
      womens: ['Stivers', 'Quicklane', 'Subaru'],
      accessory: ['Ford', 'Hyundai', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'Subaru']
    }
  } else if (url.includes('gptameron.com')) {
    return {
      mens: ['Tameron'],
      womens: ['Tameron'],
    }
  } else if (url.includes('gp-premier.com')) {
    return {
      mens: ['Tameron'],
      womens: ['Tameron'],
    }
 }  else if (url.includes('gp-premier.com')) {
    return {
      mens: ['Premier'],
      womens: ['Premier'],
    }
  }
}

export const LOGO_PLACEMENTS = function () {
  const url = window.location.href
  if (url.includes('localhost:3000')) {
    return ['Right Sleeve', 'Left Chest'];
  } else if (url.includes('gpstivers.com')) {
    return ['Right Sleeve', 'Left Chest'];
  } else if (url.includes('gptameron.com')) {
    return ['Right Sleeve'];
  } else if (url.includes('gp-premier.com')) {
    return ['Left Chest'];
}

export const TITLE = function () {
  const url = window.location.href
  if (url.includes('localhost:3000')) {
    return 'Local';
  } else if (url.includes('gpstivers.com')) {
    return 'Stivers';
  } else if (url.includes('gptameron.com')) {
    return 'Tameron';
  } else if (url.includes('gp-premier.com')) {
    return 'Premier';
  }
}

export const COMPANY_LOGO = function () {
  const url = window.location.href
  if (url.includes('localhost:3000')) {
    return 'stivers.png';
  } else if (url.includes('gpstivers.com')) {
    return 'stivers.png';
  } else if (url.includes('gptameron.com')) {
    return 'tameron.png';
  } else if (url.includes('gp-premier.com')) {
    return 'premier.png';
  }
}