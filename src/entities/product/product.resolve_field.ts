import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DataSource, Not } from 'typeorm';
import { ProductModel } from './product.model';
import { OrderStatusEnum } from '@entities/order/order.enum';
import { SortDirectionEnum } from '@enums/common';
import { OrderModel } from '@entities/order/order.model';

@Resolver(() => ProductModel)
export default class ProductResolveField {
  constructor(private dataSource: DataSource) {}

  @ResolveField('orderResolve')
  async orderResolve(@Parent() product: ProductModel) {
    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        products: {
          product: {
            id: product.id,
          },
        },
        status: Not(OrderStatusEnum.Cancel),
      },
      order: {
        id: SortDirectionEnum.desc,
      },
    });
    return order || null;
  }
}
