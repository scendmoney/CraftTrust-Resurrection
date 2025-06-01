import { Field, ObjectType } from '@nestjs/graphql';
import { IsDateString } from 'class-validator';
import { Column } from 'typeorm';

@ObjectType({ isAbstract: true, description: 'Card Info' })
export class CardInfo {
  @Field(() => String, {
    nullable: true,
    description: 'Issuer',
  })
  @Column({
    type: 'varchar',
    name: 'issuer',
    length: 155,
    nullable: true,
  })
  issuer?: string;

  @IsDateString()
  @Field(() => String, {
    nullable: true,
    description: 'country',
  })
  @Column({
    type: 'varchar',
    name: 'country',
    length: 50,
    nullable: true,
  })
  country?: string;

  @IsDateString()
  @Field(() => String, {
    nullable: true,
    description: 'card last4',
  })
  @Column({
    type: 'varchar',
    name: 'last4',
    length: 4,
    nullable: true,
  })
  last4?: string;

  @Field(() => String, {
    nullable: true,
    description: 'scheme (Visa ...)',
  })
  @Column({
    type: 'varchar',
    name: 'scheme',
    length: 15,
    nullable: true,
  })
  scheme?: string;
}
