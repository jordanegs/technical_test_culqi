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
          Source: 'jordan.culqi.insert.input',
          DetailType: 'Insert Test Data',
          Detail: JSON.stringify(data),
          Time: new Date('TIMESTAMP'),
        },
      ],
    };
    await this.eventBridge.send(new PutEventsCommand(params));
  }
}
