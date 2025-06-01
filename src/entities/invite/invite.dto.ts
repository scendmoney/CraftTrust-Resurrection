import { Field, ObjectType } from '@nestjs/graphql';
import { InviteModel } from './invite.model';
import { PaginateModel } from '@common/query/query.dto';

@ObjectType({ description: 'Invitations' })
export class InvitationsDTO {
  @Field(() => [InviteModel], { nullable: false })
  items: InviteModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}
