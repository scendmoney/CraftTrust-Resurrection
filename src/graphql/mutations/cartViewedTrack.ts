import { gql } from '@apollo/client';

const CART_VIEWED_TRACK = gql`
  mutation cartViewedTrack {
    cartViewedTrack
  }
`;
export default CART_VIEWED_TRACK;
