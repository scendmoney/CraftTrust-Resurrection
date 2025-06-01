import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, In } from 'typeorm';
import { OrderModel } from './order.model';
import {
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentTypeEnum,
  ShippingTypeEnum,
} from './order.enum';
import ErrorMsgEnum from '@enums/error';
import { ProductModel } from '@entities/product/product.model';
import { CartModel } from '@entities/cart/cart.model';
import PinataService from 'libs/pinata/src/pinata.service';
import { StorageService } from 'libs/storage/src';
import { AssetModel } from '@entities/asset/asset.model';
import { decrypt, encrypt } from '@src/utils/utils';
import HederaService from 'libs/hedera/src/hedera.service';
import TransactionBlockchainModel from '@entities/transaction_blockchain/transaction_blockchain.model';
import { TransactionBlockchainStatusEnum } from '@entities/transaction_blockchain/transaction_blockchain.enum';
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '@entities/transaction/transaction.enum';
import TransactionModel from '@entities/transaction/transaction.model';
import { IPayOrder } from './order.type';
import FacilityToFacilityModel from '@entities/facility_to_facility/facility_to_facility.model';
import { ProductStatusEnum } from '@entities/product/product.enum';
import moment from 'moment';
import { SubscriptionsEnum } from '@enums/common';
import { RedisGraphqlService } from 'libs/redis/src';
import { ConfigurationTypesEnum } from '@entities/configuration/configuration.enum';
import ConfigurationModel from '@entities/configuration/configuration.model';
import { CustomLoggerService } from '@common/logger/custom_logger.service';

@Injectable()
export default class OrderService {
  constructor(
    private dataSource: DataSource,
    private pinataService: PinataService,
    private readonly storageService: StorageService,
    private readonly hederaService: HederaService,
    private readonly redisGraphqlService: RedisGraphqlService,
    private readonly logger: CustomLoggerService,
  ) {}

  async createOrder(
    orderQuery: DeepPartial<OrderModel>,
    cart: CartModel,
  ): Promise<OrderModel> {
    const products: DeepPartial<any>[] = [];
    let total = 0;

    const fees = await this.dataSource.getRepository(ConfigurationModel).find({
      where: {
        type: In([
          ConfigurationTypesEnum.commissionOrderBuyer,
          ConfigurationTypesEnum.commissionOrderCultivator,
        ]),
      },
    });

    const feeBuyer = fees.find(
      (item) => item.type === ConfigurationTypesEnum.commissionOrderBuyer,
    );

    const feeCultivator = fees.find(
      (item) => item.type === ConfigurationTypesEnum.commissionOrderCultivator,
    );

    cart.__cartItems__.forEach((item) => {
      if (item.__product__.status !== ProductStatusEnum.listed) {
        throw new Error(ErrorMsgEnum.ProductOutOfStock);
      }
      if (item.quantity > item.__product__.quantityStock) {
        throw new Error(ErrorMsgEnum.ProductQuantityIsNotEnough);
      }
      const productTotal = item.__product__.price * (item.quantity / 0.25);
      total += productTotal;
      products.push({
        parentProduct: {
          id: item.__product__.id,
        } as DeepPartial<any>,
        quantity: item.quantity,
        price: item.__product__.price,
        total: item.__product__.price * (item.quantity / 0.25),
      });
    });
    orderQuery.products = products;
    orderQuery.total = Number(total.toFixed(2));

    orderQuery.fee = {
      feeBuyer: isNaN(Number(feeBuyer?.value || 0))
        ? 0
        : (Number(feeBuyer?.value || 0) * orderQuery.total) / 100,
      feeCultivator: isNaN(Number(feeCultivator?.value || 0))
        ? 0
        : (Number(feeCultivator?.value || 0) * orderQuery.total) / 100,
    };

    let facilityToFacility = null;
    if (orderQuery.paymentType === PaymentTypeEnum.Net) {
      facilityToFacility = await this.dataSource
        .getRepository(FacilityToFacilityModel)
        .findOne({
          where: {
            facilityBuyer: {
              id: orderQuery.facilityBuyer.id,
            },
            facilityCultivator: {
              id: orderQuery.facilityCultivator.id,
            },
          },
          select: {
            id: true,
            isNetActivated: true,
            netBalance: true,
            dueBalance: true,
            netDays: true,
          },
          relations: ['facilityBuyer', 'facilityCultivator'],
        });
      if (
        !facilityToFacility.isNetActivated ||
        Number(facilityToFacility.netBalance) -
          Number(facilityToFacility.dueBalance) <
          orderQuery.total + orderQuery.fee.feeBuyer
      ) {
        throw new Error(ErrorMsgEnum.NetBalanceWrong);
      }
      orderQuery.paymentDate = moment()
        .utc()
        .startOf('day')
        .add(facilityToFacility.netDays, 'day')
        .toDate();
    }

    const order = await this.dataSource.transaction(async (manager) => {
      await Promise.all(
        products.map((product) =>
          manager.getRepository(ProductModel).update(product.parentProduct.id, {
            quantityStock: () => `quantityStock - ${product.quantity}`,
            status:
              product.parentProduct.quantityStock - product.quantity === 0
                ? ProductStatusEnum.unlisted
                : product.parentProduct.status,
          }),
        ),
      );

      await manager.getRepository(CartModel).softDelete(cart.id);

      const orderDb = await manager
        .getRepository(OrderModel)
        .create(orderQuery)
        .save();

      await manager.getRepository(FacilityToFacilityModel).update(
        {
          facilityBuyer: {
            id: orderQuery.facilityBuyer.id,
          },
          facilityCultivator: {
            id: orderQuery.facilityCultivator.id,
          },
        },
        {
          lastOrderDate: new Date(),
          totalOrders: () => `coalesce((select 
            coalesce(COUNT(*), 0) as total
            from public."order"
            where deleted_date is null 
              and facility_cultivator_id = '${orderQuery.facilityCultivator.id}'
              and facility_buyer_id = '${orderQuery.facilityBuyer.id}' 
            ),0)
          `,
          dueBalance: () => `(
            coalesce((select 
              coalesce(sum(total_buyer), 0) as total
            from public."order"
            where deleted_date is null 
              and facility_cultivator_id = '${orderQuery.facilityCultivator.id}'
              and facility_buyer_id = '${orderQuery.facilityBuyer.id}' 
              and status != 'Cancel'::public.order_status_enum
              and payment_type = 'Net'::public.order_payment_type_enum
              and payment_status in('Overdue'::public.order_payment_status_enum,'Due'::public.order_payment_status_enum)),0)
          )`,
        },
      );
      return orderDb;
    });

    return order;
  }

  async updateOrderStatus(
    orderId: number,
    status: OrderStatusEnum,
    verificationCode?: number,
  ) {
    const data: DeepPartial<OrderModel> = {
      status,
    };

    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: orderId,
      },
      relations: [
        'facilityBuyer.owner',
        'facilityCultivator.owner',
        'products.parentProduct',
        'products.product',
        'transactions',
      ],
    });

    switch (status) {
      case OrderStatusEnum.Confirmed: {
        await this.orderStatusConfirmed(order);
        break;
      }
      case OrderStatusEnum.WaitingForPickUp: {
        await this.orderStatusWaitingForPickUp(order);
        break;
      }
      case OrderStatusEnum.WaitingForCarrier: {
        await this.orderStatusWaitingForCarrier(order);
        break;
      }
      case OrderStatusEnum.Shipped: {
        await this.orderStatusShipped(order);
        break;
      }
      case OrderStatusEnum.Completed: {
        await this.orderStatusCompleted(order, verificationCode);
        break;
      }
      case OrderStatusEnum.Cancel: {
        await this.orderStatusCancel(order);
        data.paymentStatus = PaymentStatusEnum.NotPaid;
        break;
      }
      default:
        throw new Error(ErrorMsgEnum.OrderStatusWrong);
    }

    await this.dataSource.getRepository(OrderModel).update(order.id, data);
  }

  async createOrderIpfs(orderId: number) {
    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: orderId,
      },
      relations: [
        'facilityBuyer',
        'facilityCultivator.owner',
        'facilityCultivator.asset',
        'products.parentProduct.thumbnail',
        'products.parentProduct.item',
        'products.product',
      ],
    });

    if (!order) {
      throw new Error(ErrorMsgEnum.OrderNotExist);
    }

    if (order.ipfs) {
      return order.ipfs;
    }

    const issuer = order.__facilityCultivator__.__owner__?.issuer;

    const logoIpfs = {
      image: `ipfs://QmTze3JmoUrGCRWh2CGUXj2RU6eXPwuqsA4MPzz8Q8AtrX`,
      type: 'image/png',
    };

    if (
      order.__facilityCultivator__.__asset__ &&
      !order.__facilityCultivator__.__asset__?.ipfs
    ) {
      const readableStream = await this.storageService.getFile(
        order.__facilityCultivator__?.__asset__?.path,
      );
      logoIpfs.image = await this.pinataService.uploadFileToPinataStream(
        readableStream,
        order.__facilityCultivator__?.__asset__?.filename,
      );
      logoIpfs.type = order.__facilityCultivator__.__asset__.type;
      await this.dataSource
        .getRepository(AssetModel)
        .update(order.__facilityCultivator__.__asset__.id, {
          ipfs: logoIpfs.image,
        });
    }

    const dataCid = {
      name: `CruftTrust Order #${order.id}`,
      creator: OrderService.encryptNFT(order.__facilityBuyer__.id, issuer),
      creatorDID: issuer,
      description: `The order #${order.id} contains ${order.__products__.length} products`,
      ...logoIpfs,
      files: [],
      format: 'HIP412@2.0.0',
      properties: {
        external_url: 'https://crafttrust.com',
      },
    };

    await Promise.all(
      order.__products__.map(async (item) => {
        const thumbnail = item.__parentProduct__.__thumbnail__;

        let ipfsImg =
          thumbnail?.ipfs || 'QmbUPA8EHEjPU7vjBb12xtowQHKyXmQiLJ7NhaCaFqfRvR';

        if (thumbnail && !thumbnail.ipfs) {
          const readableStream = await this.storageService.getFile(
            thumbnail.path,
          );
          ipfsImg = await this.pinataService.uploadFileToPinataStream(
            readableStream,
            thumbnail.filename,
          );
          await this.dataSource
            .getRepository(AssetModel)
            .update(thumbnail.id, { ipfs: ipfsImg });
        }

        dataCid.files.push({
          uri: OrderService.encryptNFT(`ipfs://${ipfsImg}`, issuer),
          type: thumbnail?.type || 'image/png',
          metadata: {
            name: OrderService.encryptNFT(
              item.__parentProduct__.item.name || '-',
              issuer,
            ),
            description: OrderService.encryptNFT(
              item.__parentProduct__.description || '-',
              issuer,
            ),
            image: OrderService.encryptNFT(`ipfs://${ipfsImg}`, issuer),
            type: thumbnail?.type || 'image/png',
            properties: {
              amount: OrderService.encryptNFT(String(item.price), issuer),
              symbolPrice: OrderService.encryptNFT('usdc', issuer),
              total: OrderService.encryptNFT(String(item.total), issuer),
              quantity: OrderService.encryptNFT(String(item.quantity), issuer),
              productId: OrderService.encryptNFT(
                String(item.__product__?.id || item.__parentProduct__?.id),
                issuer,
              ),
            },
          },
        });
      }),
    );

    const ipfsDataCid = await this.pinataService.uploadJSONToPinata(
      dataCid,
      `order#${order.id}.json`,
    );

    await this.dataSource
      .getRepository(OrderModel)
      .update(order.id, { ipfs: ipfsDataCid });

    return ipfsDataCid;
  }

  async orderStatusCompleted(order: OrderModel, verificationCode?: number) {
    if (
      ![OrderStatusEnum.Shipped, OrderStatusEnum.WaitingForPickUp].includes(
        order.status,
      )
    ) {
      throw new Error(ErrorMsgEnum.OrderStatusWrong);
    }
    if (verificationCode !== order.verificationCode) {
      throw new Error(ErrorMsgEnum.OrderCodeWrong);
    }

    await this.dataSource.getRepository(FacilityToFacilityModel).update(
      {
        facilityBuyer: {
          id: order.__facilityBuyer__.id,
        },
        facilityCultivator: {
          id: order.__facilityCultivator__.id,
        },
      },
      {
        orderTotalSpend: () => `
          coalesce((select 
              coalesce(sum(total), 0) as total
            from public."order"
            where deleted_date is null 
              and facility_cultivator_id = '${order.__facilityCultivator__.id}' 
              and facility_buyer_id = '${order.__facilityBuyer__.id}' 
              and (status = 'Completed'::public.order_status_enum or id = ${order.id})),0)`,
        avgPurchase: () => `
            coalesce((select 
              coalesce(avg(total), 0) as total
            from public."order"
            where deleted_date is null 
              and facility_cultivator_id = '${order.__facilityCultivator__.id}' 
              and facility_buyer_id = '${order.__facilityBuyer__.id}' 
              and (status = 'Completed'::public.order_status_enum or id = ${order.id})
            group by facility_cultivator_id, facility_cultivator_id),0)`,
      },
    );

    // if (order.paymentStatus === PaymentStatusEnum.Paid) {
    //   await this.cultivatorFeePaidOrder(order);
    // }
  }

  async orderStatusCancel(order: OrderModel) {
    if (
      [
        OrderStatusEnum.Cancel,
        OrderStatusEnum.Completed,
        OrderStatusEnum.Shipped,
      ].includes(order.status)
    ) {
      throw new Error(ErrorMsgEnum.OrderStatusWrong);
    }

    if (order.paymentStatus === PaymentStatusEnum.Paid) {
      throw new Error(ErrorMsgEnum.OrderPaid);
    }
    const promises = [
      ...order.__products__.map(async (product) => {
        await this.dataSource
          .getRepository(ProductModel)
          .update(
            !product.__product__?.id
              ? product.__parentProduct__.id
              : product.__product__.id,
            {
              quantityStock: () => `quantityStock + ${product.quantity}`,
              status: ProductStatusEnum.listed,
            },
          );
      }),
      this.dataSource.getRepository(TransactionModel).update(
        {
          order: {
            id: order.id,
          },
          type: TransactionTypeEnum.buy,
          status: TransactionStatusEnum.processing,
        },
        {
          status: TransactionStatusEnum.cancel,
        },
      ),
    ];
    if (
      order.paymentType === PaymentTypeEnum.Net &&
      [PaymentStatusEnum.Due, PaymentStatusEnum.Overdue].includes(
        order.paymentStatus,
      )
    ) {
      promises.push(
        this.dataSource.getRepository(FacilityToFacilityModel).update(
          {
            facilityBuyer: {
              id: order.__facilityBuyer__.id,
            },
            facilityCultivator: {
              id: order.__facilityCultivator__.id,
            },
          },
          {
            dueBalance: () => `
              coalesce((select
                coalesce(sum(total), 0) as total
              from public."order"
              where deleted_date is null
                and facility_cultivator_id = '${order.__facilityCultivator__.id}'
                and facility_buyer_id = '${order.__facilityBuyer__.id}'
                and status != 'Cancel'::public.order_status_enum
                and payment_type = 'Net'::public.order_payment_type_enum
                and payment_status in('Overdue'::public.order_payment_status_enum,'Due'::public.order_payment_status_enum)
                and id != ${order.id}),0)`,
          },
        ),
      );
    }
    await Promise.all(promises);
    await this.redisGraphqlService.publish(SubscriptionsEnum.orderPaid, {
      [SubscriptionsEnum.orderPaid]: {
        id: order.id,
      },
    });
  }

  async orderStatusConfirmed(order: OrderModel) {
    if (order.status !== OrderStatusEnum.New) {
      throw new Error(ErrorMsgEnum.OrderStatusWrong);
    }
    if (
      order.paymentType === PaymentTypeEnum.PayNow &&
      order.paymentStatus === PaymentStatusEnum.NotPaid
    ) {
      throw new Error(ErrorMsgEnum.OrderNotPaid);
    }
  }

  async orderStatusWaitingForPickUp(order: OrderModel) {
    if (order.status !== OrderStatusEnum.Confirmed) {
      throw new Error(ErrorMsgEnum.OrderStatusWrong);
    }

    if (order.__products__.find((product) => !product.__product__)) {
      throw new Error(ErrorMsgEnum.OrderPackageWrong);
    }

    if (order.shippingType !== ShippingTypeEnum.PickUp) {
      throw new Error(ErrorMsgEnum.OrderShippingTypeWrong);
    }
  }

  async orderStatusWaitingForCarrier(order: OrderModel) {
    if (order.status !== OrderStatusEnum.Confirmed) {
      throw new Error(ErrorMsgEnum.OrderStatusWrong);
    }

    if (order.__products__.find((product) => !product.__product__)) {
      throw new Error(ErrorMsgEnum.OrderPackageWrong);
    }

    if (order.shippingType !== ShippingTypeEnum.Delivery) {
      throw new Error(ErrorMsgEnum.OrderShippingTypeWrong);
    }
  }

  async orderStatusShipped(order: OrderModel) {
    if (order.status !== OrderStatusEnum.WaitingForCarrier) {
      throw new Error(ErrorMsgEnum.OrderStatusWrong);
    }
  }

  // async cultivatorFeePaidOrder(order: OrderModel) {
  //   try {
  //     if (order.status != OrderStatusEnum.Completed) {
  //       return;
  //     }

  //     if (order.fee.feeCultivator > 0) {
  //       await this.hederaService.transferToken({
  //         accountFrom: {
  //           wallet: order.__facilityCultivator__?.publicAddress,
  //           path: order.__facilityCultivator__?.index,
  //         },
  //         accountTo: {
  //           wallet: CONFIG.hedera.hederaAccountId,
  //           path: CONFIG.hedera.hederaPath,
  //         },
  //         token: CONFIG.hedera.token,
  //         count: order.fee.feeCultivator,
  //       });
  //     }

  //     await this.dataSource.getRepository(OrderModel).update(order.id, {
  //       id: order.id,
  //       isCultivatorFeePaid: true,
  //     });
  //   } catch (error) {
  //     this.logger.error(`cultivatorFeePaidOrder error: ${error.message}`);
  //   }
  // }

  async payOrder({
    orderId,
    facilityAddressFrom,
    facilityPathFrom,
    facilityAddressTo,
    facilityPathTo,
    total,
    fee,
    transactionId,
  }: IPayOrder) {
    // create IPFS
    const ipfs = await this.createOrderIpfs(orderId);

    const result = await this.hederaService.buyOrder({
      ipfs: `ipfs://${ipfs}`,
      accountBuyer: {
        wallet: facilityAddressFrom,
        path: facilityPathFrom,
      },
      accountCultivator: {
        wallet: facilityAddressTo,
        path: facilityPathTo,
      },
      amount: total,
      fee,
    });

    await this.dataSource
      .getRepository(TransactionBlockchainModel)
      .create({
        order: {
          id: orderId,
        },
        transaction: { id: transactionId },
        status: result.isSuccess
          ? TransactionBlockchainStatusEnum.done
          : TransactionBlockchainStatusEnum.error,
        ...result,
      })
      .save();
    if (!result.isSuccess) {
      throw new Error('Order payment error');
    }
  }

  static encryptNFT(item: string, key: string) {
    return encrypt(item, process.env.PLATFORM_KEY, key);
  }

  static decryptNFT(item: string, key: string) {
    return decrypt(item, process.env.PLATFORM_KEY, key);
  }
}
