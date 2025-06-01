import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { PaginateModel } from '@common/query/query.dto';

@ObjectType({ isAbstract: true })
export class UsersModelDTO {
  @Field(() => [UserModel], { nullable: false })
  items: UserModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}

@ObjectType()
export class UserTokenDTO {
  @Field(() => String, {
    nullable: false,
  })
  token: string;

  @Field(() => UserModel, {
    nullable: false,
  })
  user: UserModel;
}
