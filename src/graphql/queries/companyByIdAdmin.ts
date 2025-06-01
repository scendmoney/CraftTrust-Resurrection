import { gql } from '@apollo/client';

const COMPANY_BY_ID_ADMIN = gql`
  query companyByIdAdmin($payload: GetIdDTO!) {
    companyByIdAdmin(payload: $payload) {
      id
      dateEnd
      dateStart
      quantity
      quantitySold
      companyName

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

      productSurvey {
        id
        thumbnail {
          id
          url
        }
        item {
          id
          name
        }
      }
      status
      subcompanies {
        id
        quantity
        quantitySold
      }
    }
  }
`;

export default COMPANY_BY_ID_ADMIN;
