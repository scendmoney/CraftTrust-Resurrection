import {
  ObjectType,
  Field,
  GraphQLISODateTime,
  HideField,
  Int,
} from '@nestjs/graphql';
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Relation,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Index,
  Generated,
} from 'typeorm';
import { Dates } from '../embedded/date';
import { CONFIG } from '@config/index';
import { decrypt, encrypt } from '@src/utils/utils';
import { UserRoleEnum } from './user.enum';
import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator';
import ErrorMsgEnum from '@enums/error';
import { License } from '@entities/embedded/license';
import { AssetModel } from '@entities/asset/asset.model';
import { FacilityModel } from '@entities/facility/facility.model';
import { AdminData } from '@entities/embedded/admin_data';
import { PasswordEmbedded } from './embedded/password.embedded';
import crypto from 'crypto';
import { IndexUniqueEnum } from '@enums/common';

@Index(['id'])
@Index(['context'])
@Index(IndexUniqueEnum.IDX_USER_EMAIL_UNIQUE, ['email'], {
  unique: true,
  where: 'email IS NOT NULL',
})
@Index(IndexUniqueEnum.IDX_USER_PHONE_NUMBER_UNIQUE, ['phoneNumber'], {
  unique: true,
  where: 'phone_number IS NOT NULL',
})
@ObjectType({ description: 'Model User' })
@Entity('user')
export class UserModel extends BaseEntity {
  @BeforeInsert()
  insertAddress() {
    if (this?.publicAddress) {
      this.publicAddressDecode = this?.publicAddress;
      this.publicAddress = encrypt(
        this.publicAddress,
        CONFIG.platform.key,
        'publicAddress',
      );
    }
    this.email && (this.email = this.email.toLowerCase());
    this.issuer = crypto.randomBytes(64).toString('hex');
  }

  @BeforeUpdate()
  updateAddress() {
    if (this?.publicAddress) {
      this.publicAddressDecode = this?.publicAddress;
      this.publicAddress = encrypt(
        this.publicAddress,
        CONFIG.platform.key,
        'publicAddress',
      );
    }
    this.email && (this.email = this.email.toLowerCase());
  }

  @AfterLoad()
  loadAddress() {
    if (this?.publicAddress) {
      this.publicAddress = decrypt(
        this.publicAddress,
        CONFIG.platform.key,
        'publicAddress',
      );

      if (!this.publicAddressDecode) {
        UserModel.update(this.id, {
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

  @Field(() => Int, { nullable: false })
  @Column({ type: 'int', nullable: false })
  @Generated('increment')
  index: number;

  @Field(() => String, {
    nullable: false,
    description: 'nickname user',
  })
  @Column({
    type: 'varchar',
    name: 'fullname',
    length: 255,
    nullable: false,
  })
  fullName: string;

  @IsEmail()
  @Field(() => String, { nullable: true, description: 'Email user' })
  @Column({
    type: 'varchar',
    name: 'email',
    length: 255,
    nullable: true,
  })
  email?: string;

  @Field(() => Dates, {
    nullable: false,
    description: 'Date create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Join Date',
  })
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'join_date',
  })
  joinDate?: Date;

  @Field(() => License, {
    nullable: true,
    description: 'License data',
  })
  @Column(() => License, { prefix: false })
  license?: License;

  @Field(() => Boolean, {
    nullable: false,
    description: 'is blocked user',
  })
  @Column({
    type: 'bool',
    name: 'is_blocked',
    default: false,
    nullable: false,
  })
  isBlocked: boolean;

  @Field(() => Boolean, { nullable: false, description: 'KYC status' })
  @Column({
    type: 'bool',
    name: 'is_kyc',
    default: false,
    nullable: false,
  })
  isKyc: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'Hedera issuer (did token)',
  })
  @Column({
    type: 'varchar',
    name: 'issuer',
    length: 128,
    nullable: true,
  })
  issuer?: string;

  @IsOptional()
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
    name: 'phone_number',
    length: 24,
    nullable: true,
  })
  phoneNumber?: string;

  @Field(() => UserRoleEnum, {
    nullable: false,
    description: 'Role user: user|admin|owner',
  })
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    name: 'role',
    nullable: false,
    default: UserRoleEnum.user,
  })
  role: UserRoleEnum;

  @Field(() => AdminData, {
    nullable: false,
  })
  @Column(() => AdminData, { prefix: false })
  adminData: AdminData;

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

  // Todo: remove in prod
  @HideField()
  @Column({
    type: 'varchar',
    name: 'public_address_decode',
    length: 128,
    nullable: true,
  })
  publicAddressDecode?: string;

  @Field(() => FacilityModel, {
    nullable: true,
    description: 'Context',
  })
  @ManyToOne(() => FacilityModel, (item) => item.id, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'context_id', referencedColumnName: 'id' })
  context?: Relation<FacilityModel>;
  __context__: Relation<FacilityModel>;

  @Field(() => [FacilityModel], { nullable: false })
  @ManyToMany(() => FacilityModel, (facility) => facility.users, {
    lazy: true,
    cascade: true,
    nullable: false,
  })
  @JoinTable({
    name: 'user_to_facilities',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'facility_id',
      referencedColumnName: 'id',
    },
  })
  userToFacilities: Relation<FacilityModel[]>;
  __userToFacilities__: Relation<FacilityModel[]>;

  @Field(() => ErrorMsgEnum, {
    nullable: true,
    description: 'ErrorMsgEnum errors',
  })
  errors: ErrorMsgEnum;

  @Field(() => AssetModel, { nullable: true })
  @ManyToOne(() => AssetModel, (asset) => asset.id, {
    lazy: true,
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'asset_id', referencedColumnName: 'id' })
  asset?: Relation<AssetModel>;

  @Field(() => PasswordEmbedded, {
    nullable: true,
  })
  @Column(() => PasswordEmbedded, { prefix: false })
  passwordData?: PasswordEmbedded;
}
