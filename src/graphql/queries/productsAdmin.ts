import { gql } from '@apollo/client';

const PRODUCTS_ADMIN = gql`
  query productsAdmin($payload: FilterGetDTO!) {
    productsAdmin(payload: $payload) {
      items {
        id
        label

        facility {
          id
          displayName
          asset {
            id
            url
          }
        }

        thumbnail {
          id
          url
        }

        item {
          id
          name
        }

        status
        price
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export const PRODUCTS_ADMIN_PREVIEW_STOREFRONT = gql`
  query productsAdmin($payload: FilterGetDTO!) {
    productsAdmin(payload: $payload) {
      items {
        id
        label
        price
        thumbnail {
          id
          url
        }
        totalTHC
        totalCBD
        geneticCross
        quantityStock
        quantityStockMin
        packagedDate
        labTestingState
        labTestingStateDate
        facility {
          id
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
        item {
          id
          name
          strainName
          productCategoryName
          unitThcPercent
          unitCbdPercent
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

export const PRODUCTS_ADMIN_INVENTORY = gql`
  query productsAdmin($payload: FilterGetDTO!) {
    productsAdmin(payload: $payload) {
      items {
        id
        status

        orderResolve {
          id
        }

        item {
          id
          name
        }

        thumbnail {
          id
          url
        }

        quantity
        quantityStock
        quantityStockMin
        status
        labTestingState
        price

        packagedDate

        facility {
          id
          displayName
          asset {
            id
            url
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

export default PRODUCTS_ADMIN;
