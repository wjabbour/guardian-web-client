/**
 * Throwaway script: calculate total revenue across all orders.
 *
 * Usage:
 *   npx ts-node scripts/revenue_report.ts
 *   npx ts-node scripts/revenue_report.ts --profile=cannon
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { CartItem } from "guardian-common";

const args = process.argv.slice(2);
const profileArg = args.find((a) => a.startsWith("--profile="));
const profile = profileArg ? profileArg.split("=")[1] : undefined;
if (profile) process.env.AWS_PROFILE = profile;

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

async function scanAll(tableName: string): Promise<any[]> {
  const items: any[] = [];
  let lastEvaluatedKey: Record<string, unknown> | undefined;

  do {
    const result = await docClient.send(
      new ScanCommand({ TableName: tableName, ExclusiveStartKey: lastEvaluatedKey })
    );
    items.push(...(result.Items ?? []));
    lastEvaluatedKey = result.LastEvaluatedKey as Record<string, unknown> | undefined;
  } while (lastEvaluatedKey);

  return items;
}


async function main() {
  const profileLabel = profile ?? "default";
  console.log(`Profile: ${profileLabel}\n`);

  const [orders, archived] = await Promise.all([
    scanAll("orders"),
    scanAll("archived_orders"),
  ]);

  const TEST_PATTERN = /test|fake|dummy|sample|demo/i;

  const isTestOrder = (o: any) =>
    TEST_PATTERN.test(o.first_name ?? "") ||
    TEST_PATTERN.test(o.last_name ?? "") ||
    TEST_PATTERN.test(o.email ?? "");

  const allOrders = [...orders, ...archived];
  const paid = allOrders.filter((o) => o.paid === 1);
  const realOrders = paid.filter((o) => !isTestOrder(o));
  const testOrders = paid.filter(isTestOrder);

  // Build price lookup from items that have prices, keyed by "code:size" then "code"
  const priceByCodeSize = new Map<string, number>();
  const priceByCode = new Map<string, number>();
  for (const order of paid) {
    for (const item of (order.order ?? []) as CartItem[]) {
      const price = Number(item.price);
      if (!isNaN(price) && price > 0) {
        priceByCodeSize.set(`${item.code}:${item.size}`, price);
        priceByCode.set(item.code, price);
      }
    }
  }

  function calcRevenue(orderList: any[]) {
    let total = 0;
    let itemCount = 0;
    let skippedItems = 0;
    let backfilledItems = 0;
    for (const order of orderList) {
      const lineItems: CartItem[] = order.order ?? [];
      for (const item of lineItems) {
        let price = Number(item.price);
        const qty = Number(item.quantity);
        if (isNaN(qty)) { skippedItems++; continue; }

        if (isNaN(price)) {
          const backfilled = priceByCodeSize.get(`${item.code}:${item.size}`) ?? priceByCode.get(item.code);
          if (backfilled !== undefined) {
            price = backfilled;
            backfilledItems++;
          } else {
            skippedItems++;
            continue;
          }
        }

        total += price * qty;
        itemCount += qty;
      }
    }
    return { total, itemCount, skippedItems, backfilledItems };
  }

  const real = calcRevenue(realOrders);
  const test = calcRevenue(testOrders);

  const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  console.log(`Paid orders:        ${paid.length} (${realOrders.length} real, ${testOrders.length} test)`);
  console.log(`Total items:        ${real.itemCount.toLocaleString()}`);
  console.log(`Backfilled items:   ${real.backfilledItems} (price inferred from same item code)`);
  console.log(`Skipped items:      ${real.skippedItems} (no price found anywhere)`);
  console.log(`Total revenue:      ${fmt(real.total)}`);
  console.log(`Test order revenue: ${fmt(test.total)}`);

  const top10 = realOrders
    .map((o) => ({ order: o, ...calcRevenue([o]) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  console.log("\nTop 10 orders:");
  top10.forEach((entry, i) => {
    const o = entry.order;
    const date = new Date(parseInt(o.created_at)).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    console.log(`  ${i + 1}. ${fmt(entry.total).padEnd(12)} ${o.first_name} ${o.last_name} — ${o.store ?? o.company_name} (${date})`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
