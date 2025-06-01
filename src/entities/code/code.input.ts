import { Field, InputType } from '@nestjs/graphql';
import { IsMobilePhone } from 'class-validator';

@InputType()
export class GenerateCodeSMSInput {
  @IsMobilePhone(
    'en-US',
    { strictMode: true },
    { message: 'Phone number is incorrect' },
  )
  @Field(() => String, { nullable: false })
  phone: string;
}
