import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { ProductModel } from './product.model';

@InputType({ description: 'Input data for update product' })
export class UpdateProductDTO extends PartialType(
  PickType(
    ProductModel,
    [
      'price',
      'status',
      'description',
      'quantityStock',
      'quantityStockMin',
      'terpenes',
      'geneticCross',
    ],
    InputType,
  ),
  InputType,
) {
  @Field(() => Int, {
    nullable: false,
    description: 'Id product',
  })
  id: number;
}
