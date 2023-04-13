import { Injectable } from '@nestjs/common';
import { EventBridge, PutEventsCommand } from '@aws-sdk/client-eventbridge';

@Injectable()
export class EventBridgeService {
  private readonly eventBridge: EventBridge;

  constructor() {
    this.eventBridge = new EventBridge({});
  }

  async sendEvent(data: any): Promise<void> {
    const params = {
      Entries: [
        {
          Source: process.env.EVENT_BRIDGE_SOURCE,
          DetailType: process.env.EVENT_BRIDGE_DETAIL_TYPE,
          Detail: JSON.stringify(data),
          Time: new Date('TIMESTAMP'),
        },
      ],
    };
    await this.eventBridge.send(new PutEventsCommand(params));
  }
}
