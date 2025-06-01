import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CurrentCtx } from '../auth/auth.decorator';
import { AuthGuardUser } from '../auth/auth.guard';
import { DataSource } from 'typeorm';
import ErrorMsgEnum from '@enums/error';
import { ProductModel } from './product.model';
import { ProductsModel } from './product.dto';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { SortDirectionEnum } from '@enums/common';
import QueryService from '@common/query';
import { ProductStatusEnum } from './product.enum';

@Resolver(() => ProductModel)
export class ProductBuyerResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => ProductsModel, {
    description: '@protected - List of products buyer',
  })
  @UseGuards(AuthGuardUser)
  async productsBuyer(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { user, relations },
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
    const where: any = QueryService.getFilters(filters);

    if (where.facility) {
      where.facility.facilityBuyerRelations = {
        facilityBuyer: {
          users: {
            id: user.id,
          },
        },
      };
    } else {
      where.facility = {
        facilityBuyerRelations: {
          facilityBuyer: {
            id: user.__context__?.id,
          },
        },
      };
    }

    const [items, total] = await this.dataSource
      .getTreeRepository(ProductModel)
      .findAndCount({
        order,
        where: {
          ...where,
          status: ProductStatusEnum.listed,
        },
        ...paginate,
        relations,
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
    description: '@protected - Get product by ID (by user buyer)',
  })
  @UseGuards(AuthGuardUser)
  async productByIdBuyer(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { user, relations },
  ): Promise<ProductModel> {
    const product = await this.dataSource
      .getTreeRepository(ProductModel)
      .findOne({
        where: {
          id: payload.id,
          status: ProductStatusEnum.listed,
          facility: {
            facilityBuyerRelations: {
              facilityBuyer: {
                id: user.__context__.id,
              },
            },
          },
        },
        relations,
      });
    if (!product) throw Error(ErrorMsgEnum.ProductNotExist);
    return product;
  }
}
