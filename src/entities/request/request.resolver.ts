import { Resolver, Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentCtx } from '../auth/auth.decorator';
import { DataSource } from 'typeorm';
import { AuthGuardAdmin } from '@entities/auth/auth.guard';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import {
  EmailTemplatesEnum,
  JobEnum,
  QueueEnum,
  SortDirectionEnum,
  SubscriptionsEnum,
} from '@enums/common';
import QueryService from '@common/query';
import { RequestModel } from './request.model';
import {
  RejectRequestInput,
  RequestNewFacilityInput,
  SendContactUsInput,
  UpdateRequestInput,
} from './request.input';
import { RequestStatusEnum, RequestTypeEnum } from './request.enum';
import { RequestsDTO } from './request.dto';
import ErrorMsgEnum from '@enums/error';
import { GoogleRecaptchaValidator } from '@nestlab/google-recaptcha';
import { RedisGraphqlService } from 'libs/redis/src';
import crypto from 'crypto';
import { CONFIG } from '@config/index';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import CustomerioService from 'libs/customerio/src/customerio.service';
import { addPrifixEmail } from '@src/utils/utils';
import { v4 as uuidv4 } from 'uuid';

@Resolver(() => RequestModel)
export class RequestResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly recaptchaValidator: GoogleRecaptchaValidator,
    private readonly redisGraphqlService: RedisGraphqlService,
    private readonly customerioService: CustomerioService,
    @InjectQueue(QueueEnum.request) private readonly queueRequest: Queue,
  ) {}

  @Mutation(() => Boolean, {
    description: '@public - send Contact Us',
  })
  async sendContactUs(
    @Args('payload', {
      type: () => SendContactUsInput,
      nullable: false,
    })
    payload: SendContactUsInput,
    @Args('token', {
      type: () => String,
      nullable: false,
    })
    token: string,
  ): Promise<boolean> {
    const result = await this.recaptchaValidator.validate({
      response: token,
    });

    if (!result.success) {
      throw new Error(ErrorMsgEnum.RecaptchaError);
    }

    const request = await this.dataSource
      .getRepository(RequestModel)
      .create({
        ...payload,
        email: payload.email.toLowerCase(),
        type: RequestTypeEnum.contactUs,
      })
      .save();

    this.queueRequest.add(
      JobEnum.newRequestJob,
      {
        requestId: request.id,
      },
      { attempts: 2, removeOnComplete: true },
    );

    return true;
  }

  @Mutation(() => Boolean, {
    description: '@public - request join',
  })
  async requestNewFacility(
    @Args('payload', {
      type: () => RequestNewFacilityInput,
      nullable: false,
    })
    payload: RequestNewFacilityInput,
    @Args('token', {
      type: () => String,
      nullable: false,
    })
    token: string,
  ): Promise<boolean> {
    const result = await this.recaptchaValidator.validate({
      response: token,
    });

    if (!result.success) {
      throw new Error(ErrorMsgEnum.RecaptchaError);
    }

    const request = await this.dataSource
      .getRepository(RequestModel)
      .create({
        ...payload,
        email: payload.email.toLowerCase(),
        type: RequestTypeEnum.request,
      })
      .save();
    this.queueRequest.add(
      JobEnum.newRequestJob,
      {
        requestId: request.id,
      },
      { attempts: 2, removeOnComplete: true },
    );
    return true;
  }

  @Query(() => RequestsDTO, {
    description: '@protected - get requests',
  })
  @UseGuards(AuthGuardAdmin)
  async requests(
    @CurrentCtx() { relations },
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
  ): Promise<RequestsDTO> {
    const paginate = payload.paginate || { skip: 0, take: 10 };
    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];
    const order = QueryService.getSorts(sorts);
    const where = QueryService.getFilters(payload?.filters || []);

    const [items, total] = await this.dataSource
      .getRepository(RequestModel)
      .findAndCount({
        where: where,
        relations,
        ...paginate,
        order,
      });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    };
  }

  @Query(() => RequestModel, {
    description: '@protected - Request by id',
  })
  @UseGuards(AuthGuardAdmin)
  async requestById(
    @Args('payload', { type: () => GetIdDTO })
    { id }: GetIdDTO,
    @CurrentCtx() { relations },
  ): Promise<RequestModel> {
    const request = await this.dataSource
      .getTreeRepository(RequestModel)
      .findOne({
        where: {
          id: id,
        },
        relations: [...relations],
      });

    if (!request) throw Error(ErrorMsgEnum.EntityNotExist);

    return request;
  }

  @Mutation(() => RequestModel, {
    description: '@protected - update request',
  })
  @UseGuards(AuthGuardAdmin)
  async updateRequest(
    @CurrentCtx() { user, relations },
    @Args('payload', { type: () => UpdateRequestInput })
    payload: UpdateRequestInput,
  ): Promise<RequestModel> {
    const request = await this.dataSource.getRepository(RequestModel).findOne({
      where: {
        id: payload.id,
      },
    });

    if (!request) throw new Error(ErrorMsgEnum.RequestNotExist);

    await this.dataSource
      .getRepository(RequestModel)
      .create({
        ...payload,
        admin: {
          id: user.id,
        },
      })
      .save();
    return this.dataSource
      .getRepository(RequestModel)
      .findOne({ where: { id: payload.id }, relations });
  }

  @Mutation(() => RequestModel, {
    description: '@protected - reject request',
  })
  @UseGuards(AuthGuardAdmin)
  async rejectRequest(
    @CurrentCtx() { user, relations },
    @Args('payload', { type: () => RejectRequestInput })
    { id, messageReject }: RejectRequestInput,
  ): Promise<RequestModel> {
    const request = await this.dataSource.getRepository(RequestModel).findOne({
      where: {
        id,
      },
    });

    if (!request) throw new Error(ErrorMsgEnum.RequestNotExist);
    if (request.status === RequestStatusEnum.closed) {
      throw new Error(ErrorMsgEnum.RequestStatusWrong);
    }

    await Promise.all([
      this.dataSource
        .getRepository(RequestModel)
        .create({
          id,
          status: RequestStatusEnum.rejected,
          messageReject,
          admin: {
            id: user.id,
          },
        })
        .save(),
      this.customerioService.sendEmail({
        to: request.email,
        subject: 'Join our Platform.',
        message_data: {
          messageReject,
        },
        transactional_message_id: addPrifixEmail(
          EmailTemplatesEnum.requestFacilityReject,
          CONFIG.platform.ENV.toLowerCase(),
        ),
        identifiers: {
          id: uuidv4(),
        },
      }),
    ]);
    return this.dataSource
      .getRepository(RequestModel)
      .findOne({ where: { id }, relations });
  }

  @Mutation(() => RequestModel, {
    description: '@protected - approve request',
  })
  @UseGuards(AuthGuardAdmin)
  async approveRequest(
    @CurrentCtx() { user, relations },
    @Args('payload', { type: () => GetIdDTO })
    { id }: GetIdDTO,
  ): Promise<RequestModel> {
    const request = await this.dataSource.getRepository(RequestModel).findOne({
      where: {
        id,
      },
    });

    if (!request) throw new Error(ErrorMsgEnum.RequestNotExist);
    if (request.status === RequestStatusEnum.closed) {
      throw new Error(ErrorMsgEnum.RequestStatusWrong);
    }

    const name = `${request.name}${
      request.companyName ? `(${request.companyName})` : ''
    }`;

    const code = crypto.randomBytes(8).toString('hex');
    await Promise.all([
      this.dataSource
        .getRepository(RequestModel)
        .create({
          id,
          status: RequestStatusEnum.approved,
          code,
          admin: {
            id: user.id,
          },
        })
        .save(),
      this.customerioService.sendEmail({
        to: request.email,
        subject: `${name}, your early access has been granted`,
        message_data: {
          name: name,
          url: `${CONFIG.platform.platformUrl}/auth/join/cultivator?code=${code}`,
        },
        transactional_message_id: addPrifixEmail(
          EmailTemplatesEnum.requestFacilityApprove,
          CONFIG.platform.ENV.toLowerCase(),
        ),
        identifiers: {
          id: uuidv4(),
        },
      }),
    ]);

    return this.dataSource
      .getRepository(RequestModel)
      .findOne({ where: { id }, relations });
  }

  @Subscription(() => RequestModel, {
    name: SubscriptionsEnum.newRequest,
    filter: async ({ newRequest }, _, context) =>
      newRequest.adminId === context?.user?.id,
    resolve: async ({ newRequest }) =>
      RequestModel.findOne({
        where: { id: newRequest?.id },
      }),
  })
  addNotification() {
    return this.redisGraphqlService.asyncIterator<RequestModel>(
      SubscriptionsEnum.newRequest,
    );
  }
}
