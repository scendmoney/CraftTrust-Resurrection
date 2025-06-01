import { gql } from '@apollo/client';

const LOGIN_ADMIN = gql`
  mutation loginAdmin($payload: AdminLoginInput!) {
    loginAdmin(payload: $payload) {
      id
      email
      role
      isBlocked
    }
  }
`;
export default LOGIN_ADMIN;
