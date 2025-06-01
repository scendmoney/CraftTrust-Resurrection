import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerIoTypesEnum } from '@entities/customerio/customerio.enum';
import { CartModel } from '@entities/cart/cart.model';
import { DataSource } from 'typeorm';

@Resolver()
export class CustomerIoDataResolver {
  constructor(
    private eventEmitter: EventEmitter2,
    private readonly dataSource: DataSource,
  ) {}

  @Mutation(() => Boolean, {
    description: '@protected - Checkout Started Track',
  })
  @UseGuards(AuthGuardUser)
  async checkoutStartedTrack(
    @Args('cartId', {
      type: () => Number,
      nullable: false,
    })
    cartId: number,
    @CurrentCtx() { user },
  ): Promise<boolean> {
    this.eventEmitter.emit(CustomerIoTypesEnum.checkoutStarted, {
      cartId,
      facilityId: user.__context__.id,
    });
    return true;
  }

  @Mutation(() => Boolean, {
    description: '@protected - Product Viewed Track',
  })
  @UseGuards(AuthGuardUser)
  async productViewedTrack(
    @Args('productId', {
      type: () => Number,
      nullable: false,
    })
    productId: number,
  ): Promise<boolean> {
    this.eventEmitter.emit(CustomerIoTypesEnum.productViewed, productId);
    return true;
  }

  @Mutation(() => Boolean, {
    description: '@protected - Product Clicked Track',
  })
  @UseGuards(AuthGuardUser)
  async productClickedTrack(
    @Args('productId', {
      type: () => Number,
      nullable: false,
    })
    productId: number,
  ): Promise<boolean> {
    this.eventEmitter.emit(CustomerIoTypesEnum.productClicked, productId);
    return true;
  }

  @Mutation(() => Boolean, {
    description: '@protected - Cart Viewed Track',
  })
  @UseGuards(AuthGuardUser)
  async cartViewedTrack(@CurrentCtx() { user }): Promise<boolean> {
    const carts = await this.dataSource.getRepository(CartModel).find({
      where: {
        facilityBuyer: {
          id: user?.__context__?.id || -1,
        },
      },
      select: ['id'],
    });

    carts.forEach((cart) =>
      this.eventEmitter.emit(CustomerIoTypesEnum.cartViewed, cart.id),
    );
    return true;
  }
}
