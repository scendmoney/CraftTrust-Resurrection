import { gql } from '@apollo/client';

const SYNC_PRODUCTS = gql`
  mutation syncProducts {
    syncProducts
  }
`;
export default SYNC_PRODUCTS;
