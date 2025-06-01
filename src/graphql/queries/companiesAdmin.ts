import { gql } from '@apollo/client';

const COMPANIES_ADMIN = gql`
  query companiesAdmin($payload: FilterGetDTO!) {
    companiesAdmin(payload: $payload) {
      items {
        id
        companyName
        dateEnd
        dateStart

        quantitySold
        quantity

        totalPeopleCompleted
        totalPeopleRedemption
        totalPeopleRegistered
        unitWeight
        totalGram
        totalLb

        facilityCultivator {
          id
          displayName
          asset {
            id
            url
          }
        }

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

export default COMPANIES_ADMIN;
