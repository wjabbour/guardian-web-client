export function createCartItem(
  itemConfiguration,
  quantity,
  userSelectionValue,
  cart,
  firstEmbroidery: string,
  secondEmbroidery: string,
  fallbackPrice: number
) {
  const selection = userSelectionValue.split(",");
  const size = selection[0];
  const color = selection[1];

  const key = `${itemConfiguration.code},${color}`;
  const cart_item = {
    type: itemConfiguration.type,
    name: itemConfiguration.fullname,
    price: getPriceWithDiscount(
      itemConfiguration,
      size,
      quantity,
      fallbackPrice
    ),
    quantity,
    size: size === "base" ? "Default" : size,
    color,
    code: itemConfiguration.code,
    placement: null,
    embroidery: firstEmbroidery,
  };

  if (secondEmbroidery) {
    cart_item["secondEmbroidery"] = secondEmbroidery;
  }

  if (cart[key]) {
    cart[key].quantity += cart_item.quantity;
    cart[key].price = getPriceWithDiscount(
      itemConfiguration,
      size,
      cart[key].quantity,
      fallbackPrice
    );
  } else {
    cart[key] = cart_item;
  }
}

function getPriceWithDiscount(
  itemConfiguration,
  size: number,
  cartQuantity: number,
  fallbackPrice: number
) {
  if (!itemConfiguration.pricing[size].discount) return fallbackPrice;

  /*
    the discount object is a mapping of quantity -> price where it is assumed that
    no quantity which is greater than another quantity can contain a higher price

    e.g. this is assumed to not be possible
    {
      100: 5
      200: 6
    }

    We always assume that the price decreases as quantity increases.

    Therefore, this function orders the quantities in the pricing map, successively checks if the
    cart quantity of this item is greater than or equal to the discount quantity, and if so updates the price, applying
    the discount
  */
  const sortedDiscountQuantites = Object.keys(
    itemConfiguration.pricing[size].discount
  ).sort((a, b) => Number(a) - Number(b));

  let price = fallbackPrice;
  for (const quantity of sortedDiscountQuantites) {
    if (cartQuantity >= Number(quantity)) {
      price = itemConfiguration.pricing[size].discount[quantity];
    } else {
      // if 499 < 500 then we dont need to check if 499 < 1000
      break;
    }
  }

  return price;
}
