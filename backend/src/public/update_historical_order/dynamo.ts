import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

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

  /*
    The historical order table contains both archived and unarchived orders. Since these live in two separate
    tables and we have no way of differentiating an order from an archived order, we must check the DB table
    for the item, and update it when we find it.

    TODO: I believe we can consolidate these tables and introduce a new column. This should make a few things simpler.
  */
  async updateOrderData(email: string, created_at: string, cart: any) {
    const get_order_command = new GetCommand({
      Key: { email, created_at },
      TableName: "orders",
    });

    const response = await this.documentClient.send(get_order_command);

    if (!response.Item) {
      const update_command = new UpdateCommand({
        Key: {
          email,
          created_at,
        },
        UpdateExpression: "set #order = :cart",
        ExpressionAttributeValues: {
          ":cart": cart,
        },
        ExpressionAttributeNames: {
          "#order": "order",
        },
        TableName: "archived_orders",
      });
      await this.documentClient.send(update_command);
    } else {
      const update_command = new UpdateCommand({
        Key: {
          email,
          created_at,
        },
        UpdateExpression: "set #order = :cart",
        ExpressionAttributeValues: {
          ":cart": cart,
        },
        ExpressionAttributeNames: {
          "#order": "order",
        },
        TableName: "orders",
      });
      await this.documentClient.send(update_command);
    }
  }
}
