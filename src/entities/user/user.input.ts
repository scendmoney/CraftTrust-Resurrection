import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { UserModel } from './user.model';
import {
  IsAscii,
  IsEmail,
  IsMobilePhone,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { passwordReg } from '@src/utils/utils';

@InputType({ description: 'Input data for update profile facility' })
export class UpdateUserDTO extends PartialType(
  PickType(UserModel, ['phoneNumber', 'fullName'], InputType),
  InputType,
) {}

@InputType()
export class UserEmailInput {
  @IsEmail()
  @Field(() => String, { nullable: false, description: 'Email user' })
  email: string;
}

@InputType()
export class UserRecoveryInput {
  @MinLength(8)
  @MaxLength(64)
  @NotContains(' ')
  @IsAscii()
  @Matches(passwordReg, { message: 'password_too_weak' })
  @Field(() => String, {
    nullable: false,
    description: `@MinLength(8), @MaxLength(64), @NotContains(" "), @IsAscii(), @Matches(${passwordReg})`,
  })
  password: string;

  @NotContains(' ')
  @Field(() => String, {
    nullable: false,
    description: 'Recovery code: @NotContains(" ")',
  })
  codeRecoveryPassword: string;
}

@InputType()
export class UserLoginInput {
  @IsEmail()
  @Field(() => String, { nullable: false, description: 'Email user' })
  email: string;

  @MinLength(8)
  @MaxLength(64)
  @NotContains(' ')
  @IsAscii()
  @Matches(passwordReg, { message: 'password_too_weak' })
  @Field(() => String, {
    nullable: false,
    description: `@MinLength(8), @MaxLength(64), @NotContains(" "), @IsAscii(), @Matches(${passwordReg})`,
  })
  password: string;
}

@InputType()
export class LoginSMSInput {
  @IsMobilePhone(
    'en-US',
    { strictMode: true },
    { message: 'Phone number is incorrect' },
  )
  @Field(() => String, { nullable: false })
  phoneNumber: string;

  @Field(() => Int, { nullable: false })
  code: number;
}
