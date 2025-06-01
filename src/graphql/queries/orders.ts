import { gql } from '@apollo/client';

export const ORDERS = gql`
  query orders($payload: FilterOrdersInput!) {
    orders(payload: $payload) {
      items {
        id

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
        totalBuyer
        totalCultivator
        fee {
          feeBuyer
          feeCultivator
        }

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

export const NEW_ORDERS = gql`
  query orders($payload: FilterOrdersInput!) {
    orders(payload: $payload) {
      items {
        id
        status
      }
    }
  }
`;

export const OVERDUE_ORDERS = gql`
  query orders($payload: FilterOrdersInput!) {
    orders(payload: $payload) {
      items {
        id
        status
        paymentStatus
      }
    }
  }
`;
