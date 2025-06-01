import { gql } from '@apollo/client';

export const FACILITY_BY_ID_ADMIN = gql`
  query facilityByIdAdmin($payload: GetIdStringDTO!) {
    facilityByIdAdmin(payload: $payload) {
      alias
      asset {
        id
        url
      }
      userContact {
        id
        phoneNumber
        fullName
        email
        license {
          licenseNumber
        }
      }
      owner {
        id
        fullName
        email
        phoneNumber
        asset {
          id
          url
        }
      }
      dates {
        createdDate
      }

      displayName
      description
      address {
        fullAddress
      }
      email
      campaignEmail
      phoneNumber
      socials {
        facebook
        instagram
        site
        twitterX
        youtube
      }

      id

      license {
        licenseEndDate
        licenseNumber
        licenseStartDate
        licenseType
        isLicenseActive
      }

      name

      role

      users {
        id
        fullName
        email
        license {
          licenseNumber
        }
        asset {
          id
          url
        }
      }
    }
  }
`;
