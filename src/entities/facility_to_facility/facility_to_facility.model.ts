import { Dates } from '@entities/embedded/date';
import { FacilityModel } from '@entities/facility/facility.model';
import {
  ObjectType,
  Field,
  Int,
  GraphQLISODateTime,
  Float,
} from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  BaseEntity,
} from 'typeorm';

@ObjectType({ isAbstract: true })
@Entity('facility_to_facility')
export default class FacilityToFacilityModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => Number, { nullable: false, description: 'total orders' })
  @Column({
    type: 'int',
    name: 'total',
    default: 0,
  })
  totalOrders: number;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Last order date',
  })
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'last_order_date',
  })
  lastOrderDate?: Date;

  @Field(() => Float, { nullable: false, description: 'order total spend' })
  @Column({
    type: 'numeric',
    name: 'order_total_spend',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  orderTotalSpend: number;

  @Field(() => Float, { nullable: false, description: 'avg purchase' })
  @Column({
    type: 'numeric',
    name: 'avg_purchase',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  avgPurchase: number;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Net activated?',
  })
  @Column({
    type: 'bool',
    name: 'is_net_activated',
    default: false,
  })
  isNetActivated: boolean;

  @Field(() => Number, { nullable: false, description: 'net days' })
  @Column({
    type: 'int',
    name: 'net_days',
    default: 0,
  })
  netDays: number;

  @Field(() => Number, { nullable: false, description: 'net balance' })
  @Column({
    type: 'int',
    name: 'net_balance',
    default: 0,
  })
  netBalance: number;

  @Field(() => Number, { nullable: false, description: 'due balance' })
  @Column({
    type: 'numeric',
    name: 'due_balance',
    default: 0,
    scale: 2,
    precision: 10,
    nullable: false,
  })
  dueBalance: number;

  @Field(() => String, { nullable: true, description: 'Chat sid (twilio)' })
  @Column({
    type: 'varchar',
    name: 'chat_sid',
    comment: 'Chat sid (twilio)',
    nullable: true,
    length: 255,
  })
  chatSid?: string;

  @Field(() => Boolean, { nullable: false })
  @Column({
    type: 'bool',
    name: 'is_message_buyer',
    default: false,
  })
  isMessageBuyer: boolean;

  @Field(() => Boolean, { nullable: false })
  @Column({
    type: 'bool',
    name: 'is_message_cultivator',
    default: false,
  })
  isMessageCultivator: boolean;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Date Message Buyer',
  })
  @Column({
    type: 'timestamptz',
    name: 'date_message_buyer',
    nullable: true,
  })
  dateMessageBuyer?: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Date Message Cultivator',
  })
  @Column({
    type: 'timestamptz',
    name: 'date_message_cultivator',
    nullable: true,
  })
  dateMessageCultivator?: Date;

  @Field(() => FacilityModel, { nullable: false, description: 'Cultivator' })
  @ManyToOne(() => FacilityModel, (item) => item.id, {
    lazy: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'facility_id', referencedColumnName: 'id' })
  facilityCultivator: FacilityModel;
  __facilityCultivator__: FacilityModel;

  @Field(() => FacilityModel, { nullable: false, description: 'Buyer' })
  @ManyToOne(() => FacilityModel, (item) => item.id, {
    lazy: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'facility_rel_id', referencedColumnName: 'id' })
  facilityBuyer: FacilityModel;
  __facilityBuyer__: FacilityModel;
}
