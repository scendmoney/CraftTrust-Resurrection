import { gql } from '@apollo/client';

const EMPLOYEES = gql`
  query employees($payload: FilterGetDTO!) {
    employees(payload: $payload) {
      items {
        asset {
          id
          url
        }
        email
        phoneNumber
        id
        joinDate
        fullName
        isBlocked
        role
        dates {
          updatedDate
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

export const EMPLOYEES_INVITE = gql`
  query employees($payload: FilterGetDTO!) {
    employees(payload: $payload) {
      items {
        id
        fullName
        asset {
          id
          url
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

export default EMPLOYEES;
