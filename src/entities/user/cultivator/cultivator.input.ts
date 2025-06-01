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

@InputType({ description: 'Check facility account' })
export class SignUpCultivatorDTO {
  @Field(() => String, {
    nullable: false,
    description: 'User licenseNumber Facility',
  })
  licenseNumberFacility: string;

  @Field(() => String, { nullable: false, description: 'User Key Metrc' })
  metrcApiKey: string;

  @Field(() => String, { nullable: false, description: 'Join Code' })
  code: string;

  @Field(() => String, {
    nullable: false,
    description: 'User licenseNumber Employee',
  })
  licenseNumberEmployee: string;

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

@InputType({ description: 'User sign up' })
export class DeprecatedSyncFacilityInput {
  @Field(() => String, {
    nullable: false,
    description: 'User licenseNumber Facility',
  })
  licenseNumberFacility: string;
}
