import { gql } from '@apollo/client';

const CREATE_SUBCOMPANY_ADMIN = gql`
  mutation createSubcompanyAdmin($payload: CreateSubcompanyInput!) {
    createSubcompanyAdmin(payload: $payload) {
      id
    }
  }
`;
export default CREATE_SUBCOMPANY_ADMIN;
