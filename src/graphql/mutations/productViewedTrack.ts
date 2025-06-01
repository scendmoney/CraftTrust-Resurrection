import { gql } from '@apollo/client';

const PRODUCT_VIEWED_TRACK = gql`
  mutation productViewedTrack($productId: Float!) {
    productViewedTrack(productId: $productId)
  }
`;
export default PRODUCT_VIEWED_TRACK;
