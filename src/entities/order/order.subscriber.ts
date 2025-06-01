import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { RedisGraphqlService } from 'libs/redis/src';
import { SubscriptionsEnum } from '@enums/common';
import { OrderModel } from './order.model';
@EventSubscriber()
export default class OrderSubscriber
  implements EntitySubscriberInterface<OrderModel>
{
  constructor(
    private dataSource: DataSource,
    private readonly redisGraphqlService: RedisGraphqlService,
  ) {
    dataSource.subscribers.push(this);
  }

  public listenTo() {
    return OrderModel;
  }

  public async beforeInsert(event: InsertEvent<OrderModel>) {
    event.entity.totalBuyer = event.entity.total + event.entity.fee.feeBuyer;
    event.entity.totalCultivator =
      event.entity.total - event.entity.fee.feeCultivator;
  }

  public async afterInsert(event: InsertEvent<OrderModel>) {
    if (event.entity.id) {
      this.redisGraphqlService.publish(SubscriptionsEnum.newOrder, {
        [SubscriptionsEnum.newOrder]: {
          id: event.entity.id,
        },
      });
    }
  }
}
