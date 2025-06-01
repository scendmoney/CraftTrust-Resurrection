import { gql } from '@apollo/client';

const PRODUCTS_BUYER = gql`
  query productsBuyer($payload: FilterGetDTO!) {
    productsBuyer(payload: $payload) {
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
          displayName
          asset {
            id
            url
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

export default PRODUCTS_BUYER;
