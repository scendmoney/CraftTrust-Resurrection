import { gql } from '@apollo/client';

const SUBCOMPANIES_BUYER = gql`
  query subcompaniesBuyer($payload: FilterGetDTO!) {
    subcompaniesBuyer(payload: $payload) {
      items {
        id
        isSurveyPending
        quantity
        quantitySold
        company {
          id
          status
          companyName
          dateEnd
          dateStart

          status
          facilityCultivator {
            id
            displayName
            asset {
              id
              url
            }
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

export const SUBCOMPANIES_BUYER_NEW_REQUEST = gql`
  query subcompaniesBuyer($payload: FilterGetDTO!) {
    subcompaniesBuyer(payload: $payload) {
      items {
        id
        isSurveyPending
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export default SUBCOMPANIES_BUYER;
