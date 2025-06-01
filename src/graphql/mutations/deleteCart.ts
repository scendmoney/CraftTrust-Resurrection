import { gql } from '@apollo/client';

const DELETE_CART = gql`
  mutation deleteCart($payload: GetIdDTO!) {
    deleteCart(payload: $payload) {
      id
    }
  }
`;
export default DELETE_CART;
