import { gql } from '@apollo/client';

const UPDATE_USER = gql`
  mutation updateUser($logo: Upload, $payload: UpdateUserDTO!) {
    updateUser(logo: $logo, payload: $payload) {
      asset {
        id
        url
      }
    }
  }
`;
export default UPDATE_USER;
