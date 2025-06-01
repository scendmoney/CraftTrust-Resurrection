import { PaginateModel } from '@common/query/query.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProductModel } from './product.model';

@ObjectType({ isAbstract: true, description: 'Products' })
export class ProductsModel {
  @Field(() => [ProductModel], { nullable: false })
  items: ProductModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}
