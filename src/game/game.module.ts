import { Module } from '@nestjs/common';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { RedisService } from '../commons/services/redis.service';
import { DynamoDBService } from '../commons/services/dynamodb.service';
import { EventBridgeService } from '../commons/services/event-bridge.service';
import { SqsService } from '../commons/services/sqs.service';

@Module({
  controllers: [GameController],
  providers: [
    GameService,
    RedisService,
    DynamoDBService,
    EventBridgeService,
    SqsService,
  ],
})
export class GameModule {}
