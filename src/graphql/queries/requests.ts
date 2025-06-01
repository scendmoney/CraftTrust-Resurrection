import { gql } from '@apollo/client';

export const REQUESTS = gql`
  query requests($payload: FilterGetDTO!) {
    requests(payload: $payload) {
      items {
        id
        email
        companyName
        name
        phone
        status
        type
        facilityRole
        licenseNumber
        dates {
          createdDate
        }
        admin {
          id
          fullName
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

export const NEW_REQUESTS = gql`
  query requests($payload: FilterGetDTO!) {
    requests(payload: $payload) {
      items {
        id
        status
        type
      }
    }
  }
`;
