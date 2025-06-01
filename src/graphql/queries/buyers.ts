import { gql } from '@apollo/client';

const BUYERS = gql`
  query buyers($payload: FilterGetDTO!) {
    buyers(payload: $payload) {
      items {
        isOnline
        asset {
          id
          url
        }
        id
        name
        displayName
        dates {
          createdDate
        }
        owner {
          id
          email
        }
        role
        facilityCultivatorRelations {
          dates {
            createdDate
          }
          id
          dueBalance
          isNetActivated
          lastOrderDate
          netBalance
          netDays
          orderTotalSpend
          totalOrders
          avgPurchase
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

export const BUYERS_FOR_CHAT_CULTIVATOR = gql`
  query buyers($payload: FilterGetDTO!) {
    buyers(payload: $payload) {
      items {
        isOnline
        asset {
          id
          url
        }
        id
        name
        displayName
        facilityCultivatorRelations {
          id
          isMessageBuyer
          facilityBuyer {
            id
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

export default BUYERS;
