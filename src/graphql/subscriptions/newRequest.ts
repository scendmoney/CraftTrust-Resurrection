import { gql } from '@apollo/client';

export const NEW_REQUEST = gql`
  subscription newRequest {
    newRequest {
      id
      type
    }
  }
`;
