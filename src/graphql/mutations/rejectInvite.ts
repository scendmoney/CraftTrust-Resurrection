import { gql } from '@apollo/client';

const REJECT_INVITE = gql`
  mutation rejectInvite($payload: GetIdDTO!) {
    rejectInvite(payload: $payload) {
      id
    }
  }
`;
export default REJECT_INVITE;
