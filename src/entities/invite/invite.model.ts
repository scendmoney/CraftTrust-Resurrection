import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Relation,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Dates } from '@entities/embedded/date';
import { FacilityModel } from '@entities/facility/facility.model';
import { InviteStatusEnum, InviteTypeEnum } from './invite.enum';
import { UserModel } from '@entities/user/user.model';
import { IsMobilePhone } from 'class-validator';

@ObjectType()
@Entity('invite')
export class InviteModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => String, {
    nullable: false,
    description: 'name',
  })
  @Column({
    type: 'varchar',
    name: 'name',
    length: 255,
    nullable: false,
    default: '',
  })
  name: string;

  @Field(() => InviteTypeEnum, { nullable: false })
  @Column({
    type: 'enum',
    enum: InviteTypeEnum,
    name: 'type',
  })
  type: InviteTypeEnum;

  @Field(() => InviteStatusEnum, {
    nullable: false,
    description: 'Invite Status',
  })
  @Column({
    type: 'enum',
    enum: InviteStatusEnum,
    name: 'status',
    default: InviteStatusEnum.processing,
  })
  status: InviteStatusEnum;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    name: 'code',
    length: 20,
    nullable: true,
  })
  code?: string;

  @Field(() => FacilityModel, { nullable: true })
  @ManyToOne(() => FacilityModel, (item) => item.id, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'facility_id', referencedColumnName: 'id' })
  facility?: Relation<FacilityModel>;
  __facility__: Relation<FacilityModel>;

  @Field(() => FacilityModel, { nullable: true })
  @ManyToOne(() => FacilityModel, (item) => item.id, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'relation_facility_id', referencedColumnName: 'id' })
  relationFacility?: Relation<FacilityModel>;
  __relationFacility__: Relation<FacilityModel>;

  @Field(() => UserModel, { nullable: true })
  @ManyToOne(() => UserModel, (item) => item.id, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'id' })
  employee?: Relation<UserModel>;
  __employee__: Relation<UserModel>;

  @IsMobilePhone(
    'en-US',
    { strictMode: true },
    { message: 'Phone number is incorrect' },
  )
  @Field(() => String, {
    nullable: false,
    description: 'Phone number',
  })
  @Column({
    type: 'varchar',
    name: 'phone',
    length: 24,
    nullable: false,
  })
  phone: string;

  @Field(() => UserModel, { nullable: false })
  @ManyToOne(() => UserModel, (item) => item.id, {
    lazy: true,
    nullable: false,
    cascade: true,
  })
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner: Relation<UserModel>;
  __owner__: Relation<UserModel>;
}
