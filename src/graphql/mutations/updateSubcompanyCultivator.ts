import { gql } from '@apollo/client';

const UPDATE_SUBCOMPANY_CULTIVATOR = gql`
  mutation updateSubcompanyCultivator($payload: UpdateSubcompanyInput!) {
    updateSubcompanyCultivator(payload: $payload) {
      id
      quantity
    }
  }
`;
export default UPDATE_SUBCOMPANY_CULTIVATOR;
