import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DataSource, In } from 'typeorm';
import { CartModel } from './cart.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { FacilityRoleEnum } from '@entities/facility/facility.enum';
import { UpdateCartInput } from './cart.input';
import ErrorMsgEnum from '@enums/error';
import FacilityToFacilityModel from '@entities/facility_to_facility/facility_to_facility.model';
import { ProductModel } from '@entities/product/product.model';
import { CartItemModel } from '@entities/cart_item/cart_item.model';
import { ProductStatusEnum } from '@entities/product/product.enum';
import { GetIdDTO } from '@common/query/query.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerIoTypesEnum } from '@entities/customerio/customerio.enum';
import ConfigurationModel from '@entities/configuration/configuration.model';
import { ConfigurationTypesEnum } from '@entities/configuration/configuration.enum';

@Resolver(() => CartModel)
export class CartResolver {
  constructor(
    private readonly dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {}

  @Query(() => [CartModel], {
    description: '@protected - cart',
  })
  @UseGuards(AuthGuardUser)
  async carts(@CurrentCtx() { user, relations }): Promise<CartModel[]> {
    const carts = await this.dataSource.getRepository(CartModel).find({
      where: {
        facilityBuyer: {
          role: In([
            FacilityRoleEnum.buyer,
            FacilityRoleEnum.buyerAndCultivator,
          ]),
          id: user?.__context__?.id || -1,
        },
      },
      relations,
    });

    return carts;
  }

  @Query(() => CartModel, {
    description: '@protected - cart by id',
  })
  @UseGuards(AuthGuardUser)
  async cartById(
    @CurrentCtx() { user, relations },
    @Args('payload', {
      type: () => GetIdDTO,
      nullable: false,
    })
    { id }: GetIdDTO,
  ): Promise<CartModel> {
    const cart = await this.dataSource.getRepository(CartModel).findOne({
      where: {
        id: id,
        facilityBuyer: {
          role: In([
            FacilityRoleEnum.buyer,
            FacilityRoleEnum.buyerAndCultivator,
          ]),
          id: user.__context__.id,
        },
      },
      relations: [...relations, 'facilityBuyer', 'facilityCultivator'],
    });
    if (!cart) throw Error(ErrorMsgEnum.CartNotExist);
    return cart;
  }

  @Mutation(() => [CartModel], {
    description: '@protected - Update cart item',
  })
  @UseGuards(AuthGuardUser)
  async updateCartItem(
    @Args('payload', {
      type: () => UpdateCartInput,
      nullable: false,
    })
    payload: UpdateCartInput,
    @CurrentCtx() { user, relations },
  ): Promise<CartModel[]> {
    const [cartDb, relationsFacility] = await Promise.all([
      this.dataSource.getRepository(CartModel).findOne({
        where: {
          facilityBuyer: {
            id: user.__context__.id,
          },
          facilityCultivator: {
            id: payload.cultivatorId,
          },
        },
        relations: ['cartItems.product'],
      }),
      this.dataSource.getRepository(FacilityToFacilityModel).findOne({
        where: {
          facilityBuyer: {
            id: user.__context__.id,
          },
          facilityCultivator: {
            id: payload.cultivatorId,
          },
        },
        relations: ['facilityCultivator.owner', 'facilityBuyer'],
      }),
    ]);

    let cart = cartDb;

    const facilityBuyer = relationsFacility?.__facilityBuyer__;

    if (!facilityBuyer) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }

    if (!relationsFacility) {
      throw new Error(ErrorMsgEnum.FacilityNotRelation);
    }

    if (payload.quantity !== 0) {
      const productDb = await this.dataSource
        .getRepository(ProductModel)
        .findOne({
          where: {
            id: payload.productId,
            status: ProductStatusEnum.listed,
            facility: {
              id: payload.cultivatorId,
            },
          },
        });

      if (!productDb) {
        throw new Error(ErrorMsgEnum.ProductNotExist);
      }

      if (productDb.quantityStock < payload.quantity) {
        throw new Error(ErrorMsgEnum.ProductQuantityIsNotEnough);
      }

      if (
        Number(payload.quantity) < Number(productDb.quantityStockMin) ||
        payload.quantity % 0.25 !== 0
      ) {
        throw new Error(ErrorMsgEnum.ProductQuantityWrong);
      }

      if (!cart) {
        cart = await this.dataSource
          .getRepository(CartModel)
          .create({
            facilityBuyer: {
              id: user.__context__.id,
            },
            facilityCultivator: {
              id: payload.cultivatorId,
            },
          })
          .save();
      }

      const existCartItem = cart.__cartItems__?.find(
        (cartItem) => cartItem.__product__.id === payload.productId,
      );
      const cartItem = await this.dataSource
        .getRepository(CartItemModel)
        .create({
          id: existCartItem?.id || null,
          cart: {
            id: cart.id,
          },
          product: {
            id: payload.productId,
          },
          price: productDb.price,
          quantity: payload.quantity,
          total: productDb.price * (payload.quantity / 0.25),
        })
        .save();
      this.eventEmitter.emit(CustomerIoTypesEnum.cartProductAdded, {
        cartId: cart.id,
        cartItemId: cartItem.id,
      });
    } else if (cart) {
      if (cartDb?.__cartItems__.length === 1) {
        const facilityCultivator = relationsFacility.__facilityCultivator__;
        await this.dataSource.getRepository(CartModel).softRemove(cartDb);
        this.eventEmitter.emit(CustomerIoTypesEnum.deleteCart, {
          cart_id: cart.id,
          cultivator_id: facilityCultivator.id,
          cultivator_email:
            facilityCultivator.email || facilityCultivator.__owner__?.email,
          cultivator_phone:
            facilityCultivator.phoneNumber ||
            facilityCultivator.__owner__?.phoneNumber ||
            '-',
        });
        return this.carts({ user, relations });
      } else {
        const cartItem = cartDb.__cartItems__.find(
          (cartItem) => cartItem.__product__?.id === payload.productId,
        );
        this.eventEmitter.emit(CustomerIoTypesEnum.cartProductRemoved, {
          cartId: cart.id,
          productId: payload.productId,
          quantity: cartItem.quantity || 0,
          price: cartItem.price || 0,
          total: cartItem.total || 0,
        });

        await this.dataSource.getRepository(CartItemModel).delete({
          cart: {
            id: cart.id,
          },
          product: {
            id: payload.productId,
          },
        });
      }
    }

    const fee = await this.dataSource
      .getRepository(ConfigurationModel)
      .findOne({
        where: {
          type: ConfigurationTypesEnum.commissionOrderBuyer,
        },
      });

    const feeValue = isNaN(Number(fee?.value || 0))
      ? 0
      : Number(fee?.value || 0);

    await this.dataSource.getRepository(CartModel).update(cart.id, {
      fee: () =>
        `
        (SELECT sum(cart_item.total) * ${feeValue} / 100
        FROM public.cart_item cart_item
        where cart_id = ${cart.id} and cart_item.deleted_date is null)
      `,
      costProducts: () =>
        `
        (SELECT sum(cart_item.total)
        FROM public.cart_item cart_item
        where cart_id = ${cart.id} and cart_item.deleted_date is null)
      `,
      total: () =>
        `
        (SELECT sum(cart_item.total) + sum(cart_item.total) * ${feeValue}/100
        FROM public.cart_item cart_item
        where cart_id = ${cart.id} and cart_item.deleted_date is null)
      `,
    });

    this.eventEmitter.emit(CustomerIoTypesEnum.cartUpdated, cart.id);
    return this.carts({ user, relations });
  }

  @Mutation(() => [CartModel], {
    description: '@protected - Delete cart',
  })
  @UseGuards(AuthGuardUser)
  async deleteCart(
    @Args('payload', {
      type: () => GetIdDTO,
      nullable: false,
    })
    { id }: GetIdDTO,
    @CurrentCtx() { user, relations },
  ): Promise<CartModel[]> {
    const cart = await this.dataSource.getRepository(CartModel).findOne({
      where: {
        id,
        facilityBuyer: {
          id: user.__context__.id,
        },
      },
      relations: ['cartItems', 'facilityCultivator.owner'],
    });

    if (cart) {
      await this.dataSource.getRepository(CartModel).softRemove(cart);
      const facilityCultivator = cart.__facilityCultivator__;
      this.eventEmitter.emit(CustomerIoTypesEnum.deleteCart, {
        cart_id: cart.id,
        cultivator_id: facilityCultivator.id,
        cultivator_email:
          facilityCultivator.email || facilityCultivator.__owner__?.email,
        cultivator_phone:
          facilityCultivator.phoneNumber ||
          facilityCultivator.__owner__?.phoneNumber ||
          '-',
      });
    }

    return this.carts({ user, relations });
  }
}
