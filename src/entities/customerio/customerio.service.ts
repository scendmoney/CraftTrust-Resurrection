import { CONFIG } from '@config/index';
import { FacilityModel } from '@entities/facility/facility.model';
import { OrderModel } from '@entities/order/order.model';
import { ProductModel } from '@entities/product/product.model';
import { Injectable } from '@nestjs/common';
import { StorageService } from 'libs/storage/src';
import moment from 'moment';
import { DataSource, IsNull, Not } from 'typeorm';
import {
  ICartProductAddedTrack,
  ICartProductRemovedTrack,
  IChatStartedTrack,
  ICheckoutStartedTrack,
  IDeleteCartTrack,
  IInviteBuyerTrack,
  IOrderCanceledTrack,
  IOrderCreatedTrack,
} from './customerio.type';
import { InviteModel } from '@entities/invite/invite.model';
import { InviteTypeEnum } from '@entities/invite/invite.enum';
import { CartModel } from '@entities/cart/cart.model';
import { CustomerIoTypesEnum } from './customerio.enum';
import CustomerioService from 'libs/customerio/src/customerio.service';

@Injectable()
export class CustomerIoDataService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly customerioService: CustomerioService,
  ) {}

  async facilityIdentify(facilityId: string) {
    const facility = await this.dataSource
      .getRepository(FacilityModel)
      .findOne({
        where: {
          id: facilityId,
          owner: Not(IsNull()),
        },
        relations: ['owner'],
      });
    if (!facility) {
      return;
    }

    await this.customerioService.getClientAnalytics().identify({
      userId: CustomerIoDataService.getUserId(facility.id),
      traits: {
        createdDate: new Date(),
        updatedDate: new Date(),
        facility: CustomerIoDataService.getFacilityData(facility),
        admin_id: null,
        admin_email: null,
        admin_phone: null,
      },
    });
  }

  async deleteCartTrack(data: IDeleteCartTrack) {
    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(data.cultivator_id),

      event: CustomerIoTypesEnum.deleteCart,
      properties: {
        cart_id: data.cart_id,
        cultivator_id: data.cultivator_id,
        cultivator_email: data.cultivator_email || '',
        cultivator_phone: data.cultivator_phone || null,
      },
    });
  }

  async productTrackListed(productId: number) {
    const product = await this.dataSource.getRepository(ProductModel).findOne({
      where: {
        id: productId,
      },
      relations: ['facility', 'thumbnail', 'item'],
    });

    const facility = product.__facility__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facility.id),
      event: CustomerIoTypesEnum.productListing,
      properties: {
        ...CustomerIoDataService.getProductData(product),
        cultivator_facility: CustomerIoDataService.getFacilityData(facility),
      },
    });
  }

  async productTrackUnlisted(productId: number) {
    const product = await this.dataSource.getRepository(ProductModel).findOne({
      where: {
        id: productId,
      },
      relations: ['facility', 'thumbnail', 'item'],
    });

    const facility = product.__facility__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facility.id),
      event: CustomerIoTypesEnum.productUnlisted,
      properties: {
        ...CustomerIoDataService.getProductData(product),
        cultivator_facility: CustomerIoDataService.getFacilityData(facility),
      },
    });
  }

  async cartUpdatedTrack(cartId: number) {
    const cart = await this.dataSource.getRepository(CartModel).findOne({
      where: {
        id: cartId,
      },
      relations: [
        'facilityBuyer.owner',
        'facilityCultivator.owner',
        'cartItems.product.thumbnail',
      ],
    });

    const facilityBuyer = cart.__facilityBuyer__;
    const facilityCultivator = cart.__facilityCultivator__;
    const cartItems = cart.__cartItems__;
    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityBuyer.id),
      event: CustomerIoTypesEnum.cartUpdated,
      properties: {
        cart_id: cartId,
        products: cartItems.map((cartItem) => ({
          quantity: cartItem.quantity,
          unit_price: cartItem.price,
          total: cartItem.__product__.price * (cartItem.quantity / 0.25),
          product: CustomerIoDataService.getProductData(cartItem.__product__),
        })),
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
        buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
      },
    });
  }

  async cartProductAddedTrack({ cartId, cartItemId }: ICartProductAddedTrack) {
    const cart = await this.dataSource.getRepository(CartModel).findOne({
      where: {
        id: cartId,
      },
      relations: [
        'facilityBuyer.owner',
        'facilityCultivator.owner',
        'cartItems.product.thumbnail',
      ],
    });

    const facilityBuyer = cart.__facilityBuyer__;
    const facilityCultivator = cart.__facilityCultivator__;
    const cartItem = cart.__cartItems__.find(({ id }) => id === cartItemId);

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityBuyer.id),
      event: CustomerIoTypesEnum.cartProductAdded,
      properties: {
        cart_id: cartId,
        product: {
          quantity: cartItem.quantity,
          unit_price: cartItem.price,
          total: cartItem.__product__.price * (cartItem.quantity / 0.25),
          product: CustomerIoDataService.getProductData(cartItem.__product__),
        },
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
        buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
      },
    });
  }

  async cartProductRemovedTrack({
    cartId,
    productId,
    quantity,
    price,
    total,
  }: ICartProductRemovedTrack) {
    const [cart, product] = await Promise.all([
      this.dataSource.getRepository(CartModel).findOne({
        where: {
          id: cartId,
        },
        relations: ['facilityBuyer.owner', 'facilityCultivator.owner'],
      }),
      this.dataSource.getRepository(ProductModel).findOne({
        where: {
          id: productId,
        },
        relations: ['thumbnail'],
      }),
    ]);

    const facilityBuyer = cart.__facilityBuyer__;
    const facilityCultivator = cart.__facilityCultivator__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityBuyer.id),
      event: CustomerIoTypesEnum.cartProductRemoved,
      properties: {
        cart_id: cartId,
        product: {
          quantity: quantity,
          unit_price: price,
          total: total,
          product: CustomerIoDataService.getProductData(product),
        },
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
        buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
      },
    });
  }

  async orderCreatedTrack({ orderId, cartId }: IOrderCreatedTrack) {
    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: orderId,
      },
      relations: [
        'facilityBuyer.owner',
        'facilityCultivator.owner',
        'contactPerson',
        'products.product',
        'products.parentProduct',
      ],
    });

    const facilityBuyer = order.__facilityBuyer__;
    const facilityCultivator = order.__facilityCultivator__;

    await Promise.all([
      this.customerioService.getClientAnalytics().track({
        userId: CustomerIoDataService.getUserId(facilityBuyer.id),
        event: CustomerIoTypesEnum.orderCreated,
        properties: {
          order_id: order.id,
          cart_id: cartId,
          total: order.total,
          created_date: order.dates.createdDate,
          phone: order.phone || null,
          zip: order.zip || null,
          address: order.address || null,
          city: order.city || null,
          comments: order.comments || null,
          shipping_type: order.shippingType,
          payment_type: order.paymentType,
          payment_status: order.paymentStatus,
          contact_person_id: order.__contactPerson__?.id || null,
          contact_person_email: order.__contactPerson__?.email || null,
          contact_person_phone: order.__contactPerson__?.phoneNumber || null,
          products: order.__products__.map((orderProduct) => ({
            quantity: orderProduct.quantity,
            unit_price: orderProduct.price,
            total: orderProduct.total,
            product: CustomerIoDataService.getProductData(
              orderProduct.__product__,
            ),
            parent_product: CustomerIoDataService.getProductData(
              orderProduct.__parentProduct__,
            ),
          })),
          cultivator_facility:
            CustomerIoDataService.getFacilityData(facilityCultivator),
          buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
        },
      }),
      this.customerioService.getClientAnalytics().track({
        userId: CustomerIoDataService.getUserId(facilityBuyer.id),
        event: CustomerIoTypesEnum.checkoutCompleted,
        properties: {
          cart_id: cartId,
          order_id: orderId,
          products: order.__products__.map((orderProduct) => ({
            quantity: orderProduct.quantity,
            unit_price: orderProduct.price,
            total:
              orderProduct.__parentProduct__.price *
              (orderProduct.quantity / 0.25),
            product: CustomerIoDataService.getProductData(
              orderProduct.__parentProduct__,
            ),
          })),
          cultivator_facility:
            CustomerIoDataService.getFacilityData(facilityCultivator),
          buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
        },
      }),
    ]);
  }

  async orderUpdatedTrack(orderId: number) {
    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: orderId,
      },
      relations: [
        'facilityBuyer.owner',
        'facilityCultivator.owner',
        'contactPerson',
        'products.product',
        'products.parentProduct',
      ],
    });

    const facilityBuyer = order.__facilityBuyer__;
    const facilityCultivator = order.__facilityCultivator__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityCultivator.id),
      event: CustomerIoTypesEnum.orderUpdated,
      properties: {
        order_id: order.id,
        total: order.total,
        created_date: order.dates.createdDate,
        phone: order.phone || null,
        zip: order.zip || null,
        address: order.address || null,
        city: order.city || null,
        comments: order.comments || null,
        shipping_type: order.shippingType,
        payment_type: order.paymentType,
        payment_status: order.paymentStatus,
        contact_person_id: order.__contactPerson__?.id || null,
        contact_person_email: order.__contactPerson__?.email || null,
        contact_person_phone: order.__contactPerson__?.phoneNumber || null,
        products: order.__products__.map((orderProduct) => ({
          quantity: orderProduct.quantity,
          unit_price: orderProduct.price,
          total: orderProduct.total,
          product: CustomerIoDataService.getProductData(
            orderProduct.__product__,
          ),
          parent_product: CustomerIoDataService.getProductData(
            orderProduct.__parentProduct__,
          ),
        })),
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
        buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
      },
    });
  }

  async orderCompletedTrack(orderId: number) {
    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: orderId,
      },
      relations: [
        'facilityBuyer.owner',
        'facilityCultivator.owner',
        'contactPerson',
        'products.product',
        'products.parentProduct',
      ],
    });

    const facilityBuyer = order.__facilityBuyer__;
    const facilityCultivator = order.__facilityCultivator__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityCultivator.id),
      event: CustomerIoTypesEnum.orderCompleted,
      properties: {
        order_id: order.id,
        total: order.total,
        created_date: order.dates.createdDate,
        phone: order.phone || null,
        zip: order.zip || null,
        address: order.address || null,
        city: order.city || null,
        comments: order.comments || null,
        shipping_type: order.shippingType,
        payment_type: order.paymentType,
        payment_status: order.paymentStatus,
        contact_person_id: order.__contactPerson__?.id || null,
        contact_person_email: order.__contactPerson__?.email || null,
        contact_person_phone: order.__contactPerson__?.phoneNumber || null,
        products: order.__products__.map((orderProduct) => ({
          quantity: orderProduct.quantity,
          unit_price: orderProduct.price,
          total: orderProduct.total,
          product: CustomerIoDataService.getProductData(
            orderProduct.__product__,
          ),
          parent_product: CustomerIoDataService.getProductData(
            orderProduct.__parentProduct__,
          ),
        })),
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
        buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
      },
    });
  }

  async orderCanceledTrack({ orderId, facilityId }: IOrderCanceledTrack) {
    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: orderId,
      },
      relations: [
        'facilityBuyer.owner',
        'facilityCultivator.owner',
        'contactPerson',
        'products.product',
        'products.parentProduct',
      ],
    });

    const facilityBuyer = order.__facilityBuyer__;
    const facilityCultivator = order.__facilityCultivator__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityId),
      event: CustomerIoTypesEnum.orderCancelled,
      properties: {
        order_id: order.id,
        total: order.total,
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
        buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
      },
    });
  }

  async orderRepeatPurchaseTrack(orderId: number) {
    const order = await this.dataSource.getRepository(OrderModel).findOne({
      where: {
        id: orderId,
      },
      relations: ['facilityBuyer.owner', 'facilityCultivator.owner'],
    });

    const facilityBuyer = order.__facilityBuyer__;
    const facilityCultivator = order.__facilityCultivator__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityBuyer.id),
      event: CustomerIoTypesEnum.repeatPurchase,
      properties: {
        order_id: order.id,
        total: order.total,
        created_date: order.dates.createdDate,
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
        buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
      },
    });
  }

  async inviteBuyerTrack({ inviteId, type }: IInviteBuyerTrack) {
    if (type !== InviteTypeEnum.buyer) {
      return;
    }
    const invite = await this.dataSource.getRepository(InviteModel).findOne({
      where: {
        id: inviteId,
      },
      relations: ['facility.owner'],
    });

    const facilityCultivator = invite.__facility__;
    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityCultivator.id),
      event: CustomerIoTypesEnum.buyerInvitation,
      properties: {
        invite_id: inviteId,
        phone: invite.phone,
        name: invite.name,
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
      },
    });
  }

  async inviteBuyerCanceledTrack({ inviteId, type }: IInviteBuyerTrack) {
    if (type !== InviteTypeEnum.buyer) {
      return;
    }
    const invite = await this.dataSource.getRepository(InviteModel).findOne({
      where: {
        id: inviteId,
      },
      relations: ['facility.owner'],
    });

    const facilityCultivator = invite.__facility__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityCultivator.id),
      event: CustomerIoTypesEnum.buyerInvitationCanceled,
      properties: {
        invite_id: inviteId,
        phone: invite.phone,
        name: invite.name,
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
      },
    });
  }

  async inviteBuyerAcceptedTrack({ inviteId, type }: IInviteBuyerTrack) {
    if (type !== InviteTypeEnum.buyer) {
      return;
    }
    const invite = await this.dataSource.getRepository(InviteModel).findOne({
      where: {
        id: inviteId,
      },
      relations: ['facility.owner', 'relationFacility.owner'],
    });

    const facilityBuyer = invite.__relationFacility__;
    const facilityCultivator = invite.__facility__;
    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityCultivator.id),
      event: CustomerIoTypesEnum.buyerInvitationAccepted,
      properties: {
        invite_id: inviteId,
        phone: invite.phone,
        name: invite.name,
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
        buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
      },
    });
  }

  async cartViewedTrack(cartId: number) {
    const cart = await this.dataSource.getRepository(CartModel).findOne({
      where: {
        id: cartId,
      },
      relations: [
        'facilityBuyer.owner',
        'facilityCultivator.owner',
        'cartItems.product.thumbnail',
      ],
    });

    const facilityBuyer = cart.__facilityBuyer__;
    const facilityCultivator = cart.__facilityCultivator__;
    const cartItems = cart.__cartItems__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityBuyer.id),
      event: CustomerIoTypesEnum.cartViewed,
      properties: {
        cart_id: cartId,
        products: cartItems.map((cartItem) => ({
          quantity: cartItem.quantity,
          unit_price: cartItem.price,
          total: cartItem.__product__.price * (cartItem.quantity / 0.25),
          product: CustomerIoDataService.getProductData(cartItem.__product__),
        })),
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
        buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
      },
    });
  }

  async checkoutStartedTrack({ cartId, facilityId }: ICheckoutStartedTrack) {
    const cart = await this.dataSource.getRepository(CartModel).findOne({
      where: {
        id: cartId,
        facilityBuyer: {
          id: facilityId,
        },
      },
      relations: [
        'facilityBuyer.owner',
        'facilityCultivator.owner',
        'cartItems.product.thumbnail',
      ],
    });
    if (!cart) return;

    const facilityBuyer = cart.__facilityBuyer__;
    const facilityCultivator = cart.__facilityCultivator__;
    const cartItems = cart.__cartItems__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facilityBuyer.id),
      event: CustomerIoTypesEnum.checkoutStarted,
      properties: {
        cart_id: cartId,
        products: cartItems.map((cartItem) => ({
          quantity: cartItem.quantity,
          unit_price: cartItem.price,
          total: cartItem.__product__.price * (cartItem.quantity / 0.25),
          product: CustomerIoDataService.getProductData(cartItem.__product__),
        })),
        cultivator_facility:
          CustomerIoDataService.getFacilityData(facilityCultivator),
        buyer_facility: CustomerIoDataService.getFacilityData(facilityBuyer),
      },
    });
  }

  async productViewedTrack(productId: number) {
    const product = await this.dataSource.getRepository(ProductModel).findOne({
      where: {
        id: productId,
      },
      relations: ['facility', 'thumbnail', 'item'],
    });

    const facility = product.__facility__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facility.id),
      event: CustomerIoTypesEnum.productViewed,
      properties: {
        ...CustomerIoDataService.getProductData(product),
        cultivator_facility: CustomerIoDataService.getFacilityData(facility),
      },
    });
  }

  async productClickedTrack(productId: number) {
    const product = await this.dataSource.getRepository(ProductModel).findOne({
      where: {
        id: productId,
      },
      relations: ['facility', 'thumbnail', 'item'],
    });

    const facility = product.__facility__;

    await this.customerioService.getClientAnalytics().track({
      userId: CustomerIoDataService.getUserId(facility.id),
      event: CustomerIoTypesEnum.productClicked,
      properties: {
        ...CustomerIoDataService.getProductData(product),
        cultivator_facility: CustomerIoDataService.getFacilityData(facility),
      },
    });
  }

  async chatStartedTrack({ buyerId, cultivatorId }: IChatStartedTrack) {
    await Promise.all([
      this.customerioService.getClientAnalytics().track({
        userId: CustomerIoDataService.getUserId(buyerId),
        event: CustomerIoTypesEnum.chatStarted,
        properties: {
          buyerId,
          cultivatorId,
        },
      }),
      this.customerioService.getClientAnalytics().track({
        userId: CustomerIoDataService.getUserId(cultivatorId),
        event: CustomerIoTypesEnum.chatStarted,
        properties: {
          buyerId,
          cultivatorId,
        },
      }),
    ]);
  }

  static getProductData(product: ProductModel) {
    return product
      ? {
          product_id: product.id,
          name: product.item?.name,
          category_type: product.item?.productCategoryType,
          category_name: product.item?.productCategoryName,
          url: `${CONFIG.platform.platformUrl}/client/products/${product.id}`,
          image_url: product.__thumbnail__
            ? StorageService.getCDNPath(product.__thumbnail__?.path)
            : null,
          strain: product.item.strainName,
          description: product.description,
          metrc_id: product.id,
          unit_price: product.price,
          quantity: product.quantityStock,
        }
      : {};
  }

  static getFacilityData(facility: FacilityModel) {
    return {
      facility_id: facility?.id || null,
      email: facility?.email || null,
      phone: facility?.phoneNumber || null,
      display_name: facility?.displayName || null,
      name: facility?.name || null,
      address: {
        zip: facility?.address?.zip,
        country: facility?.address?.country,
        city: facility?.address?.city,
        address: facility?.address?.address,
        google_place: facility?.address?.googlePlaceId,
        full_address: facility?.address?.fullAddress,
      },
      license_number: facility?.id || null,
      license_type: facility?.license?.licenseType || null,
      license_expiry_date: facility?.license?.licenseEndDate
        ? moment(facility?.license?.licenseEndDate)
        : null,
    };
  }

  static getUserId(userId: string): string {
    return `${userId}${
      CONFIG.platform.ENV != 'prod' ? `_${CONFIG.platform.ENV}` : ''
    }`;
  }
}
