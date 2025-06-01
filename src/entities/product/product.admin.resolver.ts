import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductModel } from './product.model';
import { DataSource } from 'typeorm';
import { ProductsModel } from './product.dto';
import { AuthGuardAdmin } from '@entities/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { SortDirectionEnum } from '@enums/common';
import QueryService from '@common/query';
import ErrorMsgEnum from '@enums/error';

@Resolver(() => ProductModel)
export class ProductAdminResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => ProductsModel, {
    description: '@protected - List of products (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async productsAdmin(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { relations },
  ): Promise<ProductsModel> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const filters = payload?.filters || [];
    const order = QueryService.getSorts(sorts);
    const where = QueryService.getFilters(filters);

    const [items, total] = await this.dataSource
      .getTreeRepository(ProductModel)
      .findAndCount({
        order,
        where,
        relations,
        ...paginate,
      });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    };
  }

  @Query(() => ProductModel, {
    description: '@protected - Get product by ID (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async productByIdAdmin(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { relations },
  ): Promise<ProductModel> {
    const product = await this.dataSource
      .getTreeRepository(ProductModel)
      .findOne({
        where: { id: payload.id },
        relations,
      });
    if (!product) throw Error(ErrorMsgEnum.ProductNotExist);
    return product;
  }
}
