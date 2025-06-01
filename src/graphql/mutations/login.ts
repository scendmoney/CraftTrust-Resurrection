import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation login($payload: UserLoginInput!) {
    login(payload: $payload) {
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
export default LOGIN;
