import { gql } from '@apollo/client';

const UPDATE_ORDER_PACKAGE = gql`
  mutation updateOrderPackage($payload: UpdateOrderPackageInput!) {
    updateOrderPackage(payload: $payload) {
      id
      total
      quantity
      parentProduct {
        id
      }
      order {
        id
      }
    }
  }
`;
export default UPDATE_ORDER_PACKAGE;
