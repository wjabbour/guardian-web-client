import { CatalogItem, Cart } from "guardian-common";

/**
 * Gets the total quantity of all items in the cart that share the same code and size.
 * This is used for calculating discounts based on aggregated quantities.
 */
export function getTotalQuantityForCodeAndSize(
    cart: Cart,
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
 * Calculates the price for an item based on the aggregated quantity in the cart.
 * Takes into account quantity-based discounts.
 */
export function getPriceWithDiscount(
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
      The discount object is a mapping of quantity -> price where it is assumed that
      no quantity which is greater than another quantity can contain a higher price.
  
      e.g. this is assumed to not be possible:
      {
        100: 5
        200: 6
      }
  
      We always assume that the price decreases as quantity increases.
  
      Therefore, this function orders the quantities in the pricing map, successively checks if the
      cart quantity of this item is greater than or equal to the discount quantity, and if so updates the price, applying
      the discount.
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
            // if 499 < 500 then we don't need to check if 499 < 1000
            break;
        }
    }

    return price;
}

/**
 * Updates prices for all cart items that share the same code and size.
 * This ensures discounts are applied consistently when quantities change.
 * 
 * @param cart - The cart to update
 * @param itemConfiguration - The catalog item configuration for pricing lookup
 * @param code - The item code to update prices for
 * @param size - The size to update prices for (e.g., "base", "Small", "Medium")
 */
export function updatePricesForCodeAndSize(
    cart: Cart,
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

/**
 * Recalculates discounts for all items in the cart that share the same code and size
 * as the removed item. This should be called after removing an item from the cart.
 * 
 * @param cart - The cart to recalculate discounts for
 * @param removedItemCode - The code of the item that was removed
 * @param removedItemSize - The size of the item that was removed (original size from cart key, e.g., "base" or "Small")
 * @param getCatalogItem - Function to get catalog item configuration by code
 */
export function recalculateDiscountsForCodeAndSize(
    cart: Cart,
    removedItemCode: string,
    removedItemSize: string,
    getCatalogItem: (code: string) => CatalogItem | undefined
): void {
    // Get the catalog item configuration for pricing
    const itemConfiguration = getCatalogItem(removedItemCode);
    if (!itemConfiguration) {
        console.warn(`Could not find catalog item for code: ${removedItemCode}`);
        return;
    }

    // Recalculate prices for all remaining items with the same code and size
    updatePricesForCodeAndSize(cart, itemConfiguration, removedItemCode, removedItemSize);
}
