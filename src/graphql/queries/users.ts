import { gql } from '@apollo/client';

const USERS = gql`
  query users($payload: FilterGetDTO!) {
    users(payload: $payload) {
      items {
        id
        asset {
          id
          url
        }
        email
        fullName
        phoneNumber
        license {
          licenseNumber
          licenseEndDate
        }
        isBlocked
        role
        dates {
          createdDate
        }
        userToFacilities {
          id
          displayName
          owner {
            id
          }
          asset {
            id
            url
          }
        }
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export const USERS_ADMINS = gql`
  query users($payload: FilterGetDTO!) {
    users(payload: $payload) {
      items {
        id
        asset {
          id
          url
        }
        email
        fullName
        phoneNumber
        isBlocked
        role
        dates {
          createdDate
        }
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export default USERS;
