import { gql } from '@apollo/client';

const TRANSACTION_BY_ID_ADMIN = gql`
  query transactionByIdAdmin($payload: GetIdDTO!) {
    transactionByIdAdmin(payload: $payload) {
      error
      amount
      amountUsd
      dates {
        createdDate
        updatedDate
      }
      error
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
        total
        products {
          id
          total
          quantity
          parentProduct {
            packagedDate
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
      blockchainTransactions {
        id
        dates {
          createdDate
          updatedDate
        }
        feeHbar
        gasLimit
        gasUsed
        status
        url
      }
    }
  }
`;

export default TRANSACTION_BY_ID_ADMIN;
