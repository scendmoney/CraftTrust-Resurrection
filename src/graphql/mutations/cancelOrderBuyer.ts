import { gql } from '@apollo/client';

const CANCEL_ORDER_BUYER = gql`
  mutation cancelOrderBuyer($payload: GetIdDTO!) {
    cancelOrderBuyer(payload: $payload) {
      id
      status
    }
  }
`;
export default CANCEL_ORDER_BUYER;
