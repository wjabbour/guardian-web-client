import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export class Dynamo {

  client: DynamoDBClient

  constructor() {
    this.client = new DynamoDBClient({ region: "us-east-1" });
  }

  async getCurrentOrders(company_name: string) {
    const command = new ScanCommand({
      "TableName": "orders",
      FilterExpression: 'company_name = :company_name',
      ExpressionAttributeValues: {
        ":company_name": { 'S': company_name }
      }
    })

    const response = await this.client.send(command);

    if (response.Items) {
      return response.Items.map((i) => unmarshall(i))
    } else {
      return []
    }
  }

  async getArchivedOrders(company_name: string) {
    const command = new ScanCommand({
      "TableName": "archived_orders",
      FilterExpression: 'company_name = :company_name',
      ExpressionAttributeValues: {
        ":company_name": { 'S': company_name }
      }
    })

    const response = await this.client.send(command);

    if (response.Items) {
      return response.Items.map((i) => unmarshall(i))
    } else {
      return []
    }
  }
}