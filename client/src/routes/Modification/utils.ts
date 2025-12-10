export function addCustomsToCart(
  item,
  quantity,
  color,
  cart,
  firstEmbroidery: string,
  secondEmbroidery: string,
  fallbackPrice: number
) {
  const key = `${item.code},${color}`;
  const cart_item = {
    type: item.type,
    name: item.fullname,
    price: getPriceWithDiscount(item, quantity, fallbackPrice),
    quantity,
    size: "default",
    color: color,
    code: item.code,
    placement: null,
    embroidery: firstEmbroidery,
  };

  if (secondEmbroidery) {
    cart_item["secondEmbroidery"] = secondEmbroidery;
  }

  if (cart[key]) {
    cart[key].quantity += cart_item.quantity;
    cart[key].price = getPriceWithDiscount(
      item,
      cart[key].quantity,
      fallbackPrice
    );
  } else {
    cart[key] = cart_item;
  }
}

function getPriceWithDiscount(
  item,
  cartQuantity: number,
  fallbackPrice: number
) {
  const sortedDiscountQuantites = Object.keys(item.pricing.base.discount).sort(
    (a, b) => Number(a) - Number(b)
  );

  let price = fallbackPrice;
  for (const quantity of sortedDiscountQuantites) {
    if (cartQuantity >= Number(quantity)) {
      price = item.pricing.base.discount[quantity];
    }
  }

  return price;
}
