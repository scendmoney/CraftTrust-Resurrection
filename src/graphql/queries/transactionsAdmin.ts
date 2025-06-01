import { gql } from '@apollo/client';

const TRANSACTIONS_ADMIN = gql`
  query transactionsAdmin($payload: FilterGetDTO!) {
    transactionsAdmin(payload: $payload) {
      items {
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

export default TRANSACTIONS_ADMIN;
