import { gql } from '@apollo/client';

const UPDATE_COMPANY_CULTIVATOR = gql`
  mutation updateCompanyCultivator($payload: UpdateCompanyCultivatorInput!) {
    updateCompanyCultivator(payload: $payload) {
      id
      status
    }
  }
`;
export default UPDATE_COMPANY_CULTIVATOR;
