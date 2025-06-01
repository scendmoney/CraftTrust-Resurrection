import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import NFTModel from './nft.model';
import { NFTClientResolver } from './nft.client.resolver';
import { BullModule } from '@nestjs/bull';
import { QueueEnum } from '@enums/common';
import { CONFIG } from '@config/index';
import { NftCron } from './nft.cron';
const providersQueue = [];
if (CONFIG.platform.isCron) {
  providersQueue.push(NftCron);
}

@Module({
  imports: [
    TypeOrmModule.forFeature([NFTModel]),
    BullModule.registerQueue({
      name: QueueEnum.queueHedera,
    }),
  ],
  providers: [NFTClientResolver, ...providersQueue],
})
export default class NFTModule {}
