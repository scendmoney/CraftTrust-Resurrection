import { gql } from '@apollo/client';

const UPDATE_CLIENT = gql`
  mutation updateClient($logo: Upload, $payload: UpdateClientInput!) {
    updateClient(logo: $logo, payload: $payload) {
      id
      fullName
      asset {
        id
        url
      }
    }
  }
`;
export default UPDATE_CLIENT;
