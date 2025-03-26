import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  QueryCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
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
    const command = new GetCommand({
      Key: {
        email,
        created_at,
      },
      TableName: "archived_orders",
    });

    const response = await this.documentClient.send(command);
    if (response.Item) {
      return response.Item;
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

  async setPaid(order_id: string, txId: string) {
    const command = new QueryCommand({
      Select: "ALL_ATTRIBUTES",
      ExpressionAttributeValues: {
        ":order_id": order_id,
      },
      KeyConditionExpression: "order_id = :order_id",
      TableName: "orders",
      IndexName: "order-id-index",
    });

    const response = await this.documentClient.send(command);

    if (response.Items.length > 0) {
      const item = response.Items[0];
      const update_command = new UpdateCommand({
        Key: {
          email: item.email,
          created_at: item.created_at,
        },
        UpdateExpression:
          "set paid = :paid, paid_at = :paid_at, transaction_id = :transaction_id",
        ExpressionAttributeValues: {
          ":paid": 1,
          ":paid_at": Date.now(),
          ":transaction_id": txId,
        },
        TableName: "orders",
      });

      await this.documentClient.send(update_command);
      return { email: item.email, created_at: item.created_at };
    }
  }

  async archiveCannonOrder(created_at: string, email: string) {
    const command = new GetCommand({
      Key: {
        created_at,
        email,
      },
      TableName: "orders",
    });

    const response = await this.documentClient.send(command);
    logger.info("Retrieved order");
    const item = response.Item;

    const putItem = new PutCommand({
      Item: item,
      TableName: "archived_orders",
    });

    await this.documentClient.send(putItem);
    logger.info("Archived order");

    const deleteItem = new DeleteCommand({
      Key: {
        created_at,
        email,
      },
      TableName: "orders",
    });

    await this.documentClient.send(deleteItem);
    logger.info("Deleted order");
  }
}

export const dynamoClient = new Dynamo();
