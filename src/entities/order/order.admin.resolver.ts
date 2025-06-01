import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { AuthGuardAdmin } from '@entities/auth/auth.guard';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import ErrorMsgEnum from '@enums/error';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { OrderModel } from './order.model';
import { OrdersDTO } from './order.dto';
import { SortDirectionEnum } from '@enums/common';
import QueryService from '@common/query';
import { OrderStatusEnum } from './order.enum';
import OrderService from './order.service';

@Resolver(() => OrderModel)
export class OrderAdminResolver {
  constructor(
    private readonly dataSource: DataSource,
    private orderService: OrderService,
  ) {}

  @Query(() => OrdersDTO, {
    description: '@protected - orders (admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async ordersAdmin(
    @Args('payload', { type: () => FilterGetDTO })
    payload: FilterGetDTO,
    @CurrentCtx() { relations },
  ): Promise<OrdersDTO> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const filters = payload?.filters || [];
    const order = QueryService.getSorts(sorts);
    const where: FindOptionsWhere<OrderModel> = {};

    const [items, total] = await this.dataSource
      .getRepository(OrderModel)
      .findAndCount({
        order,
        where: {
          ...QueryService.getFilters(filters),
          ...where,
        },
        ...paginate,
        relations: [...relations],
      });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    };
  }

  @Query(() => OrderModel, {
    description: '@protected - order by id (admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async orderByIdAdmin(
    @Args('payload', { type: () => GetIdDTO })
    { id }: GetIdDTO,
    @CurrentCtx() { relations },
  ): Promise<OrderModel> {
    const order = await this.dataSource.getTreeRepository(OrderModel).findOne({
      where: {
        id: id,
      },
      relations: [...relations],
    });
    if (!order) throw Error(ErrorMsgEnum.EntityNotExist);

    return order;
  }

  @Mutation(() => String, {
    description: '@protected - Create Order Ipfs admin',
  })
  @UseGuards(AuthGuardAdmin)
  async createOrderIpfsAdmin(
    @Args('orderId', {
      type: () => Number,
      nullable: false,
    })
    orderId: number,
  ): Promise<string> {
    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new Error(ErrorMsgEnum.OrderNotExist);
    }

    if (order.status === OrderStatusEnum.Cancel) {
      throw new Error(ErrorMsgEnum.OrderStatusWrong);
    }

    if (order.ipfs) {
      return `https://ipfs.io/ipfs/${order.ipfs}`;
    }

    const ipfs = await this.orderService.createOrderIpfs(orderId);

    return `https://ipfs.io/ipfs/${ipfs}`;
  }
}
