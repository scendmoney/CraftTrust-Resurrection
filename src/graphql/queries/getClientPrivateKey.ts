import { gql } from '@apollo/client';

export const GET_CLIENT_PRIVATE_KEY = gql`
  query getClientPrivateKey {
    getClientPrivateKey
  }
`;
