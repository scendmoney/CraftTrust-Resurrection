import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { UserModel } from '../user.model';
import { IsMobilePhone } from 'class-validator';

@InputType()
export class SignUpClientInput {
  @IsMobilePhone(
    'en-US',
    { strictMode: true },
    { message: 'Phone number is incorrect' },
  )
  @Field(() => String, { nullable: false })
  phoneNumber: string;

  @Field(() => Int, { nullable: false })
  code: number;

  @Field(() => String, { nullable: true })
  fullName?: string;
}

@InputType()
export class UpdateClientInput extends PartialType(
  PickType(UserModel, ['fullName'], InputType),
  InputType,
) {}
