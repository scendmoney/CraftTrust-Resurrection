import { gql } from '@apollo/client';

const SIGN_UP_CLIENT = gql`
  mutation signUpClient($payload: SignUpClientInput!) {
    signUpClient(payload: $payload) {
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
export default SIGN_UP_CLIENT;
