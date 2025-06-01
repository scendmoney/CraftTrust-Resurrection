import { gql } from '@apollo/client';

const COMPANIES_CULTIVATOR = gql`
  query companiesCultivator($payload: FilterGetDTO!) {
    companiesCultivator(payload: $payload) {
      items {
        id
        quantitySold
        quantity

        totalPeopleCompleted
        totalPeopleRedemption
        totalPeopleRegistered
        unitWeight
        totalGram
        totalLb

        dateEnd
        dateStart
        facilityCultivator {
          id
          displayName
          asset {
            id
            url
          }
        }

        companyName
        status
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export const COMPANIES_CULTIVATOR_SUBSCRIPTION = gql`
  query companiesCultivator($payload: FilterGetDTO!) {
    companiesCultivator(payload: $payload) {
      items {
        id
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export default COMPANIES_CULTIVATOR;
