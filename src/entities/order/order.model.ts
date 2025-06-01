import {
  ObjectType,
  Field,
  Int,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Relation,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Dates } from '@entities/embedded/date';
import { FacilityModel } from '@entities/facility/facility.model';
import {
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentTypeEnum,
  ShippingTypeEnum,
} from './order.enum';
import { UserModel } from '@entities/user/user.model';
import OrderProductModel from '@entities/order_product/order_product.model';
import TransactionModel from '@entities/transaction/transaction.model';
import { GraphQLJSONObject } from 'graphql-type-json';
import { FeeData } from '@entities/embedded/fee';
import { IsMobilePhone, IsOptional } from 'class-validator';

@Index(['facilityBuyer'])
@Index(['facilityCultivator'])
@ObjectType()
@Entity('order')
export class OrderModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => FeeData, {
    nullable: false,
    description: 'Fee',
  })
  @Column(() => FeeData, { prefix: false })
  fee: FeeData;

  @Field(() => Float, { nullable: false, description: 'total price' })
  @Column({
    type: 'numeric',
    name: 'total',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  total: number;

  @Field(() => Float, { nullable: false, description: 'total price buyer' })
  @Column({
    type: 'numeric',
    name: 'total_buyer',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  totalBuyer: number;

  @Field(() => Float, {
    nullable: false,
    description: 'total price cultivator',
  })
  @Column({
    type: 'numeric',
    name: 'total_cultivator',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  totalCultivator: number;

  @Field(() => OrderStatusEnum, {
    nullable: false,
    description: 'Order status',
  })
  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    name: 'status',
    nullable: false,
  })
  status: OrderStatusEnum;

  @Field(() => ShippingTypeEnum, {
    nullable: false,
    description: 'Shipping Type',
  })
  @Column({
    type: 'enum',
    enum: ShippingTypeEnum,
    name: 'shipping_type',
    nullable: false,
  })
  shippingType: ShippingTypeEnum;

  @Field(() => PaymentTypeEnum, {
    nullable: false,
    description: 'Payment Type',
  })
  @Column({
    type: 'enum',
    enum: PaymentTypeEnum,
    name: 'payment_type',
    nullable: false,
  })
  paymentType: PaymentTypeEnum;

  @Field(() => PaymentStatusEnum, {
    nullable: false,
    description: 'Payment Status',
  })
  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    name: 'payment_status',
    nullable: false,
    default: PaymentStatusEnum.NotPaid,
  })
  paymentStatus: PaymentStatusEnum;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Date due payment',
  })
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'payment_date',
  })
  paymentDate?: Date;

  @IsOptional()
  @IsMobilePhone(
    'en-US',
    { strictMode: true },
    { message: 'Phone number is incorrect' },
  )
  @Field(() => String, { nullable: true, description: 'Phone' })
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    name: 'phone',
  })
  phone?: string;

  @Field(() => Int, { nullable: true, description: 'Zip' })
  @Column({
    type: 'integer',
    name: 'zip',
    nullable: true,
  })
  zip?: number;

  @Field(() => String, { nullable: true, description: 'address' })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'address',
    comment: 'address',
  })
  address?: string;

  @Field(() => String, { nullable: true, description: 'city' })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'city',
  })
  city?: string;

  @Field(() => String, { nullable: true, description: 'ipfs' })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'ipfs',
  })
  ipfs?: string;

  @Field(() => String, { nullable: true, description: 'comments' })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'comments',
  })
  comments?: string;

  @Field(() => Int, { nullable: true })
  @Column({
    type: 'integer',
    nullable: true,
    name: 'verification_code',
  })
  verificationCode?: number;

  @Field(() => [OrderProductModel], { nullable: true })
  @OneToMany(() => OrderProductModel, (item) => item.order, {
    lazy: true,
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  products?: Relation<OrderProductModel[]>;
  __products__: Relation<OrderProductModel[]>;

  @Field(() => UserModel, { nullable: true })
  @ManyToOne(() => UserModel, (user) => user.id, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'contact_person_id', referencedColumnName: 'id' })
  contactPerson?: UserModel;
  __contactPerson__: UserModel;

  @Field(() => FacilityModel, { nullable: false })
  @ManyToOne(() => FacilityModel, (item) => item.id, {
    lazy: true,
    nullable: false,
    cascade: true,
  })
  @JoinColumn({ name: 'facility_buyer_id', referencedColumnName: 'id' })
  facilityBuyer: Relation<FacilityModel>;
  __facilityBuyer__: Relation<FacilityModel>;

  @Field(() => FacilityModel, { nullable: false })
  @ManyToOne(() => FacilityModel, (item) => item.id, {
    lazy: true,
    nullable: false,
    cascade: true,
  })
  @JoinColumn({ name: 'facility_cultivator_id', referencedColumnName: 'id' })
  facilityCultivator: Relation<FacilityModel>;
  __facilityCultivator__: Relation<FacilityModel>;

  @Field(() => [TransactionModel], { nullable: false })
  @OneToMany(() => TransactionModel, (item) => item.order, {
    lazy: true,
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  transactions?: Relation<TransactionModel[]>;
  __transactions__: Relation<TransactionModel[]>;

  // Resolve Fields
  @Field(() => GraphQLJSONObject, { nullable: true, description: 'nft' })
  nft?: Record<string, unknown>;

  // @HideField()
  // @Column({
  //   type: 'bool',
  //   name: 'is_cultivator_fee_paid',
  //   default: false,
  // })
  // isCultivatorFeePaid: boolean;
}
