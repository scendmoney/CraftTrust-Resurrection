import { gql } from '@apollo/client';

const UPDATE_REQUEST = gql`
  mutation updateRequest($payload: UpdateRequestInput!) {
    updateRequest(payload: $payload) {
      id
      status
      type
      admin {
        id
      }
    }
  }
`;
export default UPDATE_REQUEST;
