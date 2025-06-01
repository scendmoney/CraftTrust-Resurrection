import { gql } from '@apollo/client';

const CREATE_ORDER = gql`
  mutation createOrder($payload: CreateOrderInput!) {
    createOrder(payload: $payload) {
      id
      paymentType
      shippingType
      total
      facilityCultivator {
        id
        displayName
        asset {
          id
          url
        }
      }
      facilityBuyer {
        id
      }
    }
  }
`;
export default CREATE_ORDER;
