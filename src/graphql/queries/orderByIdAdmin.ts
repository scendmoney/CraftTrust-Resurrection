import { gql } from '@apollo/client';

const ORDER_BY_ID_ADMIN = gql`
  query orderByIdAdmin($payload: GetIdDTO!) {
    orderByIdAdmin(payload: $payload) {
      id
      address
      verificationCode
      ipfs

      paymentDate
      zip
      phone
      comments
      city

      shippingType
      paymentType
      paymentStatus

      contactPerson {
        id
        fullName
        phoneNumber
        email
        asset {
          id
          url
        }
        license {
          licenseNumber
        }
      }

      dates {
        createdDate
      }
      status
      products {
        id
        price
        quantity
        total
        parentProduct {
          id
          thumbnail {
            id
            url
          }
          facility {
            id
            displayName
          }
          totalCBD
          totalTHC
          packagedDate
          geneticCross
          quantityStock
          quantity
          dates {
            createdDate
          }
          item {
            id
            name
          }
        }
        product {
          id
        }
      }
      total
      fee {
        feeBuyer
        feeCultivator
      }
      totalBuyer
      totalCultivator
      facilityCultivator {
        id
        displayName
        asset {
          id
          url
        }
      }
      facilityBuyer {
        id
        displayName
        asset {
          id
          url
        }
      }
    }
  }
`;

export const ORDER_BY_ID_ADMIN_NFT = gql`
  query orderByIdAdmin($payload: GetIdDTO!) {
    orderByIdAdmin(payload: $payload) {
      id
      nft
      ipfs
    }
  }
`;

export default ORDER_BY_ID_ADMIN;
