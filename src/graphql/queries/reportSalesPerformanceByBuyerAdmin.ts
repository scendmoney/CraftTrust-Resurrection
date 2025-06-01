import { gql } from '@apollo/client';

const REPORT_SALES_PERFORMANCE_BY_BUYER_ADMIN = gql`
  query reportSalesPerformanceByBuyerAdmin(
    $payload: ReportSalesPerformanceInput!
    $facilityId: String!
  ) {
    reportSalesPerformanceByBuyerAdmin(payload: $payload, facilityId: $facilityId) {
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

export default REPORT_SALES_PERFORMANCE_BY_BUYER_ADMIN;
