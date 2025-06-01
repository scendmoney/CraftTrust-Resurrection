import { gql } from '@apollo/client';

const LOGIN_SMS = gql`
  mutation loginSMS($payload: LoginSMSInput!) {
    loginSMS(payload: $payload) {
      token

      user {
        id
        role
        context {
          id
          role
        }
      }
    }
  }
`;
export default LOGIN_SMS;
