import { gql } from '@apollo/client';

const FACILITY_BY_ID = gql`
  query facilityById($payload: GetIdStringDTO!) {
    facilityById(payload: $payload) {
      alias
      asset {
        id
        url
      }
      credentialedDate
      dates {
        createdDate
      }
      description
      displayName

      id

      license {
        isLicenseActive
        licenseEndDate
        licenseNumber
        licenseStartDate
        licenseType
      }
      address {
        fullAddress
      }
      email
      phoneNumber
      socials {
        facebook
        instagram
        site
        twitterX
        youtube
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

      facilityCultivatorRelations {
        id
        isNetActivated
        lastOrderDate
        netBalance
        netDays
        totalOrders
      }
    }
  }
`;

export const FACILITY_BY_ID_CHAT = gql`
  query facilityById($payload: GetIdStringDTO!) {
    facilityById(payload: $payload) {
      asset {
        id
        url
      }

      id
      displayName
    }
  }
`;

export const FACILITY_BY_ID_BUYER_CULTIVATOR = gql`
  query facilityById($payload: GetIdStringDTO!) {
    facilityById(payload: $payload) {
      alias
      asset {
        id
        url
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
      userContact {
        id
        fullName
        email
        phoneNumber
        asset {
          id
          url
        }
      }
      credentialedDate
      dates {
        createdDate
      }
      description
      address {
        fullAddress
        googlePlaceId
      }
      email
      phoneNumber
      socials {
        facebook
        instagram
        site
        twitterX
        youtube
      }
      displayName

      id

      license {
        licenseEndDate
        licenseNumber
        isLicenseActive
      }

      name

      role

      facilityCultivatorRelations {
        id
        dueBalance
        isNetActivated
        lastOrderDate
        netBalance
        netDays
        orderTotalSpend
        totalOrders
        avgPurchase
      }
    }
  }
`;

export default FACILITY_BY_ID;
