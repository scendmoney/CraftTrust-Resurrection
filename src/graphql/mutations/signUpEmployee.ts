import { gql } from '@apollo/client';

const SIGN_UP_EMPLOYEE = gql`
  mutation signUpEmployee($payload: SignUpEmployeeInput!) {
    signUpEmployee(payload: $payload) {
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
export default SIGN_UP_EMPLOYEE;
