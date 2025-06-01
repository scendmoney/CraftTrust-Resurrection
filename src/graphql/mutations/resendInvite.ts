import { gql } from '@apollo/client';

const RESEND_INVITE = gql`
  mutation resendInvite($payload: GetIdDTO!) {
    resendInvite(payload: $payload)
  }
`;
export default RESEND_INVITE;
