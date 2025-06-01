import { Field, ObjectType } from '@nestjs/graphql';
import { IsDateString } from 'class-validator';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true, description: 'License' })
export class License {
  @Field(() => String, {
    nullable: false,
    description: "LicenseNumber's facility",
  })
  @Column({
    type: 'varchar',
    name: 'license_number',
    length: 48,
    nullable: false,
  })
  licenseNumber: string;

  @IsDateString()
  @Field(() => String, {
    nullable: true,
    description: "LicenseStartDate's facility",
  })
  @Column({
    type: 'date',
    nullable: true,
    name: 'license_start_date',
    default: () => 'now()',
  })
  licenseStartDate?: string;

  @IsDateString()
  @Field(() => String, {
    nullable: true,
    description: "LicenseEndDate's facility",
  })
  @Column({
    type: 'date',
    nullable: true,
    name: 'license_end_date',
    default: () => 'now()',
  })
  licenseEndDate?: string;

  @Field(() => String, {
    nullable: false,
    description: "LicenseType's facility",
  })
  @Column({
    type: 'varchar',
    name: 'license_type',
    length: 64,
    nullable: false,
  })
  licenseType: string;

  @Field(() => Boolean, { nullable: false })
  @Column({
    type: 'bool',
    name: 'is_license_active',
    default: false,
  })
  isLicenseActive: boolean;
}
