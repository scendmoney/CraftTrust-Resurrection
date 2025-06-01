import { gql } from '@apollo/client';

export const NEW_ORDER = gql`
  subscription newOrder {
    newOrder {
      id
    }
  }
`;
