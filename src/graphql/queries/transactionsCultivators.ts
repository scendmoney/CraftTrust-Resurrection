import { gql } from '@apollo/client';

const TRANSACTIONS_CULTIVATORS = gql`
  query transactions($payload: FilterGetDTO!) {
    transactions(payload: $payload) {
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
        }
        facilityTo {
          id
          displayName
        }
        id
        order {
          id
          products {
            id
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

export default TRANSACTIONS_CULTIVATORS;
