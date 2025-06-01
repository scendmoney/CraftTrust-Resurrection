import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { DataSource, In } from 'typeorm';
import {
  EmailTemplatesEnum,
  JobEnum,
  QueueEnum,
  SubscriptionsEnum,
} from '@enums/common';
import { RequestModel } from './request.model';
import { RequestTypeEnum } from './request.enum';
import { UserModel } from '@entities/user/user.model';
import { UserRoleEnum } from '@entities/user/user.enum';
import { RedisGraphqlService } from 'libs/redis/src';
import { CustomLoggerService } from '@common/logger/custom_logger.service';
import CustomerioService from 'libs/customerio/src/customerio.service';
import { addPrifixEmail } from '@src/utils/utils';
import { CONFIG } from '@config/index';
import { v4 as uuidv4 } from 'uuid';

const notificationData = {
  [RequestTypeEnum.contactUs]: {
    adminEmailSubject: 'A new contact us has been received.',
    adminEmailTemplate: 'request/contactus_admin',
    adminEmailTemplateCustomerIo: EmailTemplatesEnum.contactusAdmin,
    clientEmailSubject: 'Contact Us form submitted successfully.',
    clientEmailTemplate: 'request/contactus_client',
    clientEmailTemplateCustomerIo: EmailTemplatesEnum.contactUsClient,
  },
  [RequestTypeEnum.request]: {
    adminEmailSubject:
      'A new request to register a facility has been received.',
    adminEmailTemplate: 'request/request_facility_admin',
    adminEmailTemplateCustomerIo: EmailTemplatesEnum.requestFacilityAdmin,
    clientEmailSubject: 'Join our Platform for submitted successfully.',
    clientEmailTemplate: 'request/request_facility_client',
    clientEmailTemplateCustomerIo: EmailTemplatesEnum.requestFacilityClient,
  },
};

@Injectable()
@Processor(QueueEnum.request)
export class RequestQueue {
  constructor(
    private readonly dataSource: DataSource,
    private readonly redisGraphqlService: RedisGraphqlService,
    private readonly logger: CustomLoggerService,
    private readonly customerioService: CustomerioService,
  ) {}

  @Process(JobEnum.newRequestJob)
  async newRequestJob({ data: { requestId } }: Job<{ requestId: number }>) {
    try {
      const request = await this.dataSource
        .getRepository(RequestModel)
        .findOne({
          where: {
            id: requestId,
          },
        });
      if (!request) {
        throw new Error(`Request no exist: id: ${requestId}`);
      }

      const notificationDataByType = notificationData[request.type];
      const admins = await this.dataSource.getRepository(UserModel).find({
        where: {
          role: In([UserRoleEnum.admin_platform, UserRoleEnum.owner_platform]),
          isBlocked: false,
        },
        select: {
          id: true,
          email: true,
          adminData: {
            isNotificationContactUs: true,
            isNotificationJoinFacility: true,
          },
        },
      });

      const promises = [];
      const id = uuidv4();
      admins.forEach((admin) => {
        if (
          (request.type === RequestTypeEnum.contactUs &&
            admin.adminData.isNotificationContactUs) ||
          (request.type === RequestTypeEnum.request &&
            admin.adminData.isNotificationJoinFacility)
        ) {
          promises.push(
            this.customerioService.sendEmail({
              to: admin.email,
              subject: notificationDataByType.adminEmailSubject,
              message_data: request,
              transactional_message_id: addPrifixEmail(
                notificationDataByType.adminEmailTemplateCustomerIo,
                CONFIG.platform.ENV.toLowerCase(),
              ),
              identifiers: {
                id,
              },
            }),
          );
        }

        promises.push(
          this.redisGraphqlService.publish(SubscriptionsEnum.newRequest, {
            [SubscriptionsEnum.newRequest]: {
              id: request.id,
              adminId: admin.id,
            },
          }),
        );
      });
      await Promise.all([
        this.customerioService.sendEmail({
          to: request.email,
          subject: notificationDataByType.clientEmailSubject,
          message_data: {
            name: request.name,
          },
          transactional_message_id: addPrifixEmail(
            notificationDataByType.clientEmailTemplateCustomerIo,
            CONFIG.platform.ENV.toLowerCase(),
          ),
          identifiers: {
            id,
          },
        }),
        ...promises,
      ]);
    } catch (error) {
      this.logger.error(`Request error ${requestId}: `, error.message);
    }
  }
}
