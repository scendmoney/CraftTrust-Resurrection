import { gql } from '@apollo/client';

const UPDATE_ORDER_STATUS = gql`
  mutation updateOrderStatus($payload: UpdateOrderStatusInput!) {
    updateOrderStatus(payload: $payload) {
      id
      status
      paymentStatus
    }
  }
`;
export default UPDATE_ORDER_STATUS;
