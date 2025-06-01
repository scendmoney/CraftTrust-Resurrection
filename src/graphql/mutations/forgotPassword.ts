import { gql } from '@apollo/client';

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($payload: UserEmailInput!) {
    forgotPassword(payload: $payload)
  }
`;
export default FORGOT_PASSWORD;
