import { PaginateModel } from '@common/query/query.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { SubcompanyModel } from './subcompany.model';

@ObjectType({ isAbstract: true, description: 'Subcompany' })
export class SubcompaniesModel {
  @Field(() => [SubcompanyModel], { nullable: false })
  items: SubcompanyModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}
