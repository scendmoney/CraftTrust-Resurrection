import { ConsoleLogger, Module } from '@nestjs/common';
import TwilioChatWebhooks from './twilio.chat.webhooks';
import TwilioChatCron from './twilio.chat.cron';

@Module({
  imports: [],
  providers: [TwilioChatCron, ConsoleLogger],
  controllers: [TwilioChatWebhooks],
})
export class TwilioChatModule {}
