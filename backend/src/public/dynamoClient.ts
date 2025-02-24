import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { logger } from "./utils";

interface Order {
  email: string;
  order: any;
  first_name: string;
  last_name: string;
  store: string;
  company_name: string;
  customer_po: string;
  order_id: string;
  bypass: number;
  paid: number;
}

class Dynamo {
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

  // return created_at so that we can re-fetch for tameron orders
  async createOrder(order: Order, table_name: string) {
    const created_at = Date.now() + "";

    order["paid_at"] = "-1";
    order["created_at"] = created_at;
    logger.info(order);

    await this.documentClient.send(
      new PutCommand({
        Item: order,
        TableName: table_name,
      })
    );

    return created_at;
  }
}

export const dynamoClient = new Dynamo();
