import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly _redis: Redis) {}

  async setValue(key: string, value: string) {
    return this._redis.set(key, value, 'EX', 3600);
  }

  async getValue(key: string) {
    const data = await this._redis.get(key);
    return JSON.parse(data);
  }
}
