import { CONFIG } from '@config/index';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataSource, LessThanOrEqual } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CompanyModel } from './company.model';
import moment from 'moment';
import { CompanyStatusEnum } from './company.enum';
import { CustomLoggerService } from '@common/logger/custom_logger.service';
import { CompanyService } from './company.service';

@Injectable()
export class CompanyCron {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly dataSource: DataSource,
    private readonly companyService: CompanyService,
  ) {}

  @Cron('0 0 */2 * * *', {
    name: 'archivedCompanyCron',
    disabled: !CONFIG.platform.isCron,
  })
  private async archivedCompanyCron() {
    const date = Date.now();
    const uuid = uuidv4();

    // this.logger.debug(`CRON start: syncCompanyStatusCron ${uuid}`);
    try {
      const companies = await this.dataSource.getRepository(CompanyModel).find({
        where: {
          dateEnd: LessThanOrEqual(moment().format('YYYY-MM-DD')),
          status: CompanyStatusEnum.Active,
        },
        select: ['id', 'dateEnd', 'status'],
      });

      if (companies.length) {
        const items = companies.map(({ id }) => ({
          id,
          status: CompanyStatusEnum.Archived,
        }));
        await this.dataSource.getRepository(CompanyModel).save(items);
      }
    } catch (error) {
      this.logger.error(`CRON: archivedCompanyCron - ${error.message}`);
    } finally {
      if (Date.now() - date >= 5000) {
        this.logger.debug(
          `CRON end: archivedCompanyCron ${uuid} ${
            (Date.now() - date) / 1000
          } sec`,
        );
      }
    }
  }

  @Cron('0 59 00 * * *', {
    name: 'companyStartNotificationCron',
    disabled: !CONFIG.platform.isCron,
  })
  private async companyStartNotificationCron() {
    const date = Date.now();
    const uuid = uuidv4();

    try {
      const companies = await this.dataSource.getRepository(CompanyModel).find({
        where: {
          dateStart: moment().format('YYYY-MM-DD'),
          status: CompanyStatusEnum.Active,
        },
        select: ['id'],
      });

      if (companies.length) {
        const promises = [];

        companies.forEach(({ id }) => this.companyService.sendCompanyEmail(id));
        await Promise.allSettled(promises);
      }
    } catch (error) {
      this.logger.error(
        `CRON: companyStartNotificationCron - ${error.message}`,
      );
    } finally {
      if (Date.now() - date >= 5000) {
        this.logger.debug(
          `CRON end: companyStartNotificationCron ${uuid} ${
            (Date.now() - date) / 1000
          } sec`,
        );
      }
    }
  }
}
