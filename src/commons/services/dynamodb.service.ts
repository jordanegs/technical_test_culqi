import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DynamoDBService {
  private readonly dynamoDBClient: DynamoDBClient;

  constructor() {
    this.dynamoDBClient = process.env.IS_OFFLINE
      ? new DynamoDBClient({
          region: 'localhost',
          endpoint: process.env.DYNAMODB_ENDPOINT,
        })
      : new DynamoDBClient({});
  }

  async putItem(
    tableName: string,
    item: Record<string, any>,
  ): Promise<Record<string, any>> {
    const data = {
      ...item,
      id: uuid(),
    };
    const command = new PutItemCommand({
      TableName: tableName,
      Item: marshall(data),
    });
    await this.dynamoDBClient.send(command);
    return data;
  }

  async getItem(tableName: string, key: string): Promise<Record<string, any>> {
    const command = new GetItemCommand({
      TableName: tableName,
      Key: {
        id: {
          S: key,
        },
      },
    });
    const response = await this.dynamoDBClient.send(command);
    if (!response.Item) return null;
    return unmarshall(response.Item);
  }
}
