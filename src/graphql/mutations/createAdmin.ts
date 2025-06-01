import { gql } from '@apollo/client';

const CREATE_ADMIN = gql`
  mutation createAdmin($payload: CreateAdminInput!) {
    createAdmin(payload: $payload)
  }
`;
export default CREATE_ADMIN;
