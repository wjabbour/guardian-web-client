import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

export class Dynamo {

  client: DynamoDBClient

  constructor() {
    this.client = new DynamoDBClient({ region: "us-east-1" });
  }

  async createOrder(email: string, cart, first_name: string, last_name: string, store: string, company_name: string, order_id: string) {
    const massaged_cart = cart.map((m) => {
      return { "M": marshall(m) }
    })

    const command = new PutItemCommand({
      "Item": {
        email: {
          "S": email
        },
        first_name: {
          "S": first_name
        },
        last_name: {
          "S": last_name
        },
        store: {
          "S": store
        },
        company_name: {
          "S": company_name
        },
        bypass: {
          "N": "0"
        },
        created_at: {
          "S": `${Date.now()}`
        },
        paid_at: {
          "N": "-1"
        },
        order: { "L": massaged_cart, },
        order_id: {
          "S": order_id
        },
        paid: {
          "N": '0'
        }
      },
      TableName: "orders"
    })

    await this.client.send(command);
  }

  async createBypassOrder(email: string, cart, first_name: string, last_name: string, store: string, company_name: string) {
    const massaged_cart = cart.map((m) => {
      return { "M": marshall(m) }
    })

    const command = new PutItemCommand({
      "Item": {
        email: {
          "S": email
        },
        first_name: {
          "S": first_name
        },
        last_name: {
          "S": last_name
        },
        store: {
          "S": store
        },
        company_name: {
          "S": company_name
        },
        created_at: {
          "S": `${Date.now()}`
        },
        paid_at: {
          "N": "-1"
        },
        bypass: {
          "N": "1"
        },
        order: { "L": massaged_cart, },
        order_id: {
          "S": "-1"
        },
        paid: {
          "N": '1'
        }
      },
      TableName: "orders"
    })

    await this.client.send(command);
  }
}