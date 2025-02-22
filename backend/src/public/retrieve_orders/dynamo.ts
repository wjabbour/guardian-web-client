import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export class Dynamo {
  client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({ region: "us-east-1" });
  }

  async getCurrentOrders(company_name: string) {
    const command = new ScanCommand({
      TableName: "orders",
      FilterExpression: 'company_name = :company_name',
      ExpressionAttributeValues: {
        ":company_name": { 'S': company_name }
      }
    });

    const response = await this.client.send(command);

    if (response.Items) {
      return response.Items.map((i) => unmarshall(i));
    } else {
      return [];
    }
  }

  async getArchivedOrders(company_name: string) {
    const command = new ScanCommand({
      TableName: "archived_orders",
      FilterExpression: 'company_name = :company_name',
      ExpressionAttributeValues: {
        ":company_name": { 'S': company_name }
      }
    });

    const response = await this.client.send(command);

    if (response.Items) {
      return response.Items.map((i) => unmarshall(i));
    } else {
      return [];
    }
  }

  // async writeCompanyName() {
  //   const orders = await this.getArchivedOrders("");
  //   const newOrders = orders.map((o) => {
  //     o["company_name"] = "Cannon";
  //     return o;
  //   });

  //   const commands = newOrders.map((o) => {
  //     return new PutCommand({
  //       TableName: "archived_orders",
  //       Item: o,
  //     });
  //   });

  //   for (const command of commands) {
  //     await this.client.send(command);
  //     await new Promise((res) => {
  //       setTimeout(() => {
  //         res(1);
  //       }, 1000);
  //     });
  //   }
  // }
}

