/**
 * Migration: rename order_id -> paypal_order_id, add order_id as UUID
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

const args = process.argv.slice(2);
const DRY_RUN = !args.includes("--execute");
const TABLES = ["orders", "archived_orders"];
const REGION = "us-east-1";

// Delay between writes — keep well under provisioned WCU limit (1 WCU = 1 write/sec for <=1KB items)
const WRITE_DELAY_MS = 1200;
const MAX_RETRIES = 6;

const profileArg = args.find((a) => a.startsWith("--profile="));
const profile = profileArg ? profileArg.split("=")[1] : undefined;
if (profile) process.env.AWS_PROFILE = profile;

const client = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(client);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function withRetry<T>(fn: () => Promise<T>, label: string): Promise<T> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      const isThrottled =
        err?.name === "ProvisionedThroughputExceededException" ||
        err?.name === "RequestLimitExceeded" ||
        err?.code === "ProvisionedThroughputExceededException";

      if (isThrottled && attempt < MAX_RETRIES) {
        const backoff = Math.min(1000 * 2 ** attempt, 30000);
        const jitter = Math.random() * 500;
        console.log(
          `  THROTTLED ${label} — retry ${attempt + 1}/${MAX_RETRIES} in ${Math.round(backoff + jitter)}ms`
        );
        await sleep(backoff + jitter);
      } else {
        throw err;
      }
    }
  }
  throw new Error("unreachable");
}

const PROGRESS_INTERVAL_MS = 15_000;

function startProgressReporter(
  tableName: string,
  state: { scanned: number; migrated: number; skipped: number; startedAt: number }
): NodeJS.Timeout {
  return setInterval(() => {
    const elapsed = Math.round((Date.now() - state.startedAt) / 1000);
    const rate = elapsed > 0 ? (state.migrated / elapsed).toFixed(2) : "0.00";
    console.log(
      `  [${tableName}] ${elapsed}s elapsed — scanned: ${state.scanned} | migrated: ${state.migrated} | skipped: ${state.skipped} | rate: ${rate}/s`
    );
  }, PROGRESS_INTERVAL_MS);
}

async function migrateTable(tableName: string) {
  console.log(`\n--- ${tableName} ---`);

  const state = { scanned: 0, migrated: 0, skipped: 0, startedAt: Date.now() };
  const progressTimer = startProgressReporter(tableName, state);

  let lastEvaluatedKey: Record<string, unknown> | undefined = undefined;

  do {
    const scanResult = await withRetry(
      () => docClient.send(new ScanCommand({ TableName: tableName, ExclusiveStartKey: lastEvaluatedKey })),
      "scan"
    );

    const items = scanResult.Items ?? [];
    state.scanned += items.length;

    for (const item of items) {
      const email = item.email as string;
      const created_at = item.created_at as string;

      if (item.paypal_order_id !== undefined) {
        console.log(`  SKIP     [${email}] ${created_at} — already migrated`);
        state.skipped++;
        continue;
      }

      const existingOrderId = item.order_id as string | undefined;
      const newOrderId = randomUUID();

      console.log(
        `  ${DRY_RUN ? "DRY-RUN" : "MIGRATE"} [${email}] ${created_at}` +
        `\n           order_id:        ${existingOrderId ?? "(missing)"} -> ${newOrderId}` +
        `\n           paypal_order_id: (none) -> ${existingOrderId ?? "(missing)"}`
      );

      if (!DRY_RUN) {
        await withRetry(
          () => docClient.send(new UpdateCommand({
            TableName: tableName,
            Key: { email, created_at },
            UpdateExpression: "SET paypal_order_id = :paypal_order_id, order_id = :new_order_id",
            ExpressionAttributeValues: {
              ":paypal_order_id": existingOrderId ?? "",
              ":new_order_id": newOrderId,
            },
            ConditionExpression: "attribute_not_exists(paypal_order_id)",
          })),
          `update [${email}] ${created_at}`
        );

        await sleep(WRITE_DELAY_MS);
      }

      state.migrated++;
    }

    lastEvaluatedKey = scanResult.LastEvaluatedKey as Record<string, unknown> | undefined;
  } while (lastEvaluatedKey !== undefined);

  clearInterval(progressTimer);
  const elapsed = Math.round((Date.now() - state.startedAt) / 1000);
  console.log(`\n  Done in ${elapsed}s — scanned: ${state.scanned} | migrated: ${state.migrated} | skipped: ${state.skipped}`);
}

async function main() {
  const profileLabel = profile ? `profile: ${profile}` : "profile: default";
  if (DRY_RUN) {
    console.log(`=== DRY RUN (${profileLabel}) — no writes will occur ===`);
    console.log("Run with --execute to apply changes.\n");
  } else {
    console.log(`=== EXECUTING (${profileLabel}) — ~${WRITE_DELAY_MS}ms between writes, up to ${MAX_RETRIES} retries per op ===\n`);
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
