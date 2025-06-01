import {
  Field,
  GraphQLISODateTime,
  HideField,
  ObjectType,
} from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType({ description: 'Password' })
export class PasswordEmbedded {
  @Field(() => Boolean, {
    nullable: false,
    description: 'Has your password been recovered?',
  })
  @Column({
    type: 'bool',
    name: 'is_recovery_password',
    default: false,
    nullable: false,
  })
  isRecoveryPassword: boolean;

  @HideField()
  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'code_recovery_password',
  })
  codeRecoveryPassword?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Reinstatement request date',
  })
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'date_recovery_password',
  })
  dateRecoveryRequest?: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Date of successful recovery',
  })
  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'date_recovery_done',
  })
  dateRecoveryDone?: Date;

  @HideField()
  @Column({
    type: 'varchar',
    length: 250,
    name: 'password',
    nullable: true,
  })
  password?: string;

  @HideField()
  @Column({
    type: 'varchar',
    name: 'salt',
    length: 255,
    default: null,
    nullable: true,
  })
  salt?: string;
}
