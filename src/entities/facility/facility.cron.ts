import { CONFIG } from '@config/index';
import { FacilityModel } from '@entities/facility/facility.model';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { v4 as uuidv4 } from 'uuid';
import { DataSource, In, Not } from 'typeorm';
import { JobEnum, QueueEnum, RedisCacheKeysEnum } from '@enums/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { RedisCacheService } from 'libs/redis/src';
import { FacilityRoleEnum } from './facility.enum';
import { CustomLoggerService } from '@common/logger/custom_logger.service';

@Injectable()
export class FacilityCron {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly dataSource: DataSource,
    private readonly redisCacheService: RedisCacheService,
    @InjectQueue(QueueEnum.queueFacility) private readonly queueFacility: Queue,
    @InjectQueue(QueueEnum.queueUser) private readonly queueUser: Queue,
  ) {}

  @Cron('0 15 2 * * *', {
    name: 'syncFacility',
    disabled: !CONFIG.platform.isCron,
  })
  private async syncFacility() {
    const date = Date.now();
    const uuid = uuidv4();
    // this.logger.debug(`CRON start: syncFacility ${uuid}`);
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

      const promises = [];
      facilities.map((facility) => {
        promises.push(
          this.queueUser.add(
            JobEnum.syncEmployeesJob,
            {
              facility,
            },
            { attempts: 2, removeOnComplete: true },
          ),
          this.queueFacility.add(
            JobEnum.syncFacilityJob,
            {
              facility,
            },
            { attempts: 2, removeOnComplete: true },
          ),
        );
      });
      await Promise.allSettled(promises);
    } catch (error) {
      this.logger.error(`CRON: syncFacility - ${error.message}`);
    } finally {
      if (Date.now() - date >= 5000) {
        this.logger.debug(
          `CRON end: syncFacility ${uuid} ${(Date.now() - date) / 1000} sec`,
        );
      }
    }
  }

  @Cron('0 */1 * * * *', {
    name: 'facilityOnline',
    disabled: !CONFIG.platform.isCron,
  })
  async facilityOnline() {
    const date = Date.now();
    const uuid = uuidv4();
    try {
      const keys = await this.redisCacheService.keys(
        `${RedisCacheKeysEnum.facilityOnline}:*`,
      );

      let ids: string[] = [];

      if (keys.length) {
        ids = keys.map((key) =>
          key.replace(`${RedisCacheKeysEnum.facilityOnline}:`, ''),
        );
      }

      await Promise.allSettled([
        this.dataSource.getRepository(FacilityModel).update(
          {
            id: Not(In(ids)),
          },
          { isOnline: false },
        ),
        ids.length
          ? this.dataSource
              .getRepository(FacilityModel)
              .update(ids, { isOnline: true })
          : null,
      ]);
    } catch (error) {
      this.logger.error(`CRON: facilityOnline - ${error.message}`);
    } finally {
      if (Date.now() - date >= 5000) {
        this.logger.debug(
          `CRON end: facilityOnline ${uuid} ${(Date.now() - date) / 1000} sec`,
        );
      }
    }
  }
}
