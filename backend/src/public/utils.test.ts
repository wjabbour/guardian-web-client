import { describe, it, expect, vi } from "vitest";
import { createOrderCsv, CSV_HEADERS } from "./utils";

vi.mock("guardian-common", () => ({
  getStore: (_companyName: string, storeCode: string) => `Store-${storeCode}`,
  getConfigValue: vi.fn(),
  getCatalog: vi.fn().mockReturnValue([]),
}));

vi.mock("pino", () => ({ default: () => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn() }) }));

vi.mock("@aws-sdk/client-ses", () => ({
  SESClient: vi.fn(),
  SendRawEmailCommand: vi.fn(),
}));

const baseOrder = {
  created_at: "1700000000000",
  store: "GPC81",
  company_name: "GPC",
  first_name: "Jane",
  last_name: "Doe",
  bypass: false,
  transaction_id: "PAYPAL-TX-123",
  order_id: "uuid-abc-123",
  order: [
    {
      code: "SHIRT01",
      sapVariation: null,
      quantity: 2,
      description: "Classic Tee",
      size: "M",
      color: "Blue",
      embroidery: "Logo A",
      placement: "Left Chest",
      secondEmbroidery: "",
      secondPlacement: "",
      price: 29.99,
    },
  ],
};

describe("createOrderCsv", () => {
  it("includes the header row as the first line", () => {
    const csv = createOrderCsv([baseOrder]);
    const firstLine = csv.split("\n")[0];
    expect(firstLine).toBe(CSV_HEADERS.join(","));
  });

  it("produces one data row per line item", () => {
    const order = {
      ...baseOrder,
      order: [baseOrder.order[0], { ...baseOrder.order[0], code: "HAT01", quantity: 1 }],
    };
    const lines = createOrderCsv([order]).split("\n").filter(Boolean);
    expect(lines).toHaveLength(3); // header + 2 items
  });

  it("includes orderId and transactionId in each row", () => {
    const csv = createOrderCsv([baseOrder]);
    const dataRow = csv.split("\n")[1];
    expect(dataRow).toContain('"PAYPAL-TX-123"');
    expect(dataRow).toContain('"uuid-abc-123"');
  });

  it("falls back to N/A when transaction_id is missing", () => {
    const order = { ...baseOrder, transaction_id: undefined };
    const csv = createOrderCsv([order]);
    expect(csv).toContain('"N/A"');
  });

  it("falls back to N/A when order_id is missing", () => {
    const order = { ...baseOrder, order_id: undefined };
    const csv = createOrderCsv([order]);
    const dataRow = csv.split("\n")[1];
    // last quoted value in the row is orderId
    const values = dataRow.match(/"[^"]*"/g) ?? [];
    expect(values[values.length - 1]).toBe('"N/A"');
  });

  it("appends sapVariation to item code when present", () => {
    const order = {
      ...baseOrder,
      order: [{ ...baseOrder.order[0], code: "SHIRT01", sapVariation: "BLU" }],
    };
    const csv = createOrderCsv([order]);
    expect(csv).toContain('"SHIRT01BLU"');
  });

  it("uses bare item code when sapVariation is absent", () => {
    const csv = createOrderCsv([baseOrder]);
    expect(csv).toContain('"SHIRT01"');
  });

  it("formats the date as MM/DD/YYYY", () => {
    const csv = createOrderCsv([baseOrder]);
    expect(csv).toMatch(/"[01]\d\/[0-3]\d\/\d{4}"/);
  });

  it("returns only the header row for an empty order list", () => {
    const csv = createOrderCsv([]);
    const lines = csv.split("\n").filter(Boolean);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toBe(CSV_HEADERS.join(","));
  });

  it("wraps all values in double quotes", () => {
    const csv = createOrderCsv([baseOrder]);
    const dataRow = csv.split("\n")[1];
    const values = dataRow.split(",");
    for (const v of values) {
      expect(v).toMatch(/^".*"$/);
    }
  });
});
