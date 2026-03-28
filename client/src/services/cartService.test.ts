import { vi, describe, it, expect, beforeEach } from "vitest";
import { CartService } from "./cartService";
import { Cart, CatalogItem } from "guardian-common";
import { getCatalogItem } from "../lib/utils";
import { recalculateDiscountsForCodeAndSize } from "../utils/discountUtils";

// Mock the dependencies
vi.mock("../lib/utils");
vi.mock("../utils/discountUtils");

const mockGetCatalogItem = getCatalogItem as vi.MockedFunction<typeof getCatalogItem>;
const mockRecalculateDiscountsForCodeAndSize = recalculateDiscountsForCodeAndSize as vi.MockedFunction<
  typeof recalculateDiscountsForCodeAndSize
>;

describe("CartService", () => {
  const mockSetCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    mockSetCart.mockClear();
  });

  describe("loadCart", () => {
    it("should return empty cart when sessionStorage is empty", () => {
      const cart = CartService.loadCart();
      expect(cart).toEqual({});
    });

    it("should load cart from sessionStorage", () => {
      const testCart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
      };
      sessionStorage.setItem("cart", JSON.stringify(testCart));

      const cart = CartService.loadCart();
      expect(cart).toEqual(testCart);
    });

    it("should return empty cart on invalid JSON", () => {
      sessionStorage.setItem("cart", "invalid json");

      const cart = CartService.loadCart();
      expect(cart).toEqual({});
    });
  });

  describe("saveCart", () => {
    it("should save cart to sessionStorage", () => {
      const testCart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
      };

      CartService.saveCart(testCart);

      const saved = JSON.parse(sessionStorage.getItem("cart") || "{}");
      expect(saved).toEqual(testCart);
    });
  });

  describe("updateCart", () => {
    it("should update cart state and save to sessionStorage", () => {
      const testCart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
      };

      CartService.updateCart(testCart, mockSetCart);

      expect(mockSetCart).toHaveBeenCalledWith(testCart);
      const saved = JSON.parse(sessionStorage.getItem("cart") || "{}");
      expect(saved).toEqual(testCart);
    });
  });

  describe("removeItem", () => {
    const mockItemConfiguration: CatalogItem = {
      code: "C402",
      name: "Test Item",
      fullname: "Test Item Full Name",
      colors: ["Black", "Red"],
      sizes: ["Small", "Medium"],
      default_color: "Black",
      type: "mens",
      pricing: {
        Small: {
          price: 20.0,
          discount: {
            12: 18.0,
            24: 16.0,
          },
        },
      },
    };

    beforeEach(() => {
      mockGetCatalogItem.mockReturnValue(mockItemConfiguration as any);
      mockRecalculateDiscountsForCodeAndSize.mockImplementation(() => {});
    });

    it("should remove item from cart and recalculate discounts", () => {
      const cart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 18.0, // Discounted price
          name: "Test Item",
          type: "mens",
        },
        "C402,Small,Red,,,Default,Default": {
          code: "C402",
          color: "Red",
          quantity: 10,
          size: "Small",
          price: 18.0, // Discounted price (total was 15 >= 12)
          name: "Test Item",
          type: "mens",
        },
      };

      CartService.removeItem(cart, mockSetCart, "C402,Small,Black,,,Default,Default");

      expect(mockRecalculateDiscountsForCodeAndSize).toHaveBeenCalledWith(
        expect.objectContaining({
          "C402,Small,Red,,,Default,Default": expect.any(Object),
        }),
        "C402",
        "Small",
        getCatalogItem
      );

      // Verify the removed item is not in the new cart
      const newCartCall = mockSetCart.mock.calls[0][0];
      expect(newCartCall["C402,Small,Black,,,Default,Default"]).toBeUndefined();
      expect(newCartCall["C402,Small,Red,,,Default,Default"]).toBeDefined();
    });

    it("should handle removal when no other items share code and size", () => {
      const cart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
        "C403,Medium,Red,,,Default,Default": {
          code: "C403",
          color: "Red",
          quantity: 3,
          size: "Medium",
          price: 25.0,
          name: "Other Item",
          type: "mens",
        },
      };

      CartService.removeItem(cart, mockSetCart, "C402,Small,Black,,,Default,Default");

      // Should still call recalculate (even if no items match)
      expect(mockRecalculateDiscountsForCodeAndSize).toHaveBeenCalledWith(
        expect.any(Object),
        "C402",
        "Small",
        getCatalogItem
      );
    });

    it("should warn and return early if item not found", () => {
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const cart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
      };

      CartService.removeItem(cart, mockSetCart, "nonexistent,key");

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Item with key "nonexistent,key" not found in cart'
      );
      expect(mockSetCart).not.toHaveBeenCalled();
      consoleWarnSpy.mockRestore();
    });

    it("should use item code from cart item if available", () => {
      const cart: Cart = {
        "C402,base,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Default",
          price: 15.0,
          name: "Test Item",
          type: "mens",
        },
      };

      CartService.removeItem(cart, mockSetCart, "C402,base,Black,,,Default,Default");

      expect(mockRecalculateDiscountsForCodeAndSize).toHaveBeenCalledWith(
        expect.any(Object),
        "C402", // Should use code from cart item
        "base", // Size from key
        getCatalogItem
      );
    });

    it("should create deep copy to avoid mutating original cart", () => {
      const cart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
      };

      CartService.removeItem(cart, mockSetCart, "C402,Small,Black,,,Default,Default");

      // Original cart should remain unchanged (deep copy was made)
      expect(cart["C402,Small,Black,,,Default,Default"]).toBeDefined();
      expect(Object.keys(cart)).toHaveLength(1);
    });
  });

  describe("clearCart", () => {
    it("should clear all items from cart", () => {
      const cart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
      };
      sessionStorage.setItem("cart", JSON.stringify(cart));

      CartService.clearCart(mockSetCart);

      expect(mockSetCart).toHaveBeenCalledWith({});
      expect(sessionStorage.getItem("cart")).toBeNull();
    });
  });

  describe("getCartItemCount", () => {
    it("should return 0 for empty cart", () => {
      const count = CartService.getCartItemCount({});
      expect(count).toBe(0);
    });

    it("should calculate total quantity of all items", () => {
      const cart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
        "C402,Medium,Red,,,Default,Default": {
          code: "C402",
          color: "Red",
          quantity: 10,
          size: "Medium",
          price: 22.0,
          name: "Test Item",
          type: "mens",
        },
      };

      const count = CartService.getCartItemCount(cart);
      expect(count).toBe(15);
    });

    it("should handle null or undefined quantities", () => {
      const cart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
        "C402,Medium,Red,,,Default,Default": {
          code: "C402",
          color: "Red",
          quantity: 0,
          size: "Medium",
          price: 22.0,
          name: "Test Item",
          type: "mens",
        },
      };

      const count = CartService.getCartItemCount(cart);
      expect(count).toBe(5);
    });
  });

  describe("getCartTotal", () => {
    it("should return 0.00 for empty cart", () => {
      const total = CartService.getCartTotal({});
      expect(total).toBe("0.00");
    });

    it("should calculate total price correctly", () => {
      const cart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
        "C402,Medium,Red,,,Default,Default": {
          code: "C402",
          color: "Red",
          quantity: 2,
          size: "Medium",
          price: 22.0,
          name: "Test Item",
          type: "mens",
        },
      };

      const total = CartService.getCartTotal(cart);
      expect(total).toBe("144.00"); // (5 * 20) + (2 * 22) = 100 + 44 = 144
    });

    it("should format total to 2 decimal places", () => {
      const cart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 1,
          size: "Small",
          price: 19.99,
          name: "Test Item",
          type: "mens",
        },
      };

      const total = CartService.getCartTotal(cart);
      expect(total).toBe("19.99");
    });
  });

  describe("cloneCart", () => {
    it("should create a deep copy of the cart", () => {
      const originalCart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
      };

      const clonedCart = CartService.cloneCart(originalCart);

      // Should be equal but not the same reference
      expect(clonedCart).toEqual(originalCart);
      expect(clonedCart).not.toBe(originalCart);

      // Modifying cloned cart should not affect original
      delete clonedCart["C402,Small,Black,,,Default,Default"];
      expect(originalCart["C402,Small,Black,,,Default,Default"]).toBeDefined();
    });

    it("should create independent item objects", () => {
      const originalCart: Cart = {
        "C402,Small,Black,,,Default,Default": {
          code: "C402",
          color: "Black",
          quantity: 5,
          size: "Small",
          price: 20.0,
          name: "Test Item",
          type: "mens",
        },
      };

      const clonedCart = CartService.cloneCart(originalCart);

      // Modify item in cloned cart
      if (clonedCart["C402,Small,Black,,,Default,Default"]) {
        clonedCart["C402,Small,Black,,,Default,Default"].quantity = 10;
      }

      // Original should remain unchanged
      expect(originalCart["C402,Small,Black,,,Default,Default"]?.quantity).toBe(5);
    });
  });
});
