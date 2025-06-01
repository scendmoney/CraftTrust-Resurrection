import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  NotificationStatusEnum,
  NotificationTypeEnum,
} from './notification.enum';
import { UserModel } from '@entities/user/user.model';
import { Dates } from '@entities/embedded/date';

@ObjectType({ isAbstract: true })
@Entity('notification')
export default class NotificationModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @IsString()
  @IsNotEmpty({
    message: 'Theme field is required',
  })
  @Field(() => String, { nullable: false, description: 'Theme' })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'theme',
    comment: 'Theme',
  })
  theme: string;

  @IsString()
  @IsNotEmpty({
    message: 'Name field is required',
  })
  @Length(1, 3000)
  @Field(() => String, { nullable: false, description: 'Description' })
  @Column({
    type: 'varchar',
    name: 'description',
    length: 3000,
    nullable: false,
    default: '',
    comment: 'Description',
  })
  description: string;

  @Field(() => NotificationStatusEnum, { nullable: false })
  @Column({
    type: 'enum',
    nullable: false,
    enum: NotificationStatusEnum,
    name: 'status',
    default: NotificationStatusEnum.new,
  })
  status: NotificationStatusEnum;

  @Field(() => NotificationTypeEnum, { nullable: false })
  @Column({
    type: 'enum',
    nullable: false,
    enum: NotificationTypeEnum,
    name: 'type',
  })
  type: NotificationTypeEnum;

  @Field(() => UserModel, { nullable: false, description: 'Owner' })
  @ManyToOne(() => UserModel, (owner) => owner.id, {
    lazy: true,
    nullable: false,
    cascade: true,
  })
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner: UserModel;
  __owner__: UserModel;
}
