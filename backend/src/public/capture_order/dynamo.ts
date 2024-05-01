import { DynamoDBClient, QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

export class Dynamo {

  client: DynamoDBClient

  constructor() {
    this.client = new DynamoDBClient({ region: "us-east-1" });
  }

  async setPaid(order_id: string, txId: string) {
    const command = new QueryCommand({
      "Select": "ALL_ATTRIBUTES",
      "ExpressionAttributeValues": {
        ":order_id": {
          "S": order_id
        }
      },
      "KeyConditionExpression": "order_id = :order_id",
      "TableName": "orders",
      "IndexName": "order-id-index"
    })

    const response = await this.client.send(command);

    if (response.Items.length > 0) {
      const item = response.Items[0];
      const update_command = new UpdateItemCommand({
        Key: {
          email: item.email,
          created_at: item.created_at
        },
        "UpdateExpression": 'set paid = :paid, paid_at = :paid_at, transaction_id = :transaction_id',
        "ExpressionAttributeValues": {
          ":paid": {
            "N": "1"
          },
          ":paid_at": {
            "N": `${Date.now()}`
          },
          ":transaction_id": {
            "S": txId
          }
        },
        TableName: 'orders'
      })

      await this.client.send(update_command)
    }
  }
}
