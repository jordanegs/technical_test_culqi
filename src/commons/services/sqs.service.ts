import { Injectable } from '@nestjs/common';
import {
  ReceiveMessageCommand,
  SendMessageCommand,
  SendMessageCommandInput,
  SendMessageCommandOutput,
  SQSClient,
} from '@aws-sdk/client-sqs';

@Injectable()
export class SqsService {
  private readonly sqlClient;

  constructor() {
    this.sqlClient = new SQSClient({});
  }

  async sendMessage(messageBody: string): Promise<SendMessageCommandOutput> {
    const params: SendMessageCommandInput = {
      QueueUrl: process.env.SQS_ENDPOINT,
      MessageBody: messageBody,
    };
    return this.sqlClient.send(new SendMessageCommand(params));
  }

  async receiveMessages(): Promise<any> {
    const command = new ReceiveMessageCommand({
      QueueUrl: process.env.SQS_ENDPOINT,
      MaxNumberOfMessages: 10,
    });

    try {
      const result = await this.sqlClient.send(command);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}
