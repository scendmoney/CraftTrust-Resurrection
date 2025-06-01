import { gql } from '@apollo/client';

const PRODUCT_CLICKED_TRACK = gql`
  mutation productClickedTrack($productId: Float!) {
    productClickedTrack(productId: $productId)
  }
`;
export default PRODUCT_CLICKED_TRACK;
