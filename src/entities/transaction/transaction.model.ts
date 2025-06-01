import { Dates } from '@entities/embedded/date';
import { OrderModel } from '@entities/order/order.model';
import { ObjectType, Field, Int, Float, HideField } from '@nestjs/graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import {
  DiamondstandardStatusEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from './transaction.enum';
import { FacilityModel } from '@entities/facility/facility.model';
import TransactionBlockchainModel from '@entities/transaction_blockchain/transaction_blockchain.model';
import { v4 as uuidv4 } from 'uuid';
import { CardInfo } from './embedded/card_info';
import { FeeData } from '@entities/embedded/fee';

@Index(['facilityFrom'])
@Index(['facilityTo'])
@ObjectType()
@Entity('transaction')
export default class TransactionModel extends BaseEntity {
  @BeforeInsert()
  insertAddress() {
    this.uuid = uuidv4();
  }

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

  @Field(() => CardInfo, {
    nullable: true,
    description: 'Card Info',
  })
  @Column(() => CardInfo, { prefix: false })
  cardInfo?: CardInfo;

  @Field(() => TransactionStatusEnum, {
    nullable: false,
    description: 'status',
  })
  @Column({
    type: 'enum',
    enum: TransactionStatusEnum,
    name: 'status',
  })
  status: TransactionStatusEnum;

  @Field(() => TransactionTypeEnum, {
    nullable: false,
    description: 'type',
  })
  @Column({
    type: 'enum',
    enum: TransactionTypeEnum,
    name: 'type',
  })
  type: TransactionTypeEnum;

  @Field(() => DiamondstandardStatusEnum, {
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: DiamondstandardStatusEnum,
    name: 'diamondstandard_status',
    nullable: true,
  })
  diamondstandardStatus?: DiamondstandardStatusEnum;

  @Field(() => Float, {
    nullable: false,
    description: 'Amount',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'amount',
    default: 0,
  })
  amount: number;

  @Field(() => Float, {
    nullable: false,
    description: 'price in USD',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'amount_usd',
    default: 0,
  })
  amountUsd: number;

  @Field(() => Float, {
    nullable: false,
    description: 'Token exchange rate in USD',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'token_rate',
    default: 0,
  })
  tokenRate: number;

  @Field(() => Float, {
    nullable: false,
    description: 'Amount token out',
  })
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 8,
    name: 'amount_out',
    default: 0,
  })
  amountOut: number;

  @Field(() => Float, {
    nullable: false,
    description: 'token swap in',
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'token',
    default: '',
  })
  token: string;

  @Field(() => Float, {
    nullable: false,
    description: 'token swap out',
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'token_out',
    default: '',
  })
  tokenOut: string;

  @Field(() => String, { nullable: false })
  @Column({
    type: 'varchar',
    name: 'uuid',
    length: 50,
    nullable: false,
    default: '',
  })
  uuid: string;

  @Field(() => String, { nullable: false })
  @Column({
    type: 'varchar',
    name: 'diamondstandard_sell_reference',
    length: 50,
    nullable: false,
    default: '',
  })
  diamondstandardSellReference: string;

  @Field(() => Int, {
    nullable: false,
  })
  @Column({
    type: 'integer',
    name: 'diamondstandard_request_id',
    default: 0,
  })
  diamondstandardRequestId: number;

  @Field(() => String, { nullable: true, description: 'error' })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'error',
  })
  error?: string;

  @Field(() => OrderModel, { nullable: true, description: 'order' })
  @ManyToOne(() => OrderModel, (item) => item.id, {
    lazy: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order?: OrderModel;
  __order__: OrderModel;

  @Field(() => FacilityModel, { nullable: true })
  @ManyToOne(() => FacilityModel, (item) => item.transactionsFrom, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'facility_from', referencedColumnName: 'id' })
  facilityFrom?: FacilityModel;
  __facilityFrom__: FacilityModel;

  @Field(() => FacilityModel, { nullable: true })
  @ManyToOne(() => FacilityModel, (item) => item.transactionsTo, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'facility_to', referencedColumnName: 'id' })
  facilityTo?: FacilityModel;
  __facilityTo__: FacilityModel;

  @Field(() => [TransactionBlockchainModel], { nullable: false })
  @OneToMany(() => TransactionBlockchainModel, (item) => item.transaction, {
    lazy: true,
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  blockchainTransactions: Relation<TransactionBlockchainModel[]>;
  __blockchainTransactions__: Relation<TransactionBlockchainModel[]>;

  @HideField()
  @Column({
    type: 'bool',
    name: 'is_cripto_transfer',
    default: false,
  })
  isCriptoTransfer: boolean;
}
