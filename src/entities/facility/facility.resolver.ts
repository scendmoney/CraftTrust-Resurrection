import { Resolver, Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CurrentCtx } from '../auth/auth.decorator';
import { DataSource, DeepPartial, In, Not } from 'typeorm';
import ErrorMsgEnum from '@enums/error';
import { FacilityModel } from './facility.model';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { AssetFileTypeEnum } from '@entities/asset/asset.enum';
import { AssetService } from '@entities/asset/asset.service';
import { FilterGetDTO, GetIdStringDTO } from '@common/query/query.dto';
import {
  EmailTemplatesEnum,
  SortDirectionEnum,
  SubscriptionsEnum,
} from '@enums/common';
import QueryService from '@common/query';
import { UserModel } from '@entities/user/user.model';
import {
  CreateChatFacilityToFacilityInput,
  RemoveRelationCultivatorToBuyerInput,
  UpdateBuyerByCultivatorInput,
  UpdateFacilityDTO,
} from './facility.input';
import { FacilitiesDTO, FacilityBalanceDTO } from './facility.dto';
import FacilityToFacilityModel from '@entities/facility_to_facility/facility_to_facility.model';
import { TwilioService } from 'libs/twilio/src';
import { RedisGraphqlService } from 'libs/redis/src';
import NotificationModel from '@entities/notification/notification.model';
import { NotificationTypeEnum } from '@entities/notification/notification.enum';
import { CONFIG } from '@config/index';
import merge from 'lodash/merge';
import { OrderModel } from '@entities/order/order.model';
import { OrderStatusEnum } from '@entities/order/order.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerIoTypesEnum } from '@entities/customerio/customerio.enum';
import CustomerioService from 'libs/customerio/src/customerio.service';
import { addPrifixEmail } from '@src/utils/utils';
import { CustomerIoDataService } from '@entities/customerio/customerio.service';
import { FacilityService } from './facility.service';

@Resolver(() => FacilityModel)
export class FacilityResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly assetService: AssetService,
    private readonly twilioService: TwilioService,
    private readonly redisGraphqlService: RedisGraphqlService,
    private eventEmitter: EventEmitter2,
    private readonly customerioService: CustomerioService,
    private readonly facilityService: FacilityService,
  ) {}

  @Mutation(() => FacilityModel, {
    description: '@protected - Update profile facility',
  })
  @UseGuards(AuthGuardUser)
  async updateFacility(
    @Args('payload', {
      type: () => UpdateFacilityDTO,
      nullable: false,
    })
    payload: UpdateFacilityDTO,
    @Args('logo', { type: () => GraphQLUpload, nullable: true })
    logo: FileUpload,
    @CurrentCtx() { user, relations },
  ): Promise<FacilityModel> {
    const facility = await this.dataSource
      .getRepository(FacilityModel)
      .findOne({
        where: {
          id: user.__context__.id,
        },
        select: ['id'],
        relations: ['owner'],
      });
    if (!facility) {
      throw new Error(ErrorMsgEnum.FacilityNotExist);
    }

    if (facility.__owner__?.id !== user.id) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }
    const asset = await this.assetService.getAsset(
      logo,
      AssetFileTypeEnum.logo,
    );

    const userContact = payload.userContactId
      ? await this.dataSource.getRepository(UserModel).findOne({
          where: {
            id: payload.userContactId,
          },
          select: ['id'],
        })
      : undefined;

    const data = {
      id: user.__context__.id,
      ...payload,
      asset,
      userContact: userContact ? { id: payload.userContactId } : undefined,
    };

    await this.dataSource.getRepository(FacilityModel).create(data).save();

    this.eventEmitter.emit(
      CustomerIoTypesEnum.facilityIdentify,
      user.__context__.id,
    );

    return this.dataSource.getRepository(FacilityModel).findOne({
      where: {
        id: user.__context__.id,
      },
      relations,
    });
  }

  @Mutation(() => FacilityModel, {
    description: '@protected - Updating the buyer by cultivator',
  })
  @UseGuards(AuthGuardUser)
  async updateBuyerByCultivator(
    @Args('payload', {
      type: () => UpdateBuyerByCultivatorInput,
      nullable: false,
    })
    payload: UpdateBuyerByCultivatorInput,
    @CurrentCtx() { user, relations },
  ): Promise<FacilityModel> {
    const data: DeepPartial<FacilityToFacilityModel> = {};

    const payloadKeys = Object.keys(payload);

    if (payloadKeys.includes('netDays')) {
      data.netDays = payload.netDays;
    }

    if (payloadKeys.includes('netBalance')) {
      data.netBalance = payload.netBalance;
    }

    if (payloadKeys.includes('isNetActivated')) {
      data.isNetActivated = payload.isNetActivated;

      if (!payload.isNetActivated) {
        data.netDays = 0;
        data.netBalance = 0;
      }
    }

    if (Object.keys(data).length) {
      await this.dataSource.getRepository(FacilityToFacilityModel).update(
        {
          facilityBuyer: { id: payload.id },
          facilityCultivator: { id: user.__context__.id },
        },
        data,
      );
    }

    return this.dataSource.getRepository(FacilityModel).findOne({
      where: {
        id: payload.id,
        facilityCultivatorRelations: {
          facilityCultivator: {
            id: user.__context__.id,
          },
        },
      },
      relations,
    });
  }

  @Mutation(() => Boolean, {
    description: '@protected - remove relation cultivator to buyer',
  })
  @UseGuards(AuthGuardUser)
  async removeRelationCultivatorToBuyer(
    @Args('payload', {
      type: () => RemoveRelationCultivatorToBuyerInput,
      nullable: false,
    })
    payload: RemoveRelationCultivatorToBuyerInput,
    @CurrentCtx() { user },
  ): Promise<boolean> {
    if (user.__context__.__owner__?.id !== user.id) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }

    const [facility, facilityRelation, order] = await Promise.all([
      this.dataSource.getRepository(FacilityModel).findOne({
        where: {
          id: payload.facilityId,
        },
        select: ['id'],
      }),
      this.dataSource.getRepository(FacilityToFacilityModel).findOne({
        where: [
          {
            facilityBuyer: {
              id: user.__context__.id,
            },
            facilityCultivator: {
              id: payload.facilityId,
            },
          },
          {
            facilityCultivator: {
              id: user.__context__.id,
            },
            facilityBuyer: {
              id: payload.facilityId,
            },
          },
        ],
        select: {
          id: true,
          dueBalance: true,
        },
        relations: ['facilityCultivator.owner', 'facilityBuyer.owner'],
      }),
      this.dataSource.getRepository(OrderModel).findOne({
        where: [
          {
            status: Not(
              In([OrderStatusEnum.Cancel, OrderStatusEnum.Completed]),
            ),
            facilityBuyer: {
              id: user.__context__.id,
            },
            facilityCultivator: {
              id: payload.facilityId,
            },
          },
          {
            status: Not(
              In([OrderStatusEnum.Cancel, OrderStatusEnum.Completed]),
            ),
            facilityCultivator: {
              id: user.__context__.id,
            },
            facilityBuyer: {
              id: payload.facilityId,
            },
          },
        ],
        select: ['id'],
      }),
    ]);

    if (!facility) {
      throw new Error(ErrorMsgEnum.FacilityNotExist);
    }
    if (!facilityRelation) {
      throw new Error(ErrorMsgEnum.FacilityNotRelation);
    }

    if (Number(facilityRelation.dueBalance) !== 0) {
      throw new Error(ErrorMsgEnum.FacilityDue);
    }

    if (order) {
      throw new Error(ErrorMsgEnum.ActiveOrderExist);
    }

    await Promise.all([
      this.dataSource
        .getRepository(FacilityToFacilityModel)
        .delete(facilityRelation.id),
      this.dataSource
        .getRepository(NotificationModel)
        .create({
          type: NotificationTypeEnum.message,
          theme: 'Buyer and Cultivator disconnected',
          description: `You have disconnected Buyer from ${facilityRelation.__facilityBuyer__.displayName} from you Facility. They no longer have access to your Storefront`,
          owner: {
            id: facilityRelation.__facilityCultivator__.__owner__?.id,
          },
        })
        .save(),
      this.dataSource
        .getRepository(NotificationModel)
        .create({
          type: NotificationTypeEnum.message,
          theme: 'Buyer and Cultivator disconnected',
          description: `You were disconnected from ${facilityRelation.__facilityCultivator__.displayName} Facility. You no longer have access to their Products`,
          owner: {
            id: facilityRelation.__facilityBuyer__.__owner__?.id,
          },
        })
        .save(),
    ]);

    await Promise.all([
      this.customerioService.sendEmail({
        to: facilityRelation.__facilityBuyer__.__owner__?.email,
        subject: 'Buyer and Cultivator disconnected',
        message_data: {
          ownerName: facilityRelation.__facilityBuyer__.__owner__?.fullName,
          facilityName: facilityRelation.__facilityCultivator__.displayName,
        },
        transactional_message_id: addPrifixEmail(
          EmailTemplatesEnum.deleteRelationBuyer,
          CONFIG.platform.ENV.toLowerCase(),
        ),
        identifiers: {
          id: CustomerIoDataService.getUserId(
            facilityRelation.__facilityBuyer__?.id,
          ),
        },
      }),
      this.customerioService.sendEmail({
        to: facilityRelation.__facilityCultivator__.__owner__?.email,
        subject: 'Buyer and Cultivator disconnected',
        message_data: {
          ownerName:
            facilityRelation.__facilityCultivator__.__owner__?.fullName,
          facilityName: facilityRelation.__facilityBuyer__.displayName,
        },
        transactional_message_id: addPrifixEmail(
          EmailTemplatesEnum.deleteRelationCultivator,
          CONFIG.platform.ENV.toLowerCase(),
        ),
        identifiers: {
          id: CustomerIoDataService.getUserId(
            facilityRelation.__facilityCultivator__?.id,
          ),
        },
      }),
    ]);

    return true;
  }

  @Query(() => FacilitiesDTO, {
    description: '@protected - List buyers',
  })
  @UseGuards(AuthGuardUser)
  async buyers(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { user, relations },
  ): Promise<FacilitiesDTO> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const filters = payload?.filters || [];
    const order = QueryService.getSorts(sorts);
    const where: any = QueryService.getFilters(filters);

    const [items, total] = await this.dataSource
      .getRepository(FacilityModel)
      .findAndCount({
        order,
        where: {
          ...merge(where, {
            facilityCultivatorRelations: {
              facilityCultivator: {
                id: user.__context__.id,
              },
            },
          }),
        },
        ...paginate,
        relations,
      });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    };
  }

  @Query(() => FacilitiesDTO, {
    description: '@protected - List cultivators',
  })
  @UseGuards(AuthGuardUser)
  async cultivators(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { user, relations },
  ): Promise<FacilitiesDTO> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const filters = payload?.filters || [];
    const order = QueryService.getSorts(sorts);
    const where: any = QueryService.getFilters(filters);

    const [items, total] = await this.dataSource
      .getRepository(FacilityModel)
      .findAndCount({
        order,
        where: {
          ...merge(where, {
            facilityBuyerRelations: {
              facilityBuyer: {
                id: user?.__context__?.id || -1,
              },
            },
          }),
        },
        ...paginate,
        relations,
      });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    };
  }

  @Query(() => FacilityModel, {
    description: '@protected - Get facility by id',
  })
  @UseGuards(AuthGuardUser)
  async facilityById(
    @Args('payload', { type: () => GetIdStringDTO })
    payload: GetIdStringDTO,
    @CurrentCtx() { user, relations },
  ): Promise<FacilityModel> {
    const facility = await this.dataSource
      .getRepository(FacilityModel)
      .findOne({
        where: [
          {
            id: payload.id,
            facilityCultivatorRelations: {
              facilityCultivator: {
                id: user.__context__.id,
              },
            },
          },
          {
            id: payload.id,
            facilityBuyerRelations: {
              facilityBuyer: {
                id: user.__context__.id,
              },
            },
          },
          {
            id: payload.id,
            users: {
              id: user.id,
            },
          },
        ],
        relations,
      });
    if (!facility) throw Error(ErrorMsgEnum.EntityNotExist);
    return facility;
  }

  @Query(() => FacilityBalanceDTO, {
    description: '@protected - Get carat balance facility',
  })
  @UseGuards(AuthGuardUser)
  async facilityBalanceCarat(
    @CurrentCtx() { user },
  ): Promise<FacilityBalanceDTO> {
    const result = await this.facilityService.facilityBalanceCarat(
      user.__context__?.publicAddress,
      user.__context__?.id,
    );

    return {
      ...result,
      balanceBuy: {
        balance: result.balanceBuy.balance - result.balanceBlocked.balance,
        balanceUsd:
          result.balanceBuy.balanceUsd - result.balanceBlocked.balanceUsd,
      },
    };
  }

  @Mutation(() => String, {
    description: '@protected - create Chat Facility To Facility',
  })
  @UseGuards(AuthGuardUser)
  async createChatFacilityToFacility(
    @Args('payload', {
      type: () => CreateChatFacilityToFacilityInput,
      nullable: false,
    })
    payload: CreateChatFacilityToFacilityInput,
    @CurrentCtx() { user },
  ): Promise<string> {
    const [facilityToFacility, facility] = await Promise.all([
      this.dataSource.getRepository(FacilityToFacilityModel).findOne({
        where: [
          {
            facilityBuyer: {
              id: payload.facilityId,
            },
            facilityCultivator: {
              id: user.__context__.id,
            },
          },
          {
            facilityBuyer: {
              id: user.__context__.id,
            },
            facilityCultivator: {
              id: payload.facilityId,
            },
          },
        ],
        select: ['id', 'chatSid'],
      }),
      this.dataSource.getRepository(FacilityModel).findOne({
        where: [
          {
            id: payload.facilityId,
            users: {
              id: user.id,
            },
          },
          {
            id: user.__context__.id,
            users: {
              id: user.id,
            },
          },
        ],
        select: ['id'],
      }),
    ]);

    if (!facility) {
      throw new Error(ErrorMsgEnum.PayloadWrong);
    }

    if (!facilityToFacility) {
      throw new Error(ErrorMsgEnum.FacilityNotRelation);
    }

    if (facilityToFacility.chatSid) {
      return facilityToFacility.chatSid;
    }

    const chatSid = await this.twilioService.createChat([
      user.__context__.id,
      payload.facilityId,
    ]);

    await this.dataSource
      .getRepository(FacilityToFacilityModel)
      .update(facilityToFacility.id, {
        chatSid: chatSid,
      });

    this.eventEmitter.emit(CustomerIoTypesEnum.chatStarted, {
      buyerId: facilityToFacility.__facilityBuyer__.id,
      cultivatorId: facilityToFacility.__facilityCultivator__.id,
    });

    return chatSid;
  }

  @Mutation(() => String, { description: 'Facility token generation' })
  @UseGuards(AuthGuardUser)
  async generateToken(@CurrentCtx() { user }): Promise<string> {
    const token = await this.twilioService.generateToken(user.__context__.id);
    return token;
  }

  @Mutation(() => FacilityToFacilityModel, {
    description: 'Facility status chat update',
  })
  @UseGuards(AuthGuardUser)
  async updateTimeChat(
    @CurrentCtx() { user, relations },
    @Args('payload', { type: () => GetIdStringDTO })
    { id }: GetIdStringDTO,
  ): Promise<FacilityToFacilityModel> {
    const [relationFacility, otherMessages] = await Promise.all([
      this.dataSource.getRepository(FacilityToFacilityModel).findOne({
        where: [
          {
            facilityBuyer: {
              id: id,
            },
            facilityCultivator: {
              id: user.__context__.id,
            },
          },
          {
            facilityBuyer: {
              id: user.__context__.id,
            },
            facilityCultivator: {
              id: id,
            },
          },
        ],
        select: ['id', 'chatSid', 'facilityCultivator', 'facilityBuyer'],
        relations: ['facilityCultivator', 'facilityBuyer'],
      }),
      this.dataSource.getRepository(FacilityToFacilityModel).findOne({
        where: [
          {
            isMessageBuyer: true,
            facilityCultivator: {
              id: user.__context__.id,
            },
            facilityBuyer: {
              id: Not(id),
            },
          },
          {
            isMessageCultivator: true,
            facilityBuyer: {
              id: user.__context__.id,
            },
            facilityCultivator: {
              id: Not(id),
            },
          },
        ],
        select: ['id'],
      }),
    ]);

    if (!relationFacility) throw new Error(ErrorMsgEnum.FacilityNotRelation);

    const query: DeepPartial<FacilityToFacilityModel> = {
      id: relationFacility.id,
    };

    if (relationFacility.__facilityBuyer__.id === user.__context__.id) {
      query.isMessageCultivator = false;
      query.dateMessageCultivator = null;
    }

    if (relationFacility.__facilityCultivator__.id === user.__context__.id) {
      query.isMessageBuyer = false;
      query.dateMessageBuyer = null;
    }

    const promises = [];

    promises.push(
      this.dataSource
        .getRepository(FacilityToFacilityModel)
        .create(query)
        .save(),
    );

    promises.push(
      this.dataSource
        .getRepository(FacilityModel)
        .create({
          id: user.__context__.id,
          isChatMessage: !!otherMessages,
        })
        .save(),
    );

    await Promise.all(promises);

    return this.dataSource.getRepository(FacilityToFacilityModel).findOne({
      where: {
        id: relationFacility.id,
      },
      relations,
    });
  }

  @Subscription(() => FacilityToFacilityModel, {
    name: SubscriptionsEnum.chatMessage,
    filter: async ({ chatMessage }, _, context) => {
      const facilityRelation = await FacilityToFacilityModel.findOne({
        where: { id: chatMessage?.id },
        relations: ['facilityCultivator', 'facilityBuyer'],
      });
      return (
        (facilityRelation.__facilityBuyer__?.id ===
          context?.user?.__context__?.id &&
          facilityRelation.isMessageCultivator) ||
        (facilityRelation.__facilityCultivator__?.id ===
          context?.user?.__context__?.id &&
          facilityRelation.isMessageBuyer)
      );
    },
    resolve: async ({ chatMessage }) =>
      FacilityToFacilityModel.findOne({
        where: { id: chatMessage?.id },
      }),
  })
  chatMessage() {
    return this.redisGraphqlService.asyncIterator<FacilityToFacilityModel>(
      SubscriptionsEnum.chatMessage,
    );
  }
}
