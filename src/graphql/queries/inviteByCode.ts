import { gql } from '@apollo/client';

const INVITE_BY_CODE = gql`
  query inviteByCode($payload: InviteByCodeInput!) {
    inviteByCode(payload: $payload) {
      facility {
        id
        asset {
          id
          url
        }
        id
        name
        role
        metrcApiKey
      }
      relationFacility {
        id
        name
        displayName
        owner {
          id
        }
      }
    }
  }
`;

export default INVITE_BY_CODE;
