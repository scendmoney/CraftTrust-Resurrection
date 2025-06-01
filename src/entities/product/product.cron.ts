import { FacilityRoleEnum } from '@entities/facility/facility.enum';
import { FacilityModel } from '@entities/facility/facility.model';
import { JobEnum, QueueEnum } from '@enums/common';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bull';
import { v4 as uuidv4 } from 'uuid';

import { DataSource, In, Not } from 'typeorm';
import { CONFIG } from '@config/index';
import { CustomLoggerService } from '@common/logger/custom_logger.service';

@Injectable()
export class ProductCron {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly dataSource: DataSource,
    @InjectQueue(QueueEnum.queueProduct) private readonly queueProduct: Queue,
  ) {}

  @Cron('0 */5 * * * *', {
    name: 'syncProductsCron',
    disabled: !CONFIG.platform.isCron,
  })
  private async syncProductsCron() {
    const date = Date.now();
    const uuid = uuidv4();
    // this.logger.debug(`CRON start: syncProductsCron ${uuid}`);
    try {
      const facilities = await this.dataSource
        .getRepository(FacilityModel)
        .find({
          where: {
            role: In([
              FacilityRoleEnum.cultivator,
              FacilityRoleEnum.buyerAndCultivator,
            ]),
            metrcApiKey: Not(''),
            isActivatedSyncJob: true,
          },
        });
      for (const facility of facilities) {
        this.queueProduct.add(
          JobEnum.syncProductsJob,
          {
            facility,
          },
          { attempts: 2, removeOnComplete: true, removeOnFail: true },
        );
      }
    } catch (error) {
      console.log(error);
      this.logger.error(`CRON: syncProductsCron - ${error.message}`);
    } finally {
      if (Date.now() - date >= 5000) {
        this.logger.debug(
          `CRON end: syncProductsCron ${uuid} ${
            (Date.now() - date) / 1000
          } sec`,
        );
      }
    }
  }
}
