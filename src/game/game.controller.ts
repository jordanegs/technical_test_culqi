import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { RedisService } from '../commons/services/redis.service';
import { CreateInputDto } from './dto/create-input.dto';
import { EventBridgeService } from '../commons/services/event-bridge.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly _redisService: RedisService,
    private readonly _eventBridgeService: EventBridgeService,
  ) {}

  @Get('input/:id')
  async getItem(@Param('id') id: string) {
    const data = await this._redisService.getValue(id);
    if (data) {
      await this._eventBridgeService.sendEvent(data);
      return {
        ok: true,
        message: 'Input enviado a Event Bridge.',
      };
    }
    return data;
  }

  @Post('input')
  async createItem(@Body() item: CreateInputDto) {
    const key = uuid();
    const data = { type: 'input', ...item };
    await this._redisService.setValue(key, JSON.stringify(data));
    return { key, data };
  }
}
