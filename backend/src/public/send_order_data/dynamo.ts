import { DynamoDBClient, QueryCommand, UpdateItemCommand, PutItemCommand, DeleteItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export class Dynamo {

  client: DynamoDBClient

  constructor() {
    this.client = new DynamoDBClient({ region: "us-east-1" });
  }

  async deleteOldUnpaidOrders() {
    const command = new QueryCommand({
      "Select": "ALL_ATTRIBUTES",
      "ExpressionAttributeValues": {
        ":paid": {
          "N": "0"
        }
      },
      "KeyConditionExpression": "paid = :paid",
      "TableName": "orders",
      "IndexName": "paid-index"
    })

    const response = await this.client.send(command);
    const items = response.Items
    
    // delete the unpaid order
    for (let i = 0; i < items.length; i++) {
      const item = unmarshall(items[i]);

      if (Date.now() - 1200000 < item.created_at) {
        console.log('This unpaid order is less than 20 minutes old, don\'t delete it yet')
        continue;
      }

      const deleteItem = new DeleteItemCommand({
        Key: {
          email: {
            "S": item.email,
          },
          created_at: {
            "S": item.created_at
          }
        },
        TableName: 'orders'
      })

      await this.client.send(deleteItem);
    }
  }

  async getPaidOrders() {
    const command = new QueryCommand({
      "Select": "ALL_ATTRIBUTES",
      "ExpressionAttributeValues": {
        ":paid": {
          "N": "1"
        }
      },
      "KeyConditionExpression": "paid = :paid",
      "TableName": "orders",
      "IndexName": "paid-index"
    })

    const response = await this.client.send(command);

    if (response.Items) {
      return response.Items.map((i) => unmarshall(i))
    } else {
      return []
    }
  }

  async getBypassedOrders() {
    const command = new QueryCommand({
      "Select": "ALL_ATTRIBUTES",
      "ExpressionAttributeValues": {
        ":bypass": {
          "N": "1"
        }
      },
      "KeyConditionExpression": "bypass = :bypass",
      "TableName": "orders",
      "IndexName": "bypass-index"
    })

    const response = await this.client.send(command);

    if (response.Items) {
      return response.Items.map((i) => unmarshall(i))
    } else {
      return []
    }
  }

  async archivePaidOrders() {
    const command = new QueryCommand({
      "Select": "ALL_ATTRIBUTES",
      "ExpressionAttributeValues": {
        ":paid": {
          "N": "1"
        }
      },
      "KeyConditionExpression": "paid = :paid",
      "TableName": "orders",
      "IndexName": "paid-index"
    })

    const response = await this.client.send(command);
    const items = response.Items ? (response.Items) : []

    // move all processed orders to archived_orders table
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const putItem = new PutItemCommand({
        Item: item,
        TableName: 'archived_orders'
      })

      await this.client.send(putItem);
    }

    // delete the now archived orders from the orders table
    for (let i = 0; i < items.length; i++) {
      const item = unmarshall(items[i]);

      const deleteItem = new DeleteItemCommand({
        Key: {
          email: {
            "S": item.email,
          },
          created_at: {
            "S": item.created_at
          }
        },
        TableName: 'orders'
      })

      await this.client.send(deleteItem);
    }
  }
}