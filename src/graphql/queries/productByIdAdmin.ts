import { gql } from '@apollo/client';

const PRODUCT_BY_ID_ADMIN = gql`
  query productByIdAdmin($payload: GetIdDTO!) {
    productByIdAdmin(payload: $payload) {
      id
      label
      price
      quantity
      quantityStock
      quantityStockMin
      packagedDate
      totalTHC
      totalCBD
      geneticCross

      terpenes

      labTestingStateDate
      labTestDocuments
      labTestingState
      status
      description
      parent {
        id
      }
      orderResolve {
        id
        status
      }
      item {
        id
        name
        description
        brandName
        productCategoryName
        productCategoryType
        publicIngredients
        defaultLabTestingState
      }
      children {
        id
        orderResolve {
          id
          status
        }
        price
        quantityStock
      }
      thumbnail {
        id
        url
      }
      facility {
        id
        displayName
        description
        license {
          licenseNumber
        }
        address {
          fullAddress
        }
        asset {
          id
          url
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
      }
    }
  }
`;

export default PRODUCT_BY_ID_ADMIN;
