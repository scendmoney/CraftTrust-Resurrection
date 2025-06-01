import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderModel } from './order.model';
import axios from 'axios';
import OrderService from './order.service';

@Resolver(() => OrderModel)
export default class OrderResolveField {
  @ResolveField('verificationCode')
  async verificationCode(
    @Parent() order: OrderModel,
    @Context() context,
  ): Promise<number> {
    const user = context.user;

    if (!order?.__facilityBuyer__?.id) {
      await order.facilityBuyer;
    }

    return user?.__context__?.id === order?.__facilityBuyer__?.id
      ? order?.verificationCode
      : 0;
  }

  @ResolveField('nft')
  async nft(
    @Parent() order: OrderModel,
  ): Promise<Record<string, unknown> | null> {
    if (order.ipfs) {
      const response = await axios.get(`https://ipfs.io/ipfs/${order.ipfs}`);
      const decodedJson = JSON.parse(
        JSON.stringify(response?.data),
        (key, value) => {
          const decodeFields = [
            'creator',
            'uri',
            'name',
            'description',
            'image',
            'amount',
            'symbolPrice',
            'total',
            'quantity',
            'productId',
          ];
          let newValue = value;
          if (decodeFields.includes(key) && response?.data.creatorDID) {
            try {
              newValue = OrderService.decryptNFT(
                value,
                response?.data.creatorDID,
              );
            } catch (_) {}
          }

          if (key === 'image') {
            newValue = newValue.replace('ipfs://', 'https://ipfs.io/ipfs/');
          }

          return newValue;
        },
      );
      return decodedJson;
    }
    return null;
  }
}
