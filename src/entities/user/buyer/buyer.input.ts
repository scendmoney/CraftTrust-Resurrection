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

@InputType({ description: 'Sign up buyer' })
export class SignUpBuyerInput {
  @Field(() => String, { nullable: false, description: 'Relation code' })
  code: string;

  @Field(() => String, {
    nullable: false,
    description: 'User licenseNumber Facility',
  })
  licenseNumberFacility: string;

  @Field(() => String, {
    nullable: false,
    description: 'User licenseNumber Employee',
  })
  licenseNumberEmployee: string;

  @Field(() => String, { nullable: true, description: 'User Key Metrc' })
  metrcApiKey?: string;

  @Field(() => String, { nullable: true, description: 'Facility display name' })
  displayName?: string;

  @Field(() => String, { nullable: true, description: 'Owner full name' })
  fullName?: string;

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
