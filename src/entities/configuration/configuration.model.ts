import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConfigurationTypesEnum } from './configuration.enum';
import { Dates } from '@entities/embedded/date';

@ObjectType({ isAbstract: true })
@Entity('configuration')
export default class ConfigurationModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @MaxLength(100)
  @Field(() => String, { nullable: false, description: 'Value' })
  @Column({
    type: 'varchar',
    length: 100,
    name: 'value',
    default: '',
  })
  value: string;

  @Field(() => ConfigurationTypesEnum, {
    nullable: false,
    description: 'Type config',
  })
  @Column({
    type: 'enum',
    enum: ConfigurationTypesEnum,
    name: 'type',
    unique: true,
  })
  type: ConfigurationTypesEnum;
}
