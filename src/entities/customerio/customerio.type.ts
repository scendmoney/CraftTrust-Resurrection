import { InviteTypeEnum } from '@entities/invite/invite.enum';

export interface IDeleteCartTrack {
  cart_id: number;
  cultivator_id: string;
  cultivator_email: string;
  cultivator_phone: string;
}

export interface IInviteBuyerTrack {
  inviteId: number;
  type: InviteTypeEnum;
}

export interface IInviteBuyerAcceptedTrack {
  invite_id: number;
  cultivator_id: string;
  cultivator_email: string;
  cultivator_phone: string;
  phone: string;
  name: string;
  buyer_id: string;
  buyer_email: string;
  buyer_phone: string;
}

export interface IOrderCanceledTrack {
  orderId: number;
  facilityId: string;
}

export interface ICartProductRemovedTrack {
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
  total: number;
}

export interface ICartProductAddedTrack {
  cartId: number;
  cartItemId: number;
}

export interface IOrderCreatedTrack {
  cartId: number;
  orderId: number;
}

export interface ICheckoutStartedTrack {
  cartId: number;
  facilityId: string;
}

export interface IChatStartedTrack {
  buyerId: string;
  cultivatorId: string;
}
