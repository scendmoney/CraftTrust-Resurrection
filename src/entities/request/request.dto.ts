import { Field, ObjectType } from '@nestjs/graphql';
import { PaginateModel } from '@common/query/query.dto';
import { RequestModel } from './request.model';

@ObjectType({ description: 'Requests' })
export class RequestsDTO {
  @Field(() => [RequestModel], { nullable: false })
  items: RequestModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}
