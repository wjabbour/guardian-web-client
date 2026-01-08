import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

export class Dynamo {
  client: DynamoDBClient;
  docClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({ region: "us-east-1" });
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  async getOrder(email: string, created_at: number, tableName: string) {
    const command = new GetCommand({
      TableName: tableName,
      Key: {
        email: email,
        created_at: created_at,
      },
    });

    const response = await this.docClient.send(command);
    return response.Item;
  }
}
