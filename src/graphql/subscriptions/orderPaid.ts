import { gql } from '@apollo/client';

export const OPRDER_PAID = gql`
  subscription orderPaid {
    orderPaid {
      id
      paymentStatus
      status
    }
  }
`;
