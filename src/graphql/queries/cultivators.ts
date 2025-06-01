import { gql } from '@apollo/client';

const CULTIVATORS = gql`
  query cultivators($payload: FilterGetDTO!) {
    cultivators(payload: $payload) {
      items {
        id
        displayName
        name
        asset {
          id
          url
        }
        license {
          isLicenseActive
          licenseEndDate
        }
      }
    }
  }
`;

export const CULTIVATORS_FOR_CHAT_BUYER = gql`
  query cultivators($payload: FilterGetDTO!) {
    cultivators(payload: $payload) {
      items {
        isOnline
        asset {
          id
          url
        }
        id
        name
        displayName
        facilityBuyerRelations {
          id
          isMessageCultivator
          facilityCultivator {
            id
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

export default CULTIVATORS;
