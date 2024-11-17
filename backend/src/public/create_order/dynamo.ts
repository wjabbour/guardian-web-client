import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { logger } from "../utils";

export class Dynamo {
  client: DynamoDBClient;
  documentClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({ region: "us-east-1" });
    this.documentClient = DynamoDBDocumentClient.from(this.client, {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });
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
    logger.info({
      email,
      cart,
      first_name,
      last_name,
      store,
      company_name,
      order_id,
      table_name,
      bypass,
    });

    const created_at = Date.now() + "";

    await this.documentClient.send(
      new PutCommand({
        Item: {
          email,
          first_name,
          last_name,
          store,
          company_name,
          bypass,
          created_at,
          paid_at: "-1",
          order: cart,
          order_id,
          paid: bypass,
        },
        TableName: table_name,
      })
    );

    return { email, created_at };
  }
}
