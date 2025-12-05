function addCustomsToCart(
  item,
  quantity,
  color,
  cart,
  firstEmbroidery: string,
  secondEmbroidery: string,
  price: number
) {
  const key = `${item.code},${color}`;
  const cart_item = {
    type: item.type,
    name: item.fullname,
    price: getPriceWithDiscount(Number(quantity), 1, price),
    quantity: Number(quantity),
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
    cart[key].price = getPriceWithDiscount(item, cart[key].quantity, price);
  } else {
    cart[key] = cart_item;
  }
}

function getPriceWithDiscount(
  item,
  cartQuantity: number,
  fallbackPrice: number
) {
  const sortedSizes = Object.keys(item.sizes).sort(
    (a, b) => Number(a) - Number(b)
  );

  let price = fallbackPrice;
  for (const size of sortedSizes) {
    if (cartQuantity >= Number(size)) {
      price = item.sizes[size];
    }
  }

  return price;
}
