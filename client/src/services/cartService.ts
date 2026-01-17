import { Cart, CartItem } from "guardian-common";
import { recalculateDiscountsForCodeAndSize } from "../utils/discountUtils";
import { getCatalogItem } from "../lib/utils";

const CART_STORAGE_KEY = "cart";

/**
 * Cart service that abstracts cart operations including sessionStorage persistence
 * and state management. All cart mutations should go through this service.
 */
export class CartService {
    /**
     * Loads cart from sessionStorage. Returns empty cart if not found or invalid.
     */
    static loadCart(): Cart {
        try {
            const cartJson = sessionStorage.getItem(CART_STORAGE_KEY);
            if (cartJson) {
                return JSON.parse(cartJson);
            }
        } catch (error) {
            console.error("Error loading cart from sessionStorage:", error);
        }
        return {};
    }

    /**
     * Saves cart to sessionStorage.
     */
    static saveCart(cart: Cart): void {
        try {
            sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error("Error saving cart to sessionStorage:", error);
        }
    }

    /**
     * Updates cart state and persists to sessionStorage.
     * This is the primary method for cart mutations.
     */
    static updateCart(
        cart: Cart,
        setCart: React.Dispatch<React.SetStateAction<Cart>>
    ): void {
        setCart(cart);
        this.saveCart(cart);
    }

    /**
     * Removes an item from the cart by key.
     * Updates both state and sessionStorage.
     * Also recalculates discounts for remaining items with the same code and size.
     */
    static removeItem(
        cart: Cart,
        setCart: React.Dispatch<React.SetStateAction<Cart>>,
        key: string
    ): void {
        // Extract code and size from the cart key before removal
        // Cart key format: "code,size,color,firstEmbroidery,secondEmbroidery,firstPlacement,secondPlacement"
        const removedItem = cart[key];
        if (!removedItem) {
            console.warn(`Item with key "${key}" not found in cart`);
            return;
        }

        const keyParts = key.split(",");
        const removedItemCode = removedItem.code || keyParts[0];
        const removedItemSize = keyParts[1]; // Original size from cart key (e.g., "base" or "Small")

        // Create a deep copy to avoid mutating the original cart
        const newCart = this.cloneCart(cart);
        delete newCart[key];

        // Recalculate discounts for remaining items with the same code and size
        // This must happen after the item is removed so the quantity calculation is correct
        recalculateDiscountsForCodeAndSize(newCart, removedItemCode, removedItemSize, getCatalogItem);

        this.updateCart(newCart, setCart);
    }

    /**
     * Clears all items from the cart.
     * Updates both state and sessionStorage.
     */
    static clearCart(setCart: React.Dispatch<React.SetStateAction<Cart>>): void {
        const emptyCart: Cart = {};
        this.updateCart(emptyCart, setCart);
        sessionStorage.removeItem(CART_STORAGE_KEY);
    }

    /**
     * Gets the total quantity of all items in the cart.
     */
    static getCartItemCount(cart: Cart): number {
        return Object.values(cart || {}).reduce(
            (total, item) => total + (item.quantity || 0),
            0
        );
    }

    /**
     * Gets the total price of all items in the cart.
     * Returns formatted string with 2 decimal places.
     */
    static getCartTotal(cart: Cart): string {
        const total = Object.values(cart || {}).reduce(
            (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
            0
        );
        return total.toFixed(2);
    }

    /**
     * Creates a deep copy of the cart for mutation.
     * Use this when you need to modify cart items without affecting the original.
     */
    static cloneCart(cart: Cart): Cart {
        return structuredClone(cart);
    }
}
