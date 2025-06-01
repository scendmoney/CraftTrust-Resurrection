import { gql } from '@apollo/client';

const FACILITIES = gql`
  query facilities($payload: FilterGetDTO!) {
    facilities(payload: $payload) {
      items {
        id
        asset {
          id
          url
        }
        displayName
        name
        role
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export const FACILITIES_FOR_ADMIN = gql`
  query facilities($payload: FilterGetDTO!) {
    facilities(payload: $payload) {
      items {
        id
        isOnline
        asset {
          id
          url
        }
        displayName
        license {
          licenseNumber
          licenseType
          licenseEndDate
        }
        role
        owner {
          id
          fullName
        }
        quantityActiveEmployee
        quantityEmployee
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

export const FACILITIES_FOR_SUBCOMPANIES_SEARCH = gql`
  query facilities($payload: FilterGetDTO!) {
    facilities(payload: $payload) {
      items {
        id
        displayName
        name
        asset {
          id
          url
        }
        facilityCultivatorRelations {
          id
          facilityCultivator {
            id
            displayName
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

export default FACILITIES;
