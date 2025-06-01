import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true, description: 'Address data' })
export class AddressData {
  @Field(() => String, {
    nullable: true,
    description: 'Full Address',
  })
  @Column({
    type: 'varchar',
    name: 'full_address',
    length: 255,
    nullable: true,
  })
  fullAddress?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Country',
  })
  @Column({
    type: 'varchar',
    name: 'country',
    length: 255,
    nullable: true,
  })
  country?: string;

  @Field(() => String, {
    nullable: true,
    description: 'City',
  })
  @Column({
    type: 'varchar',
    name: 'city',
    length: 255,
    nullable: true,
  })
  city?: string;

  @Field(() => String, {
    nullable: true,
    description: 'zip',
  })
  @Column({
    type: 'integer',
    name: 'zip',
    nullable: true,
  })
  zip?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Address',
  })
  @Column({
    type: 'varchar',
    name: 'address',
    length: 255,
    nullable: true,
  })
  address?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Google Place Id',
  })
  @Column({
    type: 'varchar',
    name: 'google_place_id',
    length: 255,
    nullable: true,
  })
  googlePlaceId?: string;
}
