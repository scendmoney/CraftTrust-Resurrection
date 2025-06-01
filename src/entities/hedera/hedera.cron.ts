import { CONFIG } from '@config/index';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { v4 as uuidv4 } from 'uuid';
import HederaService from 'libs/hedera/src/hedera.service';
import { DataSource, IsNull } from 'typeorm';
import { UserModel } from '@entities/user/user.model';
import { UserRoleEnum } from '@entities/user/user.enum';
import { RedisCacheService } from 'libs/redis/src';
import {
  EmailTemplatesEnum,
  JobEnum,
  QueueEnum,
  RedisCacheKeysEnum,
} from '@enums/common';
import { CustomLoggerService } from '@common/logger/custom_logger.service';
import { addPrifixEmail } from '@src/utils/utils';
import CustomerioService from 'libs/customerio/src/customerio.service';
import { CustomerIoDataService } from '@entities/customerio/customerio.service';
import { FacilityModel } from '@entities/facility/facility.model';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class HederaCron {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly hederaService: HederaService,
    private readonly dataSource: DataSource,
    private readonly redisCacheService: RedisCacheService,
    private readonly customerioService: CustomerioService,
    @InjectQueue(QueueEnum.queueHedera) private readonly queueHedera: Queue,
  ) {}

  @Cron('0 0 1 */1 * *', {
    name: 'contractExpiresAt',
    disabled: true, //error status MODIFYING_IMMUTABLE_CONTRACT
  })
  private async contractExpires() {
    const date = Date.now();
    const uuid = uuidv4();
    this.logger.debug(`CRON start: contractExpiresAt ${uuid}`);
    try {
      const expire = await this.redisCacheService.get(
        `${RedisCacheKeysEnum.contractExpires}:${CONFIG.hedera.contract}`,
      );

      if (!expire) {
        await this.hederaService.contractExpiresAtUpdate(
          CONFIG.hedera.contract,
        );
        await this.redisCacheService.setAndExpireat(
          `${RedisCacheKeysEnum.contractExpires}:${CONFIG.hedera.contract}`,
          true,
          85 * 24 * 60 * 60,
        );
      }
    } catch (error) {
      this.logger.error(`CRON: contractExpiresAt - ${error.message}`);
      const admins = await this.dataSource.getRepository(UserModel).find({
        where: {
          role: UserRoleEnum.owner_platform,
        },
        select: ['id', 'email'],
      });

      await Promise.all(
        admins.map((admin) =>
          this.customerioService.sendEmail({
            to: admin.email,
            subject: 'The platform wallet has run out of hbar',
            message_data: {
              error: error.message,
            },
            transactional_message_id: addPrifixEmail(
              EmailTemplatesEnum.adminContractExpiresError,
              CONFIG.platform.ENV.toLowerCase(),
            ),
            identifiers: {
              id: CustomerIoDataService.getUserId(admin.id),
            },
          }),
        ),
      );
    } finally {
      if (Date.now() - date >= 5000) {
        this.logger.debug(
          `CRON end: contractExpiresAt ${uuid} ${
            (Date.now() - date) / 1000
          } sec`,
        );
      }
    }
  }

  @Cron('0 */5 * * * *', {
    name: 'createWalletHedera',
    disabled: !CONFIG.platform.isCron,
  })
  async createWalletHedera() {
    const date = Date.now();
    const uuid = uuidv4();
    // this.logger.debug(`CRON start: createWalletHedera ${uuid}`);
    try {
      const [facilities, users] = await Promise.all([
        this.dataSource.getRepository(FacilityModel).find({
          where: [
            {
              publicAddress: IsNull(),
            },
            {
              publicAddress: '',
            },
          ],
          select: ['id'],
        }),
        this.dataSource.getRepository(UserModel).find({
          where: [
            {
              role: UserRoleEnum.client,
              publicAddress: IsNull(),
            },
            {
              role: UserRoleEnum.client,
              publicAddress: '',
            },
          ],
          select: ['id'],
        }),
      ]);

      facilities.forEach(({ id }) =>
        this.queueHedera.add(
          JobEnum.createHederaWalletJob,
          {
            id,
            model: 'FacilityModel',
            isAssociate: true,
          },
          { attempts: 2, removeOnComplete: true },
        ),
      );

      users.forEach(({ id }) =>
        this.queueHedera.add(
          JobEnum.createHederaWalletJob,
          {
            id,
            model: 'UserModel',
          },
          { attempts: 2, removeOnComplete: true },
        ),
      );
    } catch (error) {
      this.logger.error(`CRON: createWalletHedera - ${error.message}`);
    } finally {
      if (Date.now() - date >= 5000) {
        this.logger.debug(
          `CRON end: createWalletHedera ${uuid} ${
            (Date.now() - date) / 1000
          } sec`,
        );
      }
    }
  }
}
