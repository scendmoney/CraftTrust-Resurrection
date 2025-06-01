import { gql } from '@apollo/client';

const UPDATE_CART_ITEM = gql`
  mutation updateCartItem($payload: UpdateCartInput!) {
    updateCartItem(payload: $payload) {
      id
      total
      costProducts
      cartItems {
        id
        price
        total
        quantity
        product {
          id
        }
      }
    }
  }
`;
export default UPDATE_CART_ITEM;
