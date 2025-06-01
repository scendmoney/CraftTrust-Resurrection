import { gql } from '@apollo/client';

const TRANSACTIONS = gql`
  query transactions($payload: FilterGetDTO!) {
    transactions(payload: $payload) {
      items {
        error
        amount
        amountUsd

        dates {
          createdDate
          updatedDate
        }

        facilityFrom {
          id
          displayName
          asset {
            id
            url
          }
        }
        facilityTo {
          id
          displayName
          asset {
            id
            url
          }
        }
        id
        order {
          id
          products {
            id
            parentProduct {
              thumbnail {
                url
                id
              }
              item {
                name
                id
              }
            }
          }
        }
        status
        type
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export default TRANSACTIONS;
