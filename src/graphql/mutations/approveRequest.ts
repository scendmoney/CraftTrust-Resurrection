import { gql } from '@apollo/client';

const APPROVE_REQUEST = gql`
  mutation approveRequest($payload: GetIdDTO!) {
    approveRequest(payload: $payload) {
      id
      status
    }
  }
`;
export default APPROVE_REQUEST;
