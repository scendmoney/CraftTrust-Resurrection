import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CustomerIoTypesEnum } from './customerio.enum';
import { CustomerIoDataService } from './customerio.service';

@Injectable()
export default class CustomerIoDataListener {
  constructor(private readonly customerIoDataService: CustomerIoDataService) {}

  @OnEvent(CustomerIoTypesEnum.buyerInvitation)
  private async buyerInvitation(data) {
    await this.customerIoDataService.inviteBuyerTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.buyerInvitationCanceled)
  private async buyerInvitationCanceled(data) {
    await this.customerIoDataService.inviteBuyerCanceledTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.buyerInvitationAccepted)
  private async buyerInvitationAccepted(data) {
    await this.customerIoDataService.inviteBuyerAcceptedTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.cartUpdated)
  private async cartUpdated(data) {
    await this.customerIoDataService.cartUpdatedTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.cartProductAdded)
  private async cartProductAdded(data) {
    await this.customerIoDataService.cartProductAddedTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.cartProductRemoved)
  private async cartProductRemoved(data) {
    await this.customerIoDataService.cartProductRemovedTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.deleteCart)
  private async deleteCart(data) {
    await this.customerIoDataService.deleteCartTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.facilityIdentify)
  private async facilityIdentify(data) {
    await this.customerIoDataService.facilityIdentify(data);
  }

  @OnEvent(CustomerIoTypesEnum.orderCancelled)
  private async orderCancelled(data) {
    await this.customerIoDataService.orderCanceledTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.orderCompleted)
  private async orderCompleted(data) {
    await this.customerIoDataService.orderCompletedTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.orderCreated)
  private async orderCreated(data) {
    await this.customerIoDataService.orderCreatedTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.orderUpdated)
  private async orderUpdated(data) {
    await this.customerIoDataService.orderUpdatedTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.productListing)
  private async productListing(data) {
    await this.customerIoDataService.productTrackListed(data);
  }

  @OnEvent(CustomerIoTypesEnum.productUnlisted)
  private async productUnlisted(data) {
    await this.customerIoDataService.productTrackUnlisted(data);
  }

  @OnEvent(CustomerIoTypesEnum.repeatPurchase)
  private async repeatPurchase(data) {
    await this.customerIoDataService.orderRepeatPurchaseTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.cartViewed)
  private async cartViewed(data) {
    await this.customerIoDataService.cartViewedTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.checkoutStarted)
  private async checkoutStarted(data) {
    await this.customerIoDataService.checkoutStartedTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.productViewed)
  private async productViewed(data) {
    await this.customerIoDataService.productViewedTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.productClicked)
  private async productClicked(data) {
    await this.customerIoDataService.productClickedTrack(data);
  }

  @OnEvent(CustomerIoTypesEnum.chatStarted)
  private async chatStarted(data) {
    await this.customerIoDataService.chatStartedTrack(data);
  }
}
