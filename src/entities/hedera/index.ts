import { ConsoleLogger, Module } from '@nestjs/common';
import { HederaCron } from './hedera.cron';
import { HederaResolver } from './hedera.resolver';
import { BullModule } from '@nestjs/bull';
import { CONFIG } from '@config/index';
import { QueueEnum } from '@enums/common';
import { HederaQueue } from './hedera.queue';

const providersQueue = [];
if (CONFIG.platform.isCron) {
  providersQueue.push(HederaQueue);
}

@Module({
  imports: [
    BullModule.forRoot({
      redis: CONFIG.redis.options,
    }),
    BullModule.registerQueue({
      name: QueueEnum.queueHedera,
    }),
  ],
  providers: [HederaCron, ConsoleLogger, HederaResolver, ...providersQueue],
})
export default class HederaCronModule {}
