import { Field, InputType } from '@nestjs/graphql';
import { passwordReg } from '@src/utils/utils';
import {
  IsAscii,
  IsEmail,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';

@InputType({ description: 'Check Employee account' })
export class SignUpEmployeeInput {
  @Field(() => String, { nullable: false, description: 'Code' })
  code: string;

  @Field(() => String, {
    nullable: false,
    description: 'User licenseNumber Employee',
  })
  licenseNumberEmployee: string;

  @IsEmail()
  @Field(() => String, { nullable: false, description: 'Email' })
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

  @Field(() => String, { nullable: true, description: 'Full name' })
  fullName?: string;
}
