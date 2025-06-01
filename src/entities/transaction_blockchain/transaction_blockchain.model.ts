import { Dates } from '@entities/embedded/date';
import { OrderModel } from '@entities/order/order.model';
import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Min } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionBlockchainStatusEnum } from './transaction_blockchain.enum';
import TransactionModel from '@entities/transaction/transaction.model';

@ObjectType()
@Entity('transaction_blockchain')
export default class TransactionBlockchainModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => TransactionBlockchainStatusEnum, {
    nullable: false,
    description: 'status',
  })
  @Column({
    type: 'enum',
    enum: TransactionBlockchainStatusEnum,
    name: 'status',
  })
  status: TransactionBlockchainStatusEnum;

  @Min(0)
  @Field(() => Number, { nullable: false, description: 'gasLimit' })
  @Column({
    type: 'int',
    nullable: false,
    name: 'gas_limit',
    default: 0,
  })
  gasLimit: number;

  @Min(0)
  @Field(() => Number, { nullable: false, description: 'gasUsed' })
  @Column({
    type: 'int',
    nullable: false,
    name: 'gas_used',
    default: 0,
  })
  gasUsed: number;

  @Field(() => Number, { nullable: false, description: 'fee hbar' })
  @Column({
    type: 'numeric',
    nullable: false,
    name: 'fee_hbar',
    default: 0,
    scale: 10,
    precision: 20,
  })
  feeHbar: number;

  @Field(() => Number, { nullable: false, description: 'fee' })
  @Column({
    type: 'numeric',
    nullable: false,
    name: 'fee',
    default: 0,
    scale: 10,
    precision: 20,
  })
  fee: number;

  @Field(() => String, { nullable: true, description: 'Transaction id' })
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    name: 'transaction_blockchain_id',
  })
  transactionBlockchainId?: string;

  @Field(() => OrderModel, { nullable: true, description: 'order' })
  @ManyToOne(() => OrderModel, (item) => item.id, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order?: OrderModel;
  __order__: OrderModel;

  @Field(() => TransactionModel, { nullable: true })
  @ManyToOne(() => TransactionModel, (item) => item.id, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  transaction?: TransactionModel;
  __transaction__: TransactionModel;

  @HideField()
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'error',
  })
  error?: string;

  @HideField()
  @Column({
    type: 'int',
    nullable: true,
    name: 'error_code',
  })
  errorCode?: number;

  // Resolve Fields

  @Field(() => String, { nullable: false })
  url: string;
}
