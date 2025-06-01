import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CompanyModel } from './company.model';
import CustomerioService from 'libs/customerio/src/customerio.service';
import { CustomerIoDataService } from '@entities/customerio/customerio.service';
import { CONFIG } from '@config/index';
import { addPrifixEmail } from '@src/utils/utils';
import { EmailTemplatesEnum } from '@enums/common';
import moment from 'moment';

@Injectable()
export class CompanyService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly customerioService: CustomerioService,
  ) {}

  async sendCompanyEmail(companyId: number) {
    const company = await this.dataSource.getRepository(CompanyModel).findOne({
      where: {
        id: companyId,
      },
      relations: [
        'facilityCultivator.owner',
        'subcompanies.facilityBuyer.owner',
      ],
    });

    const promises = [];

    const cultivatorEmail =
      company.__facilityCultivator__?.campaignEmail ||
      company.__facilityCultivator__?.__owner__?.email;

    company.__subcompanies__?.forEach((subcompany) => {
      const buyerEmail =
        subcompany.__facilityBuyer__?.campaignEmail ||
        subcompany.__facilityBuyer__?.__owner__?.email;

      promises.push(
        this.customerioService.sendEmail({
          to: buyerEmail,
          subject: `Campaign was started`,
          message_data: {
            companyName: company.companyName,
            cultivatorName: company.__facilityCultivator__?.name,
            date: moment().format('YYYY-MM-DD'),
          },
          transactional_message_id: addPrifixEmail(
            EmailTemplatesEnum.surveyStartCompany,
            CONFIG.platform.ENV.toLowerCase(),
          ),
          identifiers: {
            id: CustomerIoDataService.getUserId(
              subcompany.__facilityBuyer__?.id,
            ),
          },
        }),
        this.customerioService.sendEmail({
          to: cultivatorEmail,
          subject: `Campaign was started`,
          message_data: {
            companyName: company.companyName,
            cultivatorName: company.__facilityCultivator__?.name,
            date: moment().format('YYYY-MM-DD'),
          },
          transactional_message_id: addPrifixEmail(
            EmailTemplatesEnum.surveyStartCompanyCultivator,
            CONFIG.platform.ENV.toLowerCase(),
          ),
          identifiers: {
            id: CustomerIoDataService.getUserId(
              company.__facilityCultivator__?.id,
            ),
          },
        }),
      );
    });
    await Promise.allSettled(promises);
  }
}
