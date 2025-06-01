import { gql } from '@apollo/client';

const SUBCOMPANY_BY_ID_BUYER = gql`
  query subcompanyByIdBuyer($payload: GetIdDTO!) {
    subcompanyByIdBuyer(payload: $payload) {
      id
      quantity
      quantitySold
      facilityBuyer {
        id
        displayName
        asset {
          id
          url
        }
      }
      company {
        id
        dateEnd
        dateStart
        companyName
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
  }
`;

export default SUBCOMPANY_BY_ID_BUYER;
