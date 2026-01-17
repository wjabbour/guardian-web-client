import { PlacementOption, SizeOption } from "../../lib/constants";
import { CatalogItem, CartItem, Cart } from "guardian-common";
import { updatePricesForCodeAndSize } from "../../utils/discountUtils";

export function createCartItem(
  itemConfiguration: CatalogItem,
  quantity: number,
  userSelectionValue: string,
  cart: Cart,
  firstEmbroidery: string,
  secondEmbroidery: string,
  firstPlacement: string,
  secondPlacement: string,
  sapVariation?: string | null
) {
  const selection = userSelectionValue.split(",");
  const size = selection[0];
  const color = selection[1];

  // Include sapVariation in the cart key if it exists
  // Format: "code,size,color,sapVariation,firstEmbroidery,secondEmbroidery,firstPlacement,secondPlacement"
  // or: "code,size,color,,firstEmbroidery,secondEmbroidery,firstPlacement,secondPlacement" if no sapVariation
  const key = sapVariation
    ? `${itemConfiguration.code},${size},${color},${sapVariation},${firstEmbroidery},${secondEmbroidery},${firstPlacement},${secondPlacement}`
    : `${itemConfiguration.code},${size},${color},,${firstEmbroidery},${secondEmbroidery},${firstPlacement},${secondPlacement}`;

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
    ...(sapVariation ? { sapVariation } : {}),
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
