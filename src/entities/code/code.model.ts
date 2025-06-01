import { Dates } from '@entities/embedded/date';
import { UserModel } from '@entities/user/user.model';
import {
  ObjectType,
  Field,
  Int,
  GraphQLISODateTime,
  HideField,
} from '@nestjs/graphql';
import { IsMobilePhone, IsOptional } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType({ isAbstract: true })
@Entity('code')
export default class CodeModel extends BaseEntity {
  @Field(() => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dates, {
    nullable: false,
    description: 'Dates create/update',
  })
  @Column(() => Dates, { prefix: false })
  dates: Dates;

  @Field(() => Int, {
    nullable: false,
  })
  @Column({
    type: 'integer',
    name: 'generate_code_count',
    default: 0,
  })
  generateCodeCount: number;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
  })
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'attempt_date',
  })
  attemptDate?: Date;

  @IsOptional()
  @IsMobilePhone(
    'en-US',
    { strictMode: true },
    { message: 'Phone number is incorrect' },
  )
  @Field(() => String, {
    nullable: true,
  })
  @Column({
    type: 'varchar',
    name: 'phone',
    length: 24,
    nullable: true,
  })
  phone?: string;

  @Field(() => UserModel, { nullable: true })
  @OneToOne(() => UserModel, (user) => user.id, { lazy: true, nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserModel;

  @HideField()
  @Column({
    type: 'integer',
    nullable: true,
    name: 'code',
  })
  code: number;

  @HideField()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'ip_address',
    default: '',
  })
  ipAddress: string;
}
