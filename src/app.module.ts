import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { GameModule } from './game/game.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    RedisModule.forRoot({
      config: {
        host: 'redis-17167.c15.us-east-1-4.ec2.cloud.redislabs.com',
        port: 17167,
        username: 'default',
        password: 'ZaICBb1Ppg53NiGxVN7vfMfFgXu35f7V',
      },
    }),
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
