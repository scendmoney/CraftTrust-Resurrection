import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import { RequestModel } from './request.model';
import { RequestResolver } from './request.resolver';
import { RequestQueue } from './request.queue';
import { BullModule } from '@nestjs/bull';
import { QueueEnum } from '@enums/common';
import { CONFIG } from '@config/index';

const providersQueue = [];
if (CONFIG.platform.isCron) {
  providersQueue.push(RequestQueue);
}

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestModel]),
    BullModule.registerQueue({
      name: QueueEnum.request,
    }),
    BullModule.registerQueue({
      name: QueueEnum.request,
      limiter: { max: 10, duration: 60000 },
    }),
  ],
  providers: [RequestResolver, ConsoleLogger, ...providersQueue],
})
export class RequestModule {}
