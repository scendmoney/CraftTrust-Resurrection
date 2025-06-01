import { gql } from '@apollo/client';

const UPDATE_SUBCOMPANY_ADMIN = gql`
  mutation updateSubcompanyAdmin($payload: UpdateSubcompanyInput!) {
    updateSubcompanyAdmin(payload: $payload) {
      id
      quantity
      company {
        quantity
        quantitySold
      }
    }
  }
`;
export default UPDATE_SUBCOMPANY_ADMIN;
