import { PaginateModel } from '@common/query/query.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import NotificationModel from './notification.model';

@ObjectType({ isAbstract: true, description: 'Notifications' })
export class Notifications {
  @Field(() => [NotificationModel], { nullable: false })
  items: NotificationModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}
