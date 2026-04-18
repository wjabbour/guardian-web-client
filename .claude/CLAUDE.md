# Guardian Web Client — Project Notes

## Order Flow Architecture

### Frontend
- **Orders page**: `client/src/routes/Orders/Orders.tsx`
- **Row component** (expanded order details): `client/src/routes/Orders/Row.tsx`
- **Line item component**: `client/src/routes/Orders/OrderLineItem.tsx`
- **HTTP client**: `client/src/lib/http.ts`

### Backend Lambdas (`backend/src/public/`)
| Lambda | Purpose |
|---|---|
| `create_order` | Creates order in DynamoDB (uses `DynamoDBDocumentClient`) |
| `capture_order` | Captures PayPal payment, marks order as paid |
| `retrieve_orders` | Fetches all orders for a company (uses **low-level** `DynamoDBClient` + `unmarshall`) |
| `update_historical_order` | Edits cart items on an existing order (uses `DynamoDBDocumentClient`) |
| `send_order_data` | Cron — archives orders from `orders` table → `archived_orders` table |
| `delete_order` | Deletes from both `orders` and `archived_orders` tables |
| `resend_order_email` | Re-sends confirmation email for an order |

### DynamoDB Tables
- `orders` — active/unpaid orders
- `archived_orders` — paid/processed orders

Both tables share the same schema. The frontend `retrieve_orders` fetches from **both** and merges them.

### Stored Cart Item Shape
`construct_cart` in `create_order/handler.ts` transforms the frontend `Cart` (dictionary) into an array before storing. Fields saved: `quantity`, `code`, `size`, `color`, `price`, `embroidery?`, `placement?`, `secondEmbroidery?`, `secondPlacement?`, `sapVariation?`, `description`, `customer_po`.
Note: `name` is **not** stored (not copied from the frontend cart).

### Key Quirk: DynamoDB Client Mismatch
- `create_order` and `update_historical_order` write via `DynamoDBDocumentClient` (auto-marshals JS arrays/objects)
- `retrieve_orders` reads via the **low-level** `DynamoDBClient` + manual `unmarshall`
- These should be equivalent for well-formed data, but if any legacy orders have the `order` field stored as a DynamoDB `S` (string) type, `unmarshall` returns a JS string — and calling `.some()` on it would throw, silently dropping that order from search results.

### Orders Page Search
- Filter lives in `Orders.tsx:99-108`
- Searches: customer name, store code, order ID, transaction ID, and **item codes** (`o.order[].code`)
- Only searches `item.code` — does not search item name/description
