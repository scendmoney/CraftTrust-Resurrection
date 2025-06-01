import { Field, ObjectType } from '@nestjs/graphql';
import { PaginateModel } from '@common/query/query.dto';
import NFTModel from './nft.model';

@ObjectType({ isAbstract: true })
export class NFTsModelDTO {
  @Field(() => [NFTModel], { nullable: false })
  items: NFTModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}
