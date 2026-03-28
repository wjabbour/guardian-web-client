## Architecture

There are two AWS accounts — **Guardian** and **Cannon**. The Cannon web client is configured to interact with resources in the Cannon account; all other websites use the Guardian account. The same codebase is deployed to both accounts.

Terraform state (S3 + DynamoDB lock) for both accounts lives in the Guardian account. The Cannon account has an IAM role that the Guardian IAM user assumes to deploy resources there.

## Deployment

The pipeline deploys automatically on push to `main` when backend or common files change. To trigger manually, use the `workflow_dispatch` inputs in GitHub Actions.

To deploy locally:

```bash
# both accounts
npm run deploy

# individual accounts
npm run deploy-standard
npm run deploy-cannon
```

`deploy-standard` runs the full pre-deploy (build + terraform init) before applying. `deploy-cannon` skips the build since it assumes standard has already run.

To deploy only specific Terraform resources (e.g. a new GSI without touching Lambdas):

```bash
cd terraform
terraform workspace select standard
terraform apply -target=aws_dynamodb_table.orders_table -var-file=tfvars/standard.tfvars

terraform workspace select cannon
terraform apply -target=aws_dynamodb_table.orders_table -var-file=tfvars/cannon.tfvars
```

## Scripts

Scripts are run with `ts-node` from the `backend/` directory. All scripts support a `--profile` flag to target the Cannon AWS account.

```bash
npx ts-node scripts/<script>.ts
npx ts-node scripts/<script>.ts --profile=cannon
```

To set up the Cannon profile, add the following to `~/.aws/config`:

```ini
[profile cannon]
role_arn = arn:aws:iam::732682028282:role/guardian_web_client_deployments
source_profile = default
```

### migrate_order_ids.ts

Renames `order_id` (PayPal order ID) to `paypal_order_id` and populates a new UUID `order_id` on every item in the `orders` and `archived_orders` tables. Safe to re-run — already migrated items are skipped.

```bash
npx ts-node scripts/migrate_order_ids.ts            # dry run
npx ts-node scripts/migrate_order_ids.ts --execute  # apply
```

### revenue_report.ts

Calculates total revenue across all paid orders. Excludes test orders, backfills missing prices from items with the same code, and prints the top 10 orders by value.

```bash
npx ts-node scripts/revenue_report.ts
```
