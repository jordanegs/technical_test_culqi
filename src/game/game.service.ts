import { Injectable } from '@nestjs/common';

import { DynamoDBService } from '../commons/services/dynamodb.service';
import { Game } from './models/game.model';

@Injectable()
export class GameService {
  constructor(private readonly _dynamoDBService: DynamoDBService) {}

  play(caseNumber: number, numPlayers: number, diceFaces: string) {
    const game = new Game(caseNumber, numPlayers, diceFaces);
    game.start();
  }
}
