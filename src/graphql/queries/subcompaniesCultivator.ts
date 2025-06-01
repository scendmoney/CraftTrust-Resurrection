import { gql } from '@apollo/client';

const SUBCOMPANIES_CULTIVATOR = gql`
  query subcompaniesCultivator($payload: FilterGetDTO!) {
    subcompaniesCultivator(payload: $payload) {
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
          status
          dateEnd
          dateStart
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

export default SUBCOMPANIES_CULTIVATOR;
