import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

export class Dynamo {
  client: DynamoDBClient;
  documentClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({ region: "us-east-1" });
    this.documentClient = DynamoDBDocumentClient.from(this.client);
  }

  async getCurrentOrders(company_name: string) {
    const command = new ScanCommand({
      TableName: "orders",
      FilterExpression: 'company_name = :company_name',
      ExpressionAttributeValues: {
        ":company_name": company_name,
      }
    });

    const response = await this.documentClient.send(command);
    return response.Items ?? [];
  }

  async getArchivedOrders(company_name: string) {
    const command = new ScanCommand({
      TableName: "archived_orders",
      FilterExpression: 'company_name = :company_name',
      ExpressionAttributeValues: {
        ":company_name": company_name,
      }
    });

    const response = await this.documentClient.send(command);
    return response.Items ?? [];
  }
}
