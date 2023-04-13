import { DynamoDBStreamHandler } from 'aws-lambda';

import { DynamoDBService } from './commons/services/dynamodb.service';
import { GameService } from './game/game.service';

enum EventNameEnum {
  INSERT = 'INSERT',
}

export const handler: DynamoDBStreamHandler = async (event) => {
  if (event.Records[0].eventName === EventNameEnum.INSERT) {
    const id = event.Records[0].dynamodb.Keys.id.S;
    const dynamoDBService = new DynamoDBService();

    console.log(`ID de DynamoDB: ${id}`);
    const data = await dynamoDBService.getItem('ResultsGameTable', id);
    if (data) {
      console.log(`Tipo ${EventNameEnum.INSERT}:`, data);
      const gameService = new GameService(dynamoDBService);
      gameService.play(data.caseNumber, data.numPlayers, data.diceFaces);
    }
  }
};
