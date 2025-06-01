import { gql } from '@apollo/client';

const CHECK_EMAIL = gql`
  query checkEmail($email: String!) {
    checkEmail(email: $email)
  }
`;

export default CHECK_EMAIL;
