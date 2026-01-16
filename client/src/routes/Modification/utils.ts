import { PlacementOption, SizeOption } from "../../lib/constants";
import { CatalogItem, CartItem } from "guardian-common";

export function createCartItem(
  itemConfiguration: CatalogItem,
  quantity: number,
  userSelectionValue: string,
  cart: { [key: string]: CartItem },
  firstEmbroidery: string,
  secondEmbroidery: string,
  firstPlacement: string,
  secondPlacement: string
) {
  const selection = userSelectionValue.split(",");
  const size = selection[0];
  const color = selection[1];

  const key = `${itemConfiguration.code},${size},${color},${firstEmbroidery},${secondEmbroidery},${firstPlacement},${secondPlacement}`;
  const cart_item = {
    type: itemConfiguration.type,
    name: itemConfiguration.fullname,
    price: getPriceWithDiscount(itemConfiguration, size, quantity),
    quantity,
    size: size === "base" ? SizeOption.DEFAULT : size,
    color,
    code: itemConfiguration.code,
    ...(firstPlacement !== PlacementOption.DEFAULT
      ? { placement: firstPlacement }
      : {}),
    ...(firstEmbroidery !== "" ? { embroidery: firstEmbroidery } : {}),
    ...(secondEmbroidery !== null ? { secondEmbroidery, secondPlacement } : {}),
  };

  if (cart[key]) {
    cart[key].quantity += cart_item.quantity;
    cart[key].price = getPriceWithDiscount(
      itemConfiguration,
      size,
      cart[key].quantity
    );
  } else {
    cart[key] = cart_item;
  }
}

function getPriceWithDiscount(
  itemConfiguration: CatalogItem,
  size: string | number,
  cartQuantity: number
): number {
  // Handle string sizes (e.g., "Small", "Medium", "OSFA", "base")
  const sizeKey = typeof size === "number" ? size.toString() : size;

  const sizePricing = itemConfiguration.pricing[sizeKey];
  if (!sizePricing) {
    console.warn(`No pricing found for size "${sizeKey}" in item ${itemConfiguration.code}`);
    return 0;
  }

  let price = sizePricing.price;
  const discount = sizePricing.discount;
  if (!discount) return price;

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
  const sortedDiscountQuantities = Object.keys(discount).sort(
    (a, b) => Number(a) - Number(b)
  );

  for (const quantityStr of sortedDiscountQuantities) {
    const quantity = Number(quantityStr);
    if (cartQuantity >= quantity) {
      // Access discount using the numeric key
      price = discount[quantity];
    } else {
      // if 499 < 500 then we dont need to check if 499 < 1000
      break;
    }
  }

  return price;
}

export function verifyEmbroidery(
  itemConfiguration: CatalogItem,
  embroideries: string[],
  firstEmbroidery: string,
  secondEmbroidery: string | null
): string {
  if (embroideries.length === 0) return "";

  if (!firstEmbroidery) return "No embroidery/logo selected";

  if (secondEmbroidery === "") return "No second embroidery/logo selected";

  return "";
}

export function verifyQuantity(userSelection: { [key: string]: number }): boolean {
  if (Object.keys(userSelection).length === 0) return false;
  if (Object.values(userSelection).every((value) => value === 0)) return false;

  return true;
}

export function verifyPlacement(
  firstPlacement: string,
  secondPlacement: string,
  secondEmbroidery: string | null
): string {
  if (firstPlacement === PlacementOption.DEFAULT) return "";
  if (firstPlacement === secondPlacement && secondEmbroidery !== null)
    return "First and second placement must be different";

  return "";
}
