import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Dates } from '@entities/embedded/date';
import {
  RequestFacilityRoleEnum,
  RequestStatusEnum,
  RequestTypeEnum,
} from './request.enum';
import { IsEmail, IsOptional, IsMobilePhone } from 'class-validator';
import { UserModel } from '@entities/user/user.model';

@ObjectType()
@Entity('request')
export class RequestModel extends BaseEntity {
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

  @Field(() => String, {
    nullable: false,
    description: 'Company Name',
  })
  @Column({
    type: 'varchar',
    name: 'company_name',
    length: 255,
    nullable: false,
    default: '',
  })
  companyName: string;

  @Field(() => String, {
    nullable: true,
    description: 'message',
  })
  @Column({
    type: 'varchar',
    name: 'message',
    nullable: true,
    default: '',
  })
  message?: string;

  @IsMobilePhone(
    'en-US',
    { strictMode: true },
    { message: 'Phone number is incorrect' },
  )
  @Field(() => String, {
    nullable: true,
    description: 'Phone number',
  })
  @Column({
    type: 'varchar',
    name: 'phone',
    length: 24,
    nullable: true,
  })
  phone?: string;

  @IsOptional()
  @IsEmail()
  @Field(() => String, { nullable: true, description: 'Email' })
  @Column({
    type: 'varchar',
    name: 'email',
    length: 255,
    nullable: true,
  })
  email?: string;

  @Field(() => String, {
    nullable: true,
    description: "LicenseNumber's facility",
  })
  @Column({
    type: 'varchar',
    name: 'license_number',
    length: 48,
    nullable: true,
  })
  licenseNumber?: string;

  @Field(() => RequestTypeEnum, { nullable: false })
  @Column({
    type: 'enum',
    enum: RequestTypeEnum,
    name: 'type',
  })
  type: RequestTypeEnum;

  @Field(() => RequestFacilityRoleEnum, {
    nullable: true,
    description: 'Facility role',
  })
  @Column({
    type: 'enum',
    enum: RequestFacilityRoleEnum,
    name: 'facility_role',
    nullable: true,
  })
  facilityRole?: RequestFacilityRoleEnum;

  @Field(() => RequestStatusEnum, {
    nullable: false,
    description: 'Request Status',
  })
  @Column({
    type: 'enum',
    enum: RequestStatusEnum,
    name: 'status',
    default: RequestStatusEnum.new,
  })
  status: RequestStatusEnum;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Request activated?',
  })
  @Column({
    type: 'bool',
    name: 'is_activated',
    default: false,
  })
  isActivated: boolean;

  @HideField()
  @Column({
    type: 'varchar',
    name: 'code',
    length: 20,
    nullable: true,
  })
  code?: string;

  @Field(() => String, {
    nullable: true,
    description: 'message reject',
  })
  @Column({
    type: 'varchar',
    name: 'message_reject',
    nullable: true,
  })
  messageReject?: string;

  @Field(() => UserModel, { nullable: true, description: 'admin' })
  @ManyToOne(() => UserModel, (admin) => admin.id, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'admin_id', referencedColumnName: 'id' })
  admin?: UserModel;
  __admin__: UserModel;
}
