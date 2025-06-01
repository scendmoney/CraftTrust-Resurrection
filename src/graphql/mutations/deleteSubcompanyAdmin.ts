import { gql } from '@apollo/client';

const DELETE_SUBCOMPANY_ADMIN = gql`
  mutation deleteSubcompanyAdmin($payload: GetIdDTO!) {
    deleteSubcompanyAdmin(payload: $payload)
  }
`;
export default DELETE_SUBCOMPANY_ADMIN;
