import { gql } from '@apollo/client';

const GENERATE_TOKEN = gql`
  mutation generateToken {
    generateToken
  }
`;
export default GENERATE_TOKEN;
