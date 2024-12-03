import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

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

  async updateOrderData(email: string, created_at: string, cart: any) {
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
  }
}
