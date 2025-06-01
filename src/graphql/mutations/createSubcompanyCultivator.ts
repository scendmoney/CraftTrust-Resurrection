import { gql } from '@apollo/client';

const CREATE_SUBCOMPANY_CULTIVATOR = gql`
  mutation createSubcompanyCultivator($payload: CreateSubcompanyInput!) {
    createSubcompanyCultivator(payload: $payload) {
      id
    }
  }
`;
export default CREATE_SUBCOMPANY_CULTIVATOR;
