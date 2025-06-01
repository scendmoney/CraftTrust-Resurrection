import { gql } from '@apollo/client';

const REPORT_SALES_PERFORMANCE_BY_CULTIVATOR_ADMIN = gql`
  query reportSalesPerformanceByCultivatorAdmin(
    $payload: ReportSalesPerformanceInput!
    $facilityId: String!
  ) {
    reportSalesPerformanceByCultivatorAdmin(payload: $payload, facilityId: $facilityId) {
      items {
        facility {
          id
          displayName
          asset {
            id
            url
          }
          role
        }
        purchases
        avgPoundsOrderBuyer
        avgPoundsOrderCultivator
        avgPriceBuyer
        avgPriceCultivator
        avgPricePoundBuyer
        avgPricePoundCultivator

        percentListed
        quantityProductPurchased
        quantityProductRevenue
        totalListed
        totalMetrc
        totalPurchased
        totalRevenue
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export default REPORT_SALES_PERFORMANCE_BY_CULTIVATOR_ADMIN;
