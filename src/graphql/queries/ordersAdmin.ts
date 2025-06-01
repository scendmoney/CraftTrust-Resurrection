import { gql } from '@apollo/client';

export const ORDERS_ADMIN = gql`
  query ordersAdmin($payload: FilterGetDTO!) {
    ordersAdmin(payload: $payload) {
      items {
        id
        total

        city
        status
        comments
        address
        phone

        paymentDate
        zip
        verificationCode

        products {
          id
          total
          quantity
          parentProduct {
            item {
              id
              name
            }
            thumbnail {
              id
              url
            }
          }
        }

        paymentStatus
        paymentType
        shippingType
        status

        total
        fee {
          feeBuyer
          feeCultivator
        }
        totalBuyer
        totalCultivator

        dates {
          createdDate
        }

        facilityBuyer {
          id
          displayName
          asset {
            id
            url
          }
        }

        facilityCultivator {
          id
          displayName
          asset {
            id
            url
          }
        }
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;
