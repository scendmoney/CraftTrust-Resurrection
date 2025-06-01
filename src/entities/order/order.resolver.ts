import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { DataSource, DeepPartial, FindOptionsWhere, Not } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import ErrorMsgEnum from '@enums/error';
import { GetIdDTO } from '@common/query/query.dto';
import { OrderModel } from './order.model';
import { OrdersDTO } from './order.dto';
import { SortDirectionEnum, SubscriptionsEnum } from '@enums/common';
import QueryService from '@common/query';
import {
  CreateOrderInput,
  FilterOrdersInput,
  UpdateOrderPackageInput,
  UpdateOrderStatusInput,
} from './order.input';
import { CartModel } from '@entities/cart/cart.model';
import {
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentTypeEnum,
} from './order.enum';
import { ceil, random } from 'lodash';
import OrderService from './order.service';
import OrderProductModel from '@entities/order_product/order_product.model';
import { ProductModel } from '@entities/product/product.model';
import { RedisGraphqlService } from 'libs/redis/src';
import { UserModel } from '@entities/user/user.model';
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '@entities/transaction/transaction.enum';
import TransactionModel from '@entities/transaction/transaction.model';
import HederaService from 'libs/hedera/src/hedera.service';
import { CONFIG } from '@config/index';
import { ProductStatusEnum } from '@entities/product/product.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerIoTypesEnum } from '@entities/customerio/customerio.enum';
import DiamondstandardService from 'libs/diamondstandard/src/diamondstandard.service';

@Resolver(() => OrderModel)
export class OrderResolver {
  constructor(
    private readonly dataSource: DataSource,
    private orderService: OrderService,
    private readonly redisGraphqlService: RedisGraphqlService,
    private readonly hederaService: HederaService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Query(() => OrdersDTO, {
    description: '@protected - orders',
  })
  @UseGuards(AuthGuardUser)
  async orders(
    @Args('payload', { type: () => FilterOrdersInput })
    payload: FilterOrdersInput,
    @CurrentCtx() { user, relations },
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

    if (payload.isCultivator) {
      where.facilityCultivator = {
        id: user?.__context__?.id || -1,
      };
    } else {
      where.facilityBuyer = {
        id: user?.__context__?.id || -1,
      };
    }

    const [items, total] = await this.dataSource
      .getRepository(OrderModel)
      .findAndCount({
        order,
        where: {
          ...QueryService.getFilters(filters),
          ...where,
        },
        ...paginate,
        relations: ['facilityBuyer', ...relations],
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
    description: '@protected - order by id',
  })
  @UseGuards(AuthGuardUser)
  async orderById(
    @Args('payload', { type: () => GetIdDTO })
    { id }: GetIdDTO,
    @CurrentCtx() { user, relations },
  ): Promise<OrderModel> {
    const order = await this.dataSource.getTreeRepository(OrderModel).findOne({
      where: [
        {
          id: id,
          facilityBuyer: {
            id: user.__context__?.id || -1,
          },
        },
        {
          id: id,
          facilityCultivator: {
            id: user.__context__?.id || -1,
          },
        },
      ],
      relations: ['facilityBuyer', ...relations],
    });
    if (!order) throw Error(ErrorMsgEnum.EntityNotExist);

    return order;
  }

  @Mutation(() => OrderModel, {
    description: '@protected - Create order',
  })
  @UseGuards(AuthGuardUser)
  async createOrder(
    @Args('payload', {
      type: () => CreateOrderInput,
      nullable: false,
    })
    payload: CreateOrderInput,
    @CurrentCtx() { user, relations },
  ): Promise<OrderModel> {
    const { contactPersonId, ...other } = payload;

    const cart = await this.dataSource.getRepository(CartModel).findOne({
      where: {
        facilityBuyer: {
          id: user.__context__.id,
        },
        id: payload.cartId,
      },
      relations: ['cartItems.product', 'facilityCultivator'],
    });

    if (!cart) {
      throw new Error(ErrorMsgEnum.CartNotExist);
    }

    if (!cart.__cartItems__.length) {
      await this.dataSource.getRepository(CartModel).softRemove(cart);
      throw new Error(ErrorMsgEnum.CartEmpty);
    }

    const data: DeepPartial<OrderModel> = {
      ...other,
      facilityBuyer: {
        id: user.__context__.id,
      },
      facilityCultivator: {
        id: cart.__facilityCultivator__.id,
      },
      status: OrderStatusEnum.New,
      paymentStatus:
        other.paymentType === PaymentTypeEnum.Net
          ? PaymentStatusEnum.Due
          : PaymentStatusEnum.NotPaid,
      verificationCode:
        other.paymentType === PaymentTypeEnum.Net ? random(1000, 9999) : null,
      products: [],
    };

    const contactPerson = await this.dataSource
      .getRepository(UserModel)
      .findOne({
        where: {
          id: contactPersonId || '-1',
          userToFacilities: {
            id: user.__context__.id,
          },
        },
      });

    if (!contactPerson) {
      throw new Error(ErrorMsgEnum.ContactPersonWrong);
    }

    data.contactPerson = {
      id: contactPerson.id,
    };

    const order = await this.orderService.createOrder(data, cart);
    this.eventEmitter.emit(CustomerIoTypesEnum.orderCreated, {
      orderId: order.id,
      cartId: cart.id,
    });

    const orderTotal = await this.dataSource.getRepository(OrderModel).count({
      where: {
        facilityBuyer: {
          id: data.facilityBuyer.id,
        },
        facilityCultivator: {
          id: data.facilityCultivator.id,
        },
      },
    });

    if (orderTotal > 1) {
      this.eventEmitter.emit(CustomerIoTypesEnum.repeatPurchase, order.id);
    }

    return this.dataSource.getRepository(OrderModel).findOne({
      where: { id: order.id },
      relations: ['facilityBuyer', ...relations],
    });
  }

  @Mutation(() => OrderModel, {
    description: '@protected - Update order',
  })
  @UseGuards(AuthGuardUser)
  async updateOrderStatus(
    @Args('payload', {
      type: () => UpdateOrderStatusInput,
      nullable: false,
    })
    { orderId, status, verificationCode }: UpdateOrderStatusInput,
    @CurrentCtx() { user, relations },
  ): Promise<OrderModel> {
    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: orderId,
        facilityCultivator: {
          id: user.__context__.id,
        },
      },
    });

    if (!order) {
      throw new Error(ErrorMsgEnum.OrderNotExist);
    }

    await this.orderService.updateOrderStatus(
      orderId,
      status,
      verificationCode,
    );

    switch (status) {
      case OrderStatusEnum.Cancel: {
        this.eventEmitter.emit(CustomerIoTypesEnum.orderCancelled, {
          order: order.id,
          facilityId: user.__context__.id,
        });
        break;
      }
      case OrderStatusEnum.Completed: {
        this.eventEmitter.emit(CustomerIoTypesEnum.orderCompleted, order.id);
        break;
      }
      default: {
        this.eventEmitter.emit(CustomerIoTypesEnum.orderUpdated, order.id);
      }
    }

    return this.dataSource.getRepository(OrderModel).findOne({
      where: { id: order.id },
      relations: ['facilityBuyer', ...relations],
    });
  }

  @Mutation(() => OrderProductModel, {
    description: '@protected - Update order package',
  })
  @UseGuards(AuthGuardUser)
  async updateOrderPackage(
    @Args('payload', {
      type: () => UpdateOrderPackageInput,
      nullable: false,
    })
    { orderProductId, packageId }: UpdateOrderPackageInput,
    @CurrentCtx() { user, relations },
  ): Promise<OrderProductModel> {
    const [orderProduct, product] = await Promise.all([
      this.dataSource.getRepository(OrderProductModel).findOne({
        where: {
          id: orderProductId,
          order: {
            status: OrderStatusEnum.Confirmed,
            facilityCultivator: {
              id: user.__context__.id,
            },
          },
        },
        relations: ['parentProduct.children', 'product'],
      }),
      this.dataSource.getRepository(ProductModel).findOne({
        where: {
          id: packageId,
        },
      }),
    ]);

    if (!orderProduct) {
      throw new Error(ErrorMsgEnum.EntityNotExist);
    }

    if (!product) {
      throw new Error(ErrorMsgEnum.ProductNotExist);
    }

    if (
      product.quantityStock !== orderProduct.quantity &&
      product.id !== orderProduct.__product__?.id &&
      product.id !== orderProduct.__parentProduct__?.id
    ) {
      throw new Error(ErrorMsgEnum.ProductQuantityWrong);
    }

    if (
      orderProduct.__parentProduct__?.id !== packageId &&
      orderProduct.__parentProduct__?.children.findIndex(
        (children) => children.id === packageId,
      ) === -1
    ) {
      throw new Error(ErrorMsgEnum.PackageWrong);
    }

    await this.dataSource.transaction(async (manager) => {
      if (
        orderProduct.__product__?.id !== product.id &&
        orderProduct.__product__ &&
        orderProduct.__parentProduct__?.id !== orderProduct.__product__?.id &&
        orderProduct.__product__.id !== product.id
      ) {
        await manager
          .getRepository(ProductModel)
          .update(orderProduct.__product__?.id, {
            status: ProductStatusEnum.unlisted,
            quantityStock: 0,
          });
      }

      await manager.getRepository(OrderProductModel).update(orderProductId, {
        product: {
          id: packageId,
        },
      });
    });

    return this.dataSource.getRepository(OrderProductModel).findOne({
      where: {
        id: orderProductId,
      },
      relations,
    });
  }

  @Mutation(() => OrderModel, {
    description: '@protected - cancel order buyer',
  })
  @UseGuards(AuthGuardUser)
  async cancelOrderBuyer(
    @Args('payload', {
      type: () => GetIdDTO,
      nullable: false,
    })
    { id }: GetIdDTO,
    @CurrentCtx() { user, relations },
  ): Promise<OrderModel> {
    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: id,
        facilityBuyer: {
          id: user.__context__.id,
        },
      },
    });

    if (!order) {
      throw new Error(ErrorMsgEnum.OrderNotExist);
    }

    if (order.status !== OrderStatusEnum.New) {
      throw new Error(ErrorMsgEnum.OrderStatusWrong);
    }

    await this.orderService.updateOrderStatus(id, OrderStatusEnum.Cancel);

    this.eventEmitter.emit(CustomerIoTypesEnum.orderCancelled, {
      orderId: order.id,
      facilityId: user.__context__.id,
    });

    return this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: id,
      },
      relations,
    });
  }

  @Mutation(() => String, {
    description: '@protected - Payment order',
  })
  @UseGuards(AuthGuardUser)
  async getPaymentOrderLink(
    @Args('payload', {
      type: () => GetIdDTO,
      nullable: false,
    })
    { id }: GetIdDTO,
    @CurrentCtx() { user },
  ): Promise<string> {
    if (!user.__context__) throw new Error(ErrorMsgEnum.ContextNotExist);

    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: id,
        facilityBuyer: {
          id: user.__context__.id,
        },
        status: Not(OrderStatusEnum.Cancel),
      },
      select: {
        id: true,
        paymentType: true,
        paymentStatus: true,
        totalBuyer: true,
        total: true,
        fee: {
          feeBuyer: true,
          feeCultivator: true,
        },
      },
      relations: ['transactions', 'facilityBuyer', 'facilityCultivator'],
    });

    if (!order) {
      throw new Error(ErrorMsgEnum.OrderNotExist);
    }

    if (order.paymentStatus === PaymentStatusEnum.Paid) {
      throw new Error(ErrorMsgEnum.OrderPaid);
    }

    if (order.totalBuyer < 21) {
      throw new Error(ErrorMsgEnum.OrderTotalWrong21);
    }

    // Let's check if there is an association and permissions for the smart contract
    await Promise.all([
      this.hederaService.walletAssociateTokenAndContract({
        account: {
          wallet: order.__facilityBuyer__.publicAddress,
          path: order.__facilityBuyer__.index,
        },
        quantity: 9999999999,
      }),
      this.hederaService.walletAssociateTokenAndContract({
        account: {
          wallet: order.__facilityCultivator__.publicAddress,
          path: order.__facilityCultivator__.index,
        },
        quantity: 9999999999,
      }),
    ]);

    let balanceCarat = 0;
    let rateCaratToUSD = 0;

    try {
      const [balanceToken, rate] = await Promise.all([
        this.hederaService.getAccountBalanceToken(
          order.__facilityBuyer__.publicAddress,
          CONFIG.hedera.token,
        ),
        DiamondstandardService.getCaratUsd(
          order.__facilityCultivator__.publicAddress,
        ),
      ]);

      rateCaratToUSD = rate;
      balanceCarat = balanceToken;
    } catch (error) {
      console.log(error);
      console.log(`Error getPaymentOrderLink: ${error.message}`);
      throw new Error(ErrorMsgEnum.OrderPaymentError);
    }

    const totalCarat = ceil(order.total / rateCaratToUSD, 2);
    const feeBuyer = ceil(order.fee.feeBuyer / rateCaratToUSD, 2);
    const feeCultivator = ceil(order.fee.feeCultivator / rateCaratToUSD, 2);

    if (
      !order.__transactions__.find(
        ({ status, type }) =>
          type === TransactionTypeEnum.buy &&
          status === TransactionStatusEnum.processing,
      )
    ) {
      await this.dataSource
        .getRepository(TransactionModel)
        .create({
          type: TransactionTypeEnum.buy,
          status: TransactionStatusEnum.processing,
          amount: totalCarat,
          amountUsd: order.total,
          tokenRate: rateCaratToUSD,
          token: 'CARAT',
          fee: {
            feeBuyer: feeBuyer,
            feeCultivator: feeCultivator,
          },
          facilityFrom: {
            id: order.__facilityBuyer__.id,
          },
          facilityTo: {
            id: order.__facilityCultivator__.id,
          },
          order: {
            id: order.id,
          },
        })
        .save();
    }

    if (balanceCarat >= totalCarat) {
      throw new Error(ErrorMsgEnum.TransactionProcessing);
    }

    return `https://pay.c14.money/?clientId=222abd31-a462-48d8-9ccc-d973f3a6909d&sourceCurrencyCode=USD&targetAssetId=d9fcf0da-6483-425e-9ff0-4e15cc8fe6fd&targetAmount=${ceil(
      totalCarat + feeBuyer,
      2,
    )}&quoteAmountLock=true&sourceCurrencyCodeLock=true&targetAssetIdLock=true&targetAddress=${
      order.__facilityBuyer__.publicAddress
    }&targetAddressLock=true`;
  }

  @Subscription(() => OrderModel, {
    name: SubscriptionsEnum.newOrder,
    filter: async ({ newOrder }, _, context) => {
      const order = await OrderModel.findOne({
        where: { id: newOrder?.id },
        relations: ['facilityCultivator'],
      });
      return (
        order.__facilityCultivator__?.id === context?.user?.__context__?.id
      );
    },
    resolve: async ({ newOrder }) =>
      OrderModel.findOne({
        where: { id: newOrder?.id },
      }),
  })
  newOrder() {
    return this.redisGraphqlService.asyncIterator<OrderModel>(
      SubscriptionsEnum.newOrder,
    );
  }

  @Subscription(() => OrderModel, {
    name: SubscriptionsEnum.orderPaid,
    filter: async ({ [SubscriptionsEnum.orderPaid]: { id } }, _, context) => {
      const order = await OrderModel.findOne({
        where: { id: id || -1 },
        relations: ['facilityBuyer'],
      });

      return order.__facilityBuyer__?.id === context?.user?.__context__?.id;
    },
    resolve: async ({ [SubscriptionsEnum.orderPaid]: { id } }) =>
      OrderModel.findOne({
        where: { id: id || -1 },
      }),
  })
  orderPaid() {
    return this.redisGraphqlService.asyncIterator<OrderModel>(
      SubscriptionsEnum.orderPaid,
    );
  }
}
