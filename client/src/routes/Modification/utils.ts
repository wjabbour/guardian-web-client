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

  console.log('size', size, 'color', color)

  const key = `${itemConfiguration.code},${color}`;
  const cart_item = {
    type: itemConfiguration.type,
    name: itemConfiguration.fullname,
    price: getPriceWithDiscount(itemConfiguration, size, quantity, fallbackPrice),
    quantity,
    size,
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
  console.log(itemConfiguration, size, 'hey')
  if (!itemConfiguration.pricing[size].discount) return fallbackPrice;

  const sortedDiscountQuantites = Object.keys(itemConfiguration.pricing[size].discount).sort(
    (a, b) => Number(a) - Number(b)
  );

  let price = fallbackPrice;
  for (const quantity of sortedDiscountQuantites) {
    if (cartQuantity >= Number(quantity)) {
      price = itemConfiguration.pricing.base.discount[quantity];
    }
  }

  return price;
}
