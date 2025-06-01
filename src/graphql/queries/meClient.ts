import { gql } from '@apollo/client';

export const ME_CLIENT = gql`
  query meClient {
    meClient {
      id

      fullName
      phoneNumber
      publicAddress
      asset {
        id
        url
      }
    }
  }
`;
