import { gql } from '@apollo/client';

const CREATE_INVITE = gql`
  mutation createInvite($payload: CreateInviteInput!) {
    createInvite(payload: $payload) {
      code
      id
      name
      phone
      type
    }
  }
`;
export default CREATE_INVITE;
