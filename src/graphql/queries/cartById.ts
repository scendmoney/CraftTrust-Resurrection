import { gql } from '@apollo/client';

const CART_BY_ID = gql`
  query cartById($payload: GetIdDTO!) {
    cartById(payload: $payload) {
      id
      total
      netInfo {
        isNetActivated
        netDays
        netBalance
        dueBalance
      }
      cartItems {
        id
        price
        total
        quantity

        product {
          id
          status
          facility {
            id
          }
          quantityStock
          thumbnail {
            id
            url
          }
          item {
            name
          }
        }
      }
      total
      costProducts
      fee
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
        displayName

        userContact {
          id
        }
        users {
          id
          fullName
          asset {
            id
            url
          }
          email
          phoneNumber
        }
      }
    }
  }
`;

export default CART_BY_ID;
