import { gql } from '@apollo/client';

const SIGN_UP_CULTIVATOR = gql`
  mutation signUpCultivator($payload: SignUpCultivatorDTO!) {
    signUpCultivator(payload: $payload) {
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
export default SIGN_UP_CULTIVATOR;
