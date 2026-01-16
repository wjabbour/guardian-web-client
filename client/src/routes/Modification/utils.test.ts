import {
  createCartItem,
  verifyEmbroidery,
  verifyQuantity,
  verifyPlacement,
} from "./utils";
import { CatalogItem, CartItem } from "guardian-common";
import { PlacementOption, SizeOption } from "../../lib/constants";

describe("Modification Utils", () => {
  describe("createCartItem", () => {
    const mockItemConfiguration: CatalogItem = {
      code: "C402",
      name: "Test Item",
      fullname: "Test Item Full Name",
      colors: ["Black", "Red"],
      sizes: ["Small", "Medium", "Large"],
      default_color: "Black",
      type: "mens",
      pricing: {
        Small: {
          price: 20.0,
          discount: {
            12: 18.0,
            24: 16.0,
            50: 14.0,
          },
        },
        Medium: {
          price: 22.0,
          discount: {
            12: 20.0,
            24: 18.0,
          },
        },
        base: {
          price: 15.0,
          discount: {
            10: 13.0,
            25: 11.0,
          },
        },
      },
    };

    beforeEach(() => {
      // Reset cart before each test
    });

    it("should create a new cart item with correct properties", () => {
      const cart: { [key: string]: CartItem } = {};
      const quantity = 5;
      const userSelectionValue = "Small,Black";

      createCartItem(
        mockItemConfiguration,
        quantity,
        userSelectionValue,
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );

      const key = "C402,Small,Black,,,Default,Default";
      expect(cart[key]).toBeDefined();
      expect(cart[key].code).toBe("C402");
      expect(cart[key].quantity).toBe(5);
      expect(cart[key].size).toBe("Small");
      expect(cart[key].color).toBe("Black");
      expect(cart[key].name).toBe("Test Item Full Name");
      expect(cart[key].price).toBe(20.0); // Base price for quantity < 12
    });

    it("should apply discount when total quantity reaches threshold", () => {
      const cart: { [key: string]: CartItem } = {};
      const quantity1 = 10;
      const quantity2 = 5; // Total will be 15, which is >= 12

      // Add first item
      createCartItem(
        mockItemConfiguration,
        quantity1,
        "Small,Black",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );

      // Add second item with same code and size but different color
      createCartItem(
        mockItemConfiguration,
        quantity2,
        "Small,Red",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );

      const key1 = "C402,Small,Black,,,Default,Default";
      const key2 = "C402,Small,Red,,,Default,Default";

      // Both should have discounted price (18.0) because total quantity is 15 >= 12
      expect(cart[key1].price).toBe(18.0);
      expect(cart[key2].price).toBe(18.0);
      expect(cart[key1].quantity).toBe(10);
      expect(cart[key2].quantity).toBe(5);
    });

    it("should apply higher discount for larger aggregated quantities", () => {
      const cart: { [key: string]: CartItem } = {};

      // Add items to reach 25 total quantity
      createCartItem(
        mockItemConfiguration,
        10,
        "Small,Black",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );
      createCartItem(
        mockItemConfiguration,
        15,
        "Small,Red",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );

      const key1 = "C402,Small,Black,,,Default,Default";
      const key2 = "C402,Small,Red,,,Default,Default";

      // Total is 25, which is >= 24, so price should be 16.0
      expect(cart[key1].price).toBe(16.0);
      expect(cart[key2].price).toBe(16.0);
    });

    it("should not apply discount when quantity is below threshold", () => {
      const cart: { [key: string]: CartItem } = {};

      createCartItem(
        mockItemConfiguration,
        5,
        "Small,Black",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );

      const key = "C402,Small,Black,,,Default,Default";
      expect(cart[key].price).toBe(20.0); // Base price, no discount
    });

    it("should handle base size correctly", () => {
      const cart: { [key: string]: CartItem } = {};

      createCartItem(
        mockItemConfiguration,
        5,
        "base,Black",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );

      const key = "C402,base,Black,,,Default,Default";
      expect(cart[key]).toBeDefined();
      expect(cart[key].size).toBe(SizeOption.DEFAULT);
      expect(cart[key].price).toBe(15.0); // Base pricing
    });

    it("should aggregate quantities for base size across different colors", () => {
      const cart: { [key: string]: CartItem } = {};

      createCartItem(
        mockItemConfiguration,
        10,
        "base,Black",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );
      createCartItem(
        mockItemConfiguration,
        5,
        "base,Red",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );

      const key1 = "C402,base,Black,,,Default,Default";
      const key2 = "C402,base,Red,,,Default,Default";

      // Total is 15, which is >= 10, so price should be 13.0
      expect(cart[key1].price).toBe(13.0);
      expect(cart[key2].price).toBe(13.0);
    });

    it("should not aggregate quantities for different sizes", () => {
      const cart: { [key: string]: CartItem } = {};

      createCartItem(
        mockItemConfiguration,
        15,
        "Small,Black",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );
      createCartItem(
        mockItemConfiguration,
        15,
        "Medium,Black",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );

      const key1 = "C402,Small,Black,,,Default,Default";
      const key2 = "C402,Medium,Black,,,Default,Default";

      // Small should have discount (15 >= 12), Medium should have discount (15 >= 12)
      // But they're calculated separately
      expect(cart[key1].price).toBe(18.0); // Small discount
      expect(cart[key2].price).toBe(20.0); // Medium discount
    });

    it("should update existing cart item quantity", () => {
      const cart: { [key: string]: CartItem } = {};

      createCartItem(
        mockItemConfiguration,
        5,
        "Small,Black",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );

      createCartItem(
        mockItemConfiguration,
        10,
        "Small,Black",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );

      const key = "C402,Small,Black,,,Default,Default";
      expect(cart[key].quantity).toBe(15);
      expect(cart[key].price).toBe(18.0); // Discounted price for 15 items
    });

    it("should include embroidery and placement in cart key", () => {
      const cart: { [key: string]: CartItem } = {};

      createCartItem(
        mockItemConfiguration,
        5,
        "Small,Black",
        cart,
        "Logo1",
        "Logo2",
        "Front",
        "Back"
      );

      const key = "C402,Small,Black,Logo1,Logo2,Front,Back";
      expect(cart[key]).toBeDefined();
      expect(cart[key].embroidery).toBe("Logo1");
      expect(cart[key].secondEmbroidery).toBe("Logo2");
      expect(cart[key].placement).toBe("Front");
      expect(cart[key].secondPlacement).toBe("Back");
    });

    it("should handle items without discount structure", () => {
      const itemWithoutDiscount: CatalogItem = {
        ...mockItemConfiguration,
        pricing: {
          Small: {
            price: 20.0,
            // No discount property
          },
        },
      };

      const cart: { [key: string]: CartItem } = {};

      createCartItem(
        itemWithoutDiscount,
        50,
        "Small,Black",
        cart,
        "",
        "",
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT
      );

      const key = "C402,Small,Black,,,Default,Default";
      expect(cart[key].price).toBe(20.0); // Base price, no discount applied
    });
  });

  describe("verifyEmbroidery", () => {
    const mockItemConfiguration: CatalogItem = {
      code: "C402",
      name: "Test Item",
      fullname: "Test Item Full Name",
      colors: ["Black"],
      default_color: "Black",
      type: "mens",
      pricing: {
        base: { price: 10.0 },
      },
    };

    it("should return empty string when no embroideries are required", () => {
      const result = verifyEmbroidery(
        mockItemConfiguration,
        [],
        "",
        null
      );
      expect(result).toBe("");
    });

    it("should return error when first embroidery is missing", () => {
      const result = verifyEmbroidery(
        mockItemConfiguration,
        ["Logo1", "Logo2"],
        "",
        null
      );
      expect(result).toBe("No embroidery/logo selected");
    });

    it("should return error when second embroidery is empty string", () => {
      const result = verifyEmbroidery(
        mockItemConfiguration,
        ["Logo1", "Logo2"],
        "Logo1",
        ""
      );
      expect(result).toBe("No second embroidery/logo selected");
    });

    it("should return empty string when both embroideries are provided", () => {
      const result = verifyEmbroidery(
        mockItemConfiguration,
        ["Logo1", "Logo2"],
        "Logo1",
        "Logo2"
      );
      expect(result).toBe("");
    });

    it("should return empty string when second embroidery is null and not required", () => {
      const result = verifyEmbroidery(
        mockItemConfiguration,
        ["Logo1"],
        "Logo1",
        null
      );
      expect(result).toBe("");
    });
  });

  describe("verifyQuantity", () => {
    it("should return false for empty selection", () => {
      expect(verifyQuantity({})).toBe(false);
    });

    it("should return false when all quantities are zero", () => {
      expect(verifyQuantity({ "Small,Black": 0, "Medium,Red": 0 })).toBe(
        false
      );
    });

    it("should return true when at least one quantity is greater than zero", () => {
      expect(verifyQuantity({ "Small,Black": 5, "Medium,Red": 0 })).toBe(
        true
      );
    });

    it("should return true when multiple quantities are greater than zero", () => {
      expect(verifyQuantity({ "Small,Black": 5, "Medium,Red": 10 })).toBe(
        true
      );
    });
  });

  describe("verifyPlacement", () => {
    it("should return empty string when first placement is default", () => {
      const result = verifyPlacement(
        PlacementOption.DEFAULT,
        PlacementOption.DEFAULT,
        null
      );
      expect(result).toBe("");
    });

    it("should return empty string when placements are different", () => {
      const result = verifyPlacement("Front", "Back", "Logo2");
      expect(result).toBe("");
    });

    it("should return error when placements are the same and second embroidery exists", () => {
      const result = verifyPlacement("Front", "Front", "Logo2");
      expect(result).toBe("First and second placement must be different");
    });

    it("should return empty string when placements are same but no second embroidery", () => {
      const result = verifyPlacement("Front", "Front", null);
      expect(result).toBe("");
    });
  });
});
