import { gql } from '@apollo/client';

export const ME_ADMIN = gql`
  query meAdmin {
    meAdmin {
      id
      adminData {
        isNotificationContactUs
        isNotificationJoinFacility
      }
      id
      role
      fullName
      phoneNumber
      email

      asset {
        id
        url
      }

      dates {
        createdDate
      }
      license {
        licenseEndDate
        licenseNumber
        licenseStartDate
        licenseType
      }
    }
  }
`;
