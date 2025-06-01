import { gql } from '@apollo/client';

const SUBCOMPANIES_ADMIN = gql`
  query subcompaniesAdmin($payload: FilterGetDTO!) {
    subcompaniesAdmin(payload: $payload) {
      items {
        id
        facilityBuyer {
          id
          displayName
          license {
            licenseNumber
          }
          asset {
            id
            url
          }
        }
        company {
          id
          dateEnd
          dateStart
          status
        }
        quantity
        quantitySold
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export default SUBCOMPANIES_ADMIN;
