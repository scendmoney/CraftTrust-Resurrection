import { gql } from '@apollo/client';

const GET_PAYMENT_ORDER_LINK = gql`
  mutation getPaymentOrderLink($payload: GetIdDTO!) {
    getPaymentOrderLink(payload: $payload)
  }
`;

export default GET_PAYMENT_ORDER_LINK;
