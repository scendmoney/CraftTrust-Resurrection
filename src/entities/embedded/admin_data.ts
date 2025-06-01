import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true, description: 'Admin data' })
export class AdminData {
  @Field(() => Boolean, {
    nullable: false,
  })
  @Column({
    type: 'bool',
    name: 'is_notification_contact_us',
    default: false,
    nullable: false,
  })
  isNotificationContactUs: boolean;

  @Field(() => Boolean, {
    nullable: false,
  })
  @Column({
    type: 'bool',
    name: 'is_notification_join_facility',
    default: false,
    nullable: false,
  })
  isNotificationJoinFacility: boolean;
}
