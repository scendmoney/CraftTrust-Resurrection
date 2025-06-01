import { gql } from '@apollo/client';

const SIGN_UP_BUYER = gql`
  mutation signUpBuyer($payload: SignUpBuyerInput!) {
    signUpBuyer(payload: $payload) {
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
export default SIGN_UP_BUYER;
