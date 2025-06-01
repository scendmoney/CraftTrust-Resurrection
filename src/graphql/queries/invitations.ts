import { gql } from '@apollo/client';

const INVITATIONS = gql`
  query invitations($payload: FilterGetDTO!) {
    invitations(payload: $payload) {
      items {
        code
        dates {
          createdDate
          updatedDate
        }

        employee {
          id
          license {
            licenseNumber
          }
        }
        id
        status
        name
        owner {
          id
        }
        phone

        type
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export default INVITATIONS;
