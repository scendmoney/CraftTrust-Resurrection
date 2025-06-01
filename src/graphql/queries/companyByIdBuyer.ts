import { gql } from '@apollo/client';

const COMPANY_BY_ID_BUYER = gql`
  query companyByIdBuyer($payload: GetIdDTO!) {
    companyByIdBuyer(payload: $payload) {
      id
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

      status
      subcompanies {
        id
      }
    }
  }
`;

export default COMPANY_BY_ID_BUYER;
