import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import NotificationModel from './notification.model';
import { RedisGraphqlService } from 'libs/redis/src';
import { SubscriptionsEnum } from '@enums/common';

@EventSubscriber()
export default class NotificationSubscriber
  implements EntitySubscriberInterface<NotificationModel>
{
  constructor(
    private dataSource: DataSource,
    private readonly redisGraphqlService: RedisGraphqlService,
  ) {
    dataSource.subscribers.push(this);
  }

  public listenTo() {
    return NotificationModel;
  }

  public async afterInsert(event: InsertEvent<NotificationModel>) {
    if (event.entity.id) {
      this.redisGraphqlService.publish(SubscriptionsEnum.addNotification, {
        [SubscriptionsEnum.addNotification]: {
          id: event.entity.id,
        },
      });
    }
  }
}
