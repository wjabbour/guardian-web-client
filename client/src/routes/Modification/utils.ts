import { PlacementOption, SizeOption } from "../../lib/constants";
import { CatalogItem, CartItem } from "guardian-common";

/**
 * Gets the total quantity of all items in the cart that share the same code and size.
 * This is used for calculating discounts based on aggregated quantities.
 */
function getTotalQuantityForCodeAndSize(
  cart: { [key: string]: CartItem },
  code: string,
  size: string
): number {
  // Cart keys use the original size (e.g., "base" or "Small"), not the normalized size
  const prefix = `${code},${size},`;

  return Object.entries(cart)
    .filter(([key]) => key.startsWith(prefix))
    .reduce((total, [, item]) => total + item.quantity, 0);
}

/**
 * Updates prices for all cart items that share the same code and size.
 * This ensures discounts are applied consistently when quantities change.
 */
function updatePricesForCodeAndSize(
  cart: { [key: string]: CartItem },
  itemConfiguration: CatalogItem,
  code: string,
  size: string
): void {
  // Cart keys use the original size (e.g., "base" or "Small"), not the normalized size
  const prefix = `${code},${size},`;
  const totalQuantity = getTotalQuantityForCodeAndSize(cart, code, size);

  // Use the original size for pricing lookup (pricing keys are "base" or size names like "Small", "Medium")
  const sizeForPricing = size;

  Object.entries(cart).forEach(([key, item]) => {
    if (key.startsWith(prefix) && item.code === code) {
      item.price = getPriceWithDiscount(
        itemConfiguration,
        sizeForPricing,
        totalQuantity
      );
    }
  });
}

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

  // Get existing quantity for this specific cart item
  const existingQuantity = cart[key]?.quantity || 0;
  const newQuantity = existingQuantity + quantity;

  const cart_item = {
    type: itemConfiguration.type,
    name: itemConfiguration.fullname,
    price: 0, // Will be set by updatePricesForCodeAndSize
    quantity: newQuantity,
    size: size === "base" ? SizeOption.DEFAULT : size,
    color,
    code: itemConfiguration.code,
    ...(firstPlacement !== PlacementOption.DEFAULT
      ? { placement: firstPlacement }
      : {}),
    ...(firstEmbroidery !== "" ? { embroidery: firstEmbroidery } : {}),
    ...(secondEmbroidery !== null ? { secondEmbroidery, secondPlacement } : {}),
  };

  cart[key] = cart_item;

  // Update prices for all items with the same code + size to reflect the new aggregated quantity
  // This will recalculate based on the updated cart and set prices correctly
  updatePricesForCodeAndSize(cart, itemConfiguration, itemConfiguration.code, size);
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
