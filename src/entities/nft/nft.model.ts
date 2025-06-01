import { Dates } from '@entities/embedded/date';
import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import TransactionBlockchainModel from '@entities/transaction_blockchain/transaction_blockchain.model';
import { UserModel } from '@entities/user/user.model';
import { SurveyModel } from '@entities/survey/survey.model';
import { IsEnum } from 'class-validator';
import { NFTStatusEnum, NFTTypeEnum } from './nft.enum';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
@Entity('nft')
export default class NFTModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => String, { nullable: true, description: 'Name' })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'name',
  })
  name?: string;

  @Field(() => String, { nullable: true, description: 'Description' })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'description',
  })
  description?: string;

  @IsEnum(NFTTypeEnum)
  @Field(() => NFTTypeEnum, {
    nullable: false,
  })
  @Column({
    type: 'enum',
    enum: NFTTypeEnum,
    name: 'primary_purpose',
    default: NFTTypeEnum.other,
  })
  type: NFTTypeEnum;

  @IsEnum(NFTStatusEnum)
  @Field(() => NFTStatusEnum, {
    nullable: false,
  })
  @Column({
    type: 'enum',
    enum: NFTStatusEnum,
    name: 'status',
    default: NFTStatusEnum.processing,
  })
  status: NFTStatusEnum;

  @Field(() => String, { nullable: true, description: 'logo URL' })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'logo_url',
  })
  logoURL?: string;

  @Field(() => GraphQLJSONObject, { nullable: false })
  @Column({
    type: 'json',
    nullable: false,
    name: 'properties',
    default: {},
  })
  properties: Record<string, unknown>;

  @Field(() => String, { nullable: true, description: 'ipfs' })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'ipfs',
  })
  ipfs?: string;

  @Field(() => String, { nullable: true, description: 'token id' })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'token_id',
  })
  tokenId?: string;

  @Field(() => Int, { nullable: true, description: 'serial' })
  @Column({
    type: 'integer',
    nullable: true,
    name: 'serial',
  })
  serial?: number;

  @Field(() => SurveyModel, { nullable: true, description: 'survey' })
  @OneToOne(() => SurveyModel, (item) => item.id, {
    onDelete: 'NO ACTION',
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'survey_id', referencedColumnName: 'id' })
  survey?: Relation<SurveyModel>;
  __survey__: Relation<SurveyModel>;

  @Field(() => TransactionBlockchainModel, {
    nullable: true,
  })
  @ManyToOne(() => TransactionBlockchainModel, (item) => item.id, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'blockchain_transaction_id', referencedColumnName: 'id' })
  blockchainTransaction?: Relation<TransactionBlockchainModel>;
  __blockchainTransaction__: Relation<TransactionBlockchainModel>;

  @Field(() => UserModel, { nullable: true, description: 'client' })
  @ManyToOne(() => UserModel, (item) => item.id, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: Relation<UserModel>;
  __user__: Relation<UserModel>;

  @HideField()
  @Column({
    type: 'integer',
    name: 'count_error',
    default: 0,
  })
  countError: number;
}
