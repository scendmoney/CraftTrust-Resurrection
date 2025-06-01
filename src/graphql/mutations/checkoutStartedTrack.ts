import { gql } from '@apollo/client';

const CHECKOUT_STARTED_TRACK = gql`
  mutation checkoutStartedTrack($cartId: Float!) {
    checkoutStartedTrack(cartId: $cartId)
  }
`;
export default CHECKOUT_STARTED_TRACK;
