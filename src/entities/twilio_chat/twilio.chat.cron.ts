import { CONFIG } from '@config/index';
import { FacilityModel } from '@entities/facility/facility.model';
import FacilityToFacilityModel from '@entities/facility_to_facility/facility_to_facility.model';
import { SubscriptionsEnum } from '@enums/common';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisGraphqlService } from 'libs/redis/src';
import moment from 'moment';
import { DataSource, LessThanOrEqual } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class TwilioChatCron {
  constructor(
    private dataSource: DataSource,
    private logger: ConsoleLogger,
    private readonly redisGraphqlService: RedisGraphqlService,
  ) {}

  @Cron('0 */1 * * * *', {
    name: 'chatCron',
    disabled: !CONFIG.platform.isCron,
  })
  async newMessageReviewCron() {
    // const date = Date.now();
    // const uuid = uuidv4();
    // this.logger.debug(`CRON start: chatCron ${uuid}`);

    try {
      const now = moment().utc().subtract(1, 'm');
      const [buyers, cultivators] = await Promise.all([
        this.dataSource.getRepository(FacilityToFacilityModel).find({
          where: {
            dateMessageBuyer: LessThanOrEqual(now.toDate()),
            isMessageBuyer: false,
          },
          select: {
            id: true,
            facilityCultivator: {
              id: true,
            },
          },
          relations: ['facilityCultivator'],
        }),
        this.dataSource.getRepository(FacilityToFacilityModel).find({
          where: {
            dateMessageCultivator: LessThanOrEqual(now.toDate()),
            isMessageCultivator: false,
          },
          select: {
            id: true,
            facilityBuyer: {
              id: true,
            },
          },
          relations: ['facilityBuyer'],
        }),
      ]);

      const promises = [];
      const pubsubObjects = [];
      buyers.forEach((item) => {
        promises.push(
          this.dataSource
            .getRepository(FacilityToFacilityModel)
            .create({
              id: item.id,
              isMessageBuyer: true,
            })
            .save(),
        );
        promises.push(
          this.dataSource
            .getRepository(FacilityModel)
            .create({
              id: item.__facilityCultivator__.id,
              isChatMessage: true,
            })
            .save(),
        );
        pubsubObjects.push(item.id);
      });

      cultivators.forEach((item) => {
        promises.push(
          this.dataSource
            .getRepository(FacilityToFacilityModel)
            .create({
              id: item.id,
              isMessageCultivator: true,
            })
            .save(),
        );
        promises.push(
          this.dataSource
            .getRepository(FacilityModel)
            .create({
              id: item.__facilityBuyer__.id,
              isChatMessage: true,
            })
            .save(),
        );
        pubsubObjects.push(item.id);
      });

      await Promise.all(promises);
      await Promise.all(
        pubsubObjects.map((id) =>
          this.redisGraphqlService.publish(SubscriptionsEnum.chatMessage, {
            [SubscriptionsEnum.chatMessage]: {
              id,
            },
          }),
        ),
      );
    } catch (error) {
      this.logger.error(`CRON: chatCron - ${error.message}`);
    } finally {
      // this.logger.debug(`CRON end: chatCron ${uuid} ${Date.now() - date}`);
    }
  }
}
