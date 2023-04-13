import { SQSHandler } from 'aws-lambda';

import { DynamoDBService } from './commons/services/dynamodb.service';

export const handler: SQSHandler = async (event) => {
  const bodyQueue = JSON.parse(event.Records[0].body);
  const detail = bodyQueue.detail;

  const dynamoDBService = new DynamoDBService();

  console.log('Inputs capturados de SQS: ', detail);
  const result = await dynamoDBService.putItem('ResultsGameTable', detail);
  console.log('Inputs enviados a DynamoDB: ', result);
};
