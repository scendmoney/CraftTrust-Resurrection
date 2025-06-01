import { registerEnumType } from '@nestjs/graphql';

export enum CustomerIoTypesEnum {
  buyerInvitation = 'Buyer Invitation',
  buyerInvitationAccepted = 'Buyer Invitation Accepted',
  buyerInvitationCanceled = 'Buyer Invitation Canceled',
  cartProductAdded = 'Product Added',
  cartProductRemoved = 'Product Removed',
  cartUpdated = 'Cart Updated',
  cartViewed = 'Cart Viewed',
  chatStarted = 'Chat Started: Buyer to Cultivator',
  checkoutCompleted = 'Checkout Completed',
  checkoutStarted = 'Checkout Started',
  deleteCart = 'Cart Deleted',
  facilityIdentify = 'Facility Identify',
  orderCancelled = 'Order Cancelled',
  orderCompleted = 'Order Completed',
  orderCreated = 'Order Created',
  orderUpdated = 'Order Updated',
  productClicked = 'Product Clicked',
  productListing = 'Product Listing',
  productUnlisted = 'Product Unlisted',
  productViewed = 'Product Viewed',
  repeatPurchase = 'Repeat Purchase',
}

registerEnumType(CustomerIoTypesEnum, { name: 'CustomerIoTypesEnum' });
