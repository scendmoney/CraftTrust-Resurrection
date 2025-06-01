import { gql } from '@apollo/client';

const PRODUCTS_CULTIVATOR = gql`
  query productsCultivator($payload: FilterGetDTO!) {
    productsCultivator(payload: $payload) {
      items {
        id
        label
        status
        geneticCross

        orderResolve {
          id
        }

        labTestDocuments
        totalTHC
        totalCBD

        item {
          id
          name
          strainName
          productCategoryName
          unitThcPercent
          unitCbdPercent
        }

        thumbnail {
          id
          url
        }

        quantityStock
        quantityStockMin
        quantity
        status
        labTestingState
        labTestingStateDate
        price

        unitOfMeasureAbbreviation

        packagedDate

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
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export default PRODUCTS_CULTIVATOR;
