import { Field, InputType, PickType } from '@nestjs/graphql';

import { InviteModel } from './invite.model';

@InputType()
export class CreateInviteInput extends PickType(
  InviteModel,
  ['type', 'phone', 'name'],
  InputType,
) {
  @Field(() => String, {
    nullable: true,
    description: 'Required in type employee',
  })
  employeeId?: string;

  @Field(() => Boolean, { nullable: true })
  isSendSms?: boolean;
}

@InputType()
export class InviteByCodeInput {
  @Field(() => String, { nullable: false })
  code: string;
}
