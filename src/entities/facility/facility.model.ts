import { ObjectType, Field, HideField, Int, Float } from '@nestjs/graphql';
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { Dates } from '../embedded/date';
import { CONFIG } from '@config/index';
import { decrypt, encrypt } from '@src/utils/utils';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsMobilePhone,
} from 'class-validator';
import { License } from '@entities/embedded/license';
import { AssetModel } from '@entities/asset/asset.model';
import { FacilityType } from '@entities/embedded/facility_type';
import { UserModel } from '@entities/user/user.model';
import { FacilityRoleEnum } from './facility.enum';
import FacilityToFacilityModel from '@entities/facility_to_facility/facility_to_facility.model';
import TransactionModel from '@entities/transaction/transaction.model';
import { Social } from '@entities/embedded/social';
import { AddressData } from '@entities/embedded/address';

@Index(['id'])
@Index(['owner'])
@Index(['userContact'])
@ObjectType({ description: "Model's facility" })
@Entity('facility')
export class FacilityModel extends BaseEntity {
  static decryptMetrcApiKey(metrcApiKey: string) {
    return decrypt(metrcApiKey, CONFIG.platform.key, 'metrcApiKey');
  }

  static encryptMetrcApiKey(metrcApiKey: string) {
    return encrypt(metrcApiKey, CONFIG.platform.key, 'metrcApiKey');
  }

  @BeforeInsert()
  insertAddress() {
    if (this?.metrcApiKey) {
      this.metrcApiKey = encrypt(
        this.metrcApiKey,
        CONFIG.platform.key,
        'metrcApiKey',
      );
    }
    if (this?.publicAddress) {
      this.publicAddressDecode = this?.publicAddress;
      this.publicAddress = encrypt(
        this.publicAddress,
        CONFIG.platform.key,
        'publicAddress',
      );
    }
  }

  @BeforeUpdate()
  updateAddress() {
    if (this?.metrcApiKey) {
      this.metrcApiKey = encrypt(
        this.metrcApiKey,
        CONFIG.platform.key,
        'metrcApiKey',
      );
    }
    if (this?.publicAddress) {
      this.publicAddressDecode = this?.publicAddress;
      this.publicAddress = encrypt(
        this.publicAddress,
        CONFIG.platform.key,
        'publicAddress',
      );
    }
  }

  @AfterLoad()
  loadAddress() {
    if (this?.metrcApiKey) {
      this.metrcApiKey = FacilityModel.decryptMetrcApiKey(this.metrcApiKey);
    }
    if (this?.publicAddress) {
      this.publicAddress = decrypt(
        this.publicAddress,
        CONFIG.platform.key,
        'publicAddress',
      );

      if (!this.publicAddressDecode) {
        FacilityModel.update(this.id, {
          publicAddressDecode: this.publicAddress,
        });
      }
    }
  }

  @Field(() => String, {
    nullable: false,
    description: 'LicenseNumber',
  })
  @PrimaryColumn({
    type: 'varchar',
    length: 48,
    name: 'id',
    nullable: false,
  })
  id: string;

  @IsOptional()
  @IsMobilePhone(
    'en-US',
    { strictMode: true },
    { message: 'Phone number is incorrect' },
  )
  @Field(() => String, {
    nullable: true,
    description: 'Hedera phone number',
  })
  @Column({
    type: 'varchar',
    name: 'phone_number',
    length: 24,
    nullable: true,
  })
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  @Field(() => String, { nullable: true, description: 'Email facility' })
  @Column({
    type: 'varchar',
    name: 'email',
    length: 255,
    nullable: true,
  })
  email?: string;

  @IsOptional()
  @IsEmail()
  @Field(() => String, { nullable: true, description: 'Campaign Email' })
  @Column({
    type: 'varchar',
    name: 'campaign_email',
    length: 255,
    nullable: true,
  })
  campaignEmail?: string;

  @Field(() => Int, { nullable: false })
  @Column({ type: 'int', nullable: false })
  @Generated('increment')
  index: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => Social, {
    nullable: false,
    description: 'Socials',
  })
  @Column(() => Social, { prefix: false })
  socials: Social;

  @Field(() => String, {
    nullable: false,
    description: "Name's facility",
  })
  @Column({
    type: 'varchar',
    name: 'name',
    length: 255,
    nullable: false,
  })
  name: string;

  @Field(() => AddressData, {
    nullable: false,
    description: 'Address ',
  })
  @Column(() => AddressData, { prefix: false })
  address?: AddressData;

  @Field(() => String, {
    nullable: true,
    description: "Alias's facility",
  })
  @Column({
    type: 'varchar',
    name: 'alias',
    length: 255,
    nullable: true,
  })
  alias?: string;

  @Field(() => String, {
    nullable: false,
    description: "DisplayName's facility",
  })
  @Column({
    type: 'varchar',
    name: 'display_name',
    length: 255,
    nullable: false,
  })
  displayName: string;

  @Field(() => String, {
    nullable: true,
    description: 'Description',
  })
  @Column({
    type: 'text',
    name: 'description',
    nullable: true,
  })
  description?: string;

  @Field(() => License, {
    nullable: false,
    description: 'License data',
  })
  @Column(() => License, { prefix: false })
  license: License;

  @IsDateString()
  @Field(() => String, {
    nullable: false,
    description: "CredentialedDate's facility",
  })
  @Column({
    type: 'date',
    nullable: false,
    name: 'credentialed_date',
    default: () => 'now()',
  })
  credentialedDate: string;

  @Field(() => String, { nullable: false, description: 'User Key Metrc' })
  @Column({
    type: 'varchar',
    name: 'metrc_api_key',
    length: 128,
    default: '',
    nullable: false,
  })
  metrcApiKey: string;

  @Field(() => AssetModel, { nullable: true })
  @ManyToOne(() => AssetModel, (asset) => asset.id, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'asset_id', referencedColumnName: 'id' })
  asset?: Relation<AssetModel>;
  __asset__: Relation<AssetModel>;

  @Field(() => String, {
    nullable: true,
    description: 'HireDate flag facilityType',
  })
  @Column({
    type: 'varchar',
    name: 'hire_date',
    length: 24,
    nullable: true,
  })
  hireDate?: string;

  @Field(() => Boolean, { nullable: false })
  @Column({
    type: 'bool',
    name: 'is_online',
    default: false,
  })
  isOnline: boolean;

  @Field(() => Boolean, { nullable: false })
  @Column({
    type: 'bool',
    name: 'is_chat_message',
    default: false,
  })
  isChatMessage: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'IsOwner flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'is_owner',
    default: false,
    nullable: false,
  })
  isOwner: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'IsManager flag facilityType',
  })
  @Column({
    type: 'boolean',
    name: 'is_manager',
    default: false,
    nullable: false,
  })
  isManager: boolean;

  @Field(() => FacilityType, {
    nullable: true,
    description: 'facilityType data',
  })
  @Column(() => FacilityType, { prefix: false })
  facilityType?: FacilityType;

  @HideField()
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'products_sync_date',
  })
  productsSyncDate?: Date;

  @Field(() => Number, {
    nullable: false,
    description: 'Quantity Active Employee',
  })
  @Column({
    type: 'int',
    name: 'quantity_active_employee',
    default: 0,
  })
  quantityActiveEmployee: number;

  @Field(() => Number, {
    nullable: false,
    description: 'all quantity employee',
  })
  @Column({
    type: 'int',
    name: 'quantity_employee',
    default: 0,
  })
  quantityEmployee: number;

  @Field(() => String, {
    nullable: true,
    description: 'Hedera public address',
  })
  @Column({
    type: 'varchar',
    name: 'public_address',
    length: 128,
    nullable: true,
  })
  publicAddress?: string;

  @Field(() => Float, {
    nullable: false,
    description: 'balance',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'balance',
    default: 0,
  })
  balance: number;

  @Field(() => Float, {
    nullable: false,
    description: 'balance Processing withdraw',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'balance_processing_withdraw',
    default: 0,
  })
  balanceProcessingWithdraw: number;

  // Todo: remove in prod
  @HideField()
  @Column({
    type: 'varchar',
    name: 'public_address_decode',
    length: 128,
    nullable: true,
  })
  publicAddressDecode?: string;

  @Field(() => [FacilityToFacilityModel], { nullable: true })
  @OneToMany(() => FacilityToFacilityModel, (item) => item.facilityCultivator, {
    lazy: true,
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  facilityBuyerRelations?: Relation<FacilityToFacilityModel[]>;
  __facilityBuyerRelations__?: Relation<FacilityToFacilityModel[]>;

  @Field(() => [FacilityToFacilityModel], { nullable: true })
  @OneToMany(() => FacilityToFacilityModel, (item) => item.facilityBuyer, {
    lazy: true,
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  facilityCultivatorRelations?: Relation<FacilityToFacilityModel[]>;
  __facilityCultivatorRelations__?: Relation<FacilityToFacilityModel[]>;

  @Field(() => [TransactionModel], { nullable: true })
  @OneToMany(() => TransactionModel, (item) => item.facilityFrom, {
    lazy: true,
    nullable: true,
  })
  transactionsFrom?: Relation<TransactionModel[]>;
  __transactionsFrom__?: Relation<TransactionModel[]>;

  @Field(() => [TransactionModel], { nullable: true })
  @OneToMany(() => TransactionModel, (item) => item.facilityTo, {
    lazy: true,
    nullable: true,
  })
  transactionsTo?: Relation<TransactionModel[]>;
  __transactionsTo__?: Relation<TransactionModel[]>;

  @Field(() => [UserModel], { nullable: false })
  @ManyToMany(() => UserModel, (user) => user.userToFacilities, {
    lazy: true,
    nullable: false,
  })
  users: Relation<UserModel[]>;
  __users__: Relation<UserModel[]>;

  @Field(() => UserModel, { nullable: true, description: 'Owner' })
  @ManyToOne(() => UserModel, (owner) => owner.id, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner?: UserModel;
  __owner__: UserModel;

  @Field(() => FacilityRoleEnum, {
    nullable: false,
    description: 'Role user: buyer|cultivator',
  })
  @Column({
    type: 'enum',
    enum: FacilityRoleEnum,
    name: 'role',
    nullable: false,
    default: FacilityRoleEnum.buyer,
  })
  role: FacilityRoleEnum;

  @Field(() => UserModel, { nullable: true })
  @ManyToOne(() => UserModel, (user) => user.id, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'user_contact_id', referencedColumnName: 'id' })
  userContact?: UserModel;
  __userContact__: UserModel;

  @HideField()
  @Column({
    type: 'bool',
    name: 'is_activated_sync_job',
    default: true,
  })
  isActivatedSyncJob: boolean;
}
