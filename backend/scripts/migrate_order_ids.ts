/**
 * Migration: rename order_id -> paypal_order_id, add order_id as UUID
 *
 * Before running:
 *   Ensure AWS credentials are configured (AWS_PROFILE or env vars).
 *
 * After running:
 *   1. Create a new DynamoDB GSI on `paypal_order_id` (so setPaid() can still
 *      look up orders by PayPal order ID).
 *   2. Update backend/src/public/dynamoClient.ts:
 *      - Remove the paypal_order_id -> order_id mapping in createOrder()
 *      - Update setPaid() to query the new GSI on paypal_order_id
 *      - Remove comments about the column name mismatch
 *
 * Usage:
 *   npx ts-node scripts/migrate_order_ids.ts            # dry run (safe, no writes)
 *   npx ts-node scripts/migrate_order_ids.ts --execute  # actually writes to DynamoDB
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const DRY_RUN = !process.argv.includes("--execute");
const TABLES = ["orders", "archived_orders"];
const REGION = "us-east-1";

const client = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(client);

async function migrateTable(tableName: string) {
  console.log(`\n--- ${tableName} ---`);

  let totalScanned = 0;
  let totalMigrated = 0;
  let totalSkipped = 0;
  let lastEvaluatedKey: Record<string, unknown> | undefined = undefined;

  do {
    const scanResult = await docClient.send(
      new ScanCommand({
        TableName: tableName,
        ExclusiveStartKey: lastEvaluatedKey,
      })
    );

    const items = scanResult.Items ?? [];
    totalScanned += items.length;

    for (const item of items) {
      const email = item.email as string;
      const created_at = item.created_at as string;

      // Already migrated — skip
      if (item.paypal_order_id !== undefined) {
        console.log(`  SKIP  [${email}] ${created_at} — already has paypal_order_id`);
        totalSkipped++;
        continue;
      }

      const existingOrderId = item.order_id as string | undefined;
      const newOrderId = randomUUID();

      console.log(
        `  ${DRY_RUN ? "DRY " : ""}MIGRATE  [${email}] ${created_at}` +
        `\n    order_id:        ${existingOrderId ?? "(missing)"} -> ${newOrderId}` +
        `\n    paypal_order_id: (none) -> ${existingOrderId ?? "(missing)"}`
      );

      if (!DRY_RUN) {
        await docClient.send(
          new UpdateCommand({
            TableName: tableName,
            Key: { email, created_at },
            UpdateExpression:
              "SET paypal_order_id = :paypal_order_id, order_id = :new_order_id",
            ExpressionAttributeValues: {
              ":paypal_order_id": existingOrderId ?? "",
              ":new_order_id": newOrderId,
            },
            // Guard against a race condition where another process writes between our scan and update
            ConditionExpression: "attribute_not_exists(paypal_order_id)",
          })
        );
      }

      totalMigrated++;
    }

    lastEvaluatedKey = scanResult.LastEvaluatedKey as
      | Record<string, unknown>
      | undefined;
  } while (lastEvaluatedKey !== undefined);

  console.log(
    `\n  Scanned: ${totalScanned} | Migrated: ${totalMigrated} | Skipped: ${totalSkipped}`
  );
}

async function main() {
  if (DRY_RUN) {
    console.log("=== DRY RUN — no writes will occur ===");
    console.log("Run with --execute to apply changes.\n");
  } else {
    console.log("=== EXECUTING — writing to DynamoDB ===\n");
  }

  for (const table of TABLES) {
    await migrateTable(table);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
