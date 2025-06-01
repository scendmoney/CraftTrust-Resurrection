import { gql } from '@apollo/client';

const USER_BY_ID = gql`
  query userById($payload: GetIdStringDTO!) {
    userById(payload: $payload) {
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
        licenseStartDate
        licenseType
        isLicenseActive
        licenseEndDate
      }
      isBlocked
      role
      dates {
        createdDate
      }
      userToFacilities {
        id
        name
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
  }
`;

export const USER_BY_ID_ADMIN = gql`
  query userById($payload: GetIdStringDTO!) {
    userById(payload: $payload) {
      id
      asset {
        id
        url
      }
      adminData {
        isNotificationContactUs
        isNotificationJoinFacility
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
  }
`;

export default USER_BY_ID;
