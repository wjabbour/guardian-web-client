import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export class Dynamo {
  client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({ region: "us-east-1" });
  }

  async getOrder(email: string, created_at: string) {
    const command = new GetItemCommand({
      Key: {
        email: {
          S: email,
        },
        created_at: {
          S: created_at,
        },
      },
      TableName: "archived_orders",
    });

    const response = await this.client.send(command);
    if (response.Item) {
      return unmarshall(response.Item);
    } else {
      return null;
    }
  }

  // return composite key so that we can re-fetch for tameron orders
  async createOrder(
    email: string,
    cart,
    first_name: string,
    last_name: string,
    store: string,
    company_name: string,
    order_id: string,
    table_name: string,
    bypass: number
  ) {
    const massaged_cart = cart.map((m) => {
      return { M: marshall(m) };
    });

    const created_at = Date.now() + "";

    const command = new PutItemCommand({
      Item: {
        email: {
          S: email,
        },
        first_name: {
          S: first_name,
        },
        last_name: {
          S: last_name,
        },
        store: {
          S: store,
        },
        company_name: {
          S: company_name,
        },
        bypass: {
          N: `${bypass}`,
        },
        created_at: {
          S: created_at,
        },
        paid_at: {
          N: "-1",
        },
        order: { L: massaged_cart },
        order_id: {
          S: order_id,
        },
        paid: {
          N: "0",
        },
      },
      TableName: table_name,
    });

    await this.client.send(command);
    return { email, created_at };
  }
}
