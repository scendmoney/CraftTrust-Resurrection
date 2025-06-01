import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import NotificationModel from './notification.model';
import { Notifications } from './notification.dto';
import { RedisGraphqlService } from 'libs/redis/src';
import { DataSource } from 'typeorm';
import { SortDirectionEnum, SubscriptionsEnum } from '@enums/common';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import ErrorMsgEnum from '@enums/error';
import { NotificationStatusEnum } from './notification.enum';
import QueryService from '@common/query';

@Resolver(() => NotificationModel)
export default class NotificationResolver {
  constructor(
    private readonly redisGraphqlService: RedisGraphqlService,
    private dataSource: DataSource,
  ) {}

  @Mutation(() => NotificationModel, {
    description: '@protected - open notification',
  })
  @UseGuards(AuthGuardUser)
  async readNotification(
    @CurrentCtx() { user, relations },
    @Args('payload', { type: () => GetIdDTO })
    { id }: GetIdDTO,
  ): Promise<NotificationModel> {
    const notification = await this.dataSource
      .getRepository(NotificationModel)
      .findOne({
        where: {
          id,
          owner: {
            id: user.id,
          },
        },
      });

    if (!notification) throw new Error(ErrorMsgEnum.EntityNotExist);

    await this.dataSource.getRepository(NotificationModel).update(id, {
      status: NotificationStatusEnum.read,
    });
    return this.dataSource
      .getRepository(NotificationModel)
      .findOne({ where: { id }, relations });
  }

  @Mutation(() => Boolean, {
    description: '@protected - delete notification',
  })
  @UseGuards(AuthGuardUser)
  async deleteNotification(
    @CurrentCtx() { user },
    @Args('payload', { type: () => GetIdDTO })
    { id }: GetIdDTO,
  ): Promise<boolean> {
    const notification = await this.dataSource
      .getRepository(NotificationModel)
      .findOne({
        where: {
          id,
          owner: {
            id: user.id,
          },
        },
      });

    if (!notification) throw new Error(ErrorMsgEnum.EntityNotExist);

    await this.dataSource.getRepository(NotificationModel).softRemove({ id });
    return true;
  }

  @Query(() => Notifications, {
    description: '@protected - get user notification',
  })
  @UseGuards(AuthGuardUser)
  async notifications(
    @CurrentCtx() { user, relations },
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
  ): Promise<Notifications> {
    const paginate = payload.paginate || { skip: 0, take: 10 };
    const sorts = [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];
    const order = QueryService.getSorts(sorts);
    const where = QueryService.getFilters(payload?.filters || []);

    const [items, total] = await this.dataSource
      .getRepository(NotificationModel)
      .findAndCount({
        where: {
          ...where,
          owner: {
            id: user.id,
          },
        },
        order,
        relations,
        ...paginate,
      });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    };
  }

  @Query(() => NotificationModel, {
    description: '@protected - get user notification by id',
  })
  @UseGuards(AuthGuardUser)
  async notificationById(
    @CurrentCtx() { user, relations },
    @Args('payload', { type: () => GetIdDTO }) { id }: GetIdDTO,
  ): Promise<NotificationModel> {
    const notification = await this.dataSource
      .getRepository(NotificationModel)
      .findOne({
        where: {
          id,
          owner: {
            id: user.id,
          },
        },
        relations,
      });

    if (!notification) throw new Error(ErrorMsgEnum.EntityNotExist);

    return notification;
  }

  @Subscription(() => NotificationModel, {
    name: SubscriptionsEnum.addNotification,
    filter: async ({ addNotification }, _, context) => {
      const notification = await NotificationModel.findOne({
        where: { id: addNotification?.id },
        relations: ['owner'],
      });
      return notification.__owner__?.id === context?.user?.id;
    },
    resolve: async ({ addNotification }) =>
      NotificationModel.findOne({
        where: { id: addNotification?.id },
      }),
  })
  addNotification() {
    return this.redisGraphqlService.asyncIterator<NotificationModel>(
      SubscriptionsEnum.addNotification,
    );
  }
}
