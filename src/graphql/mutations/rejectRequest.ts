import { gql } from '@apollo/client';

const REJECT_REQUEST = gql`
  mutation rejectRequest($payload: RejectRequestInput!) {
    rejectRequest(payload: $payload) {
      id
      messageReject
      status
    }
  }
`;
export default REJECT_REQUEST;
