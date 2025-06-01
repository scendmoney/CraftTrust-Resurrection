import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../user.model';

@ObjectType({ isAbstract: true })
export class AdminLoginDTO {
  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => UserModel, { nullable: false })
  admin: UserModel;
}
