import { gql } from '@apollo/client';

const PRODUCT_BY_ID_BUYER = gql`
  query productByIdBuyer($payload: GetIdDTO!) {
    productByIdBuyer(payload: $payload) {
      id
      label
      terpenes
      description
      geneticCross
      price

      quantityStock
      quantityStockMin
      packagedDate
      labTestingStateDate
      labTestDocuments
      labTestingState
      totalTHC
      totalCBD
      thumbnail {
        id
        url
      }
      item {
        id
        name
        description
        strainName
        brandName
        productCategoryName
        productCategoryType
        publicIngredients
        defaultLabTestingState
      }
      facility {
        id
        email
        displayName
        description
        phoneNumber
        license {
          licenseNumber
          isLicenseActive
          licenseEndDate
        }
        asset {
          id
          url
        }

        email
        phoneNumber
        address {
          fullAddress
        }
        socials {
          facebook
          instagram
          site
          twitterX
          youtube
        }
      }
    }
  }
`;

export default PRODUCT_BY_ID_BUYER;
