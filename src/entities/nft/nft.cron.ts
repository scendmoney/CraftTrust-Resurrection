import { CONFIG } from '@config/index';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { v4 as uuidv4 } from 'uuid';
import { DataSource } from 'typeorm';
import NFTModel from '@entities/nft/nft.model';
import { NFTStatusEnum } from '@entities/nft/nft.enum';
import { JobEnum, QueueEnum } from '@enums/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CustomLoggerService } from '@common/logger/custom_logger.service';

@Injectable()
export class NftCron {
  constructor(
    private readonly logger: CustomLoggerService,
    @InjectQueue(QueueEnum.queueHedera) private readonly queueHedera: Queue,
    private readonly dataSource: DataSource,
  ) {}
  @Cron('0 */10 * * * *', {
    name: 'NFTCron',
    disabled: !CONFIG.platform.isCron,
  })
  private async NFTCron() {
    const date = Date.now();
    const uuid = uuidv4();

    const nfts = await this.dataSource.getRepository(NFTModel).find({
      where: {
        status: NFTStatusEnum.processing,
      },
      select: ['id'],
    });

    nfts.forEach(({ id }) =>
      this.queueHedera.add(
        JobEnum.mintNFTJob,
        {
          nftId: id,
        },
        {
          attempts: 2,
          removeOnComplete: true,
          removeOnFail: true,
        },
      ),
    );

    if (Date.now() - date >= 5000) {
      this.logger.debug(
        `CRON end: NFTCron ${uuid} ${(Date.now() - date) / 1000} sec`,
      );
    }
  }
}
