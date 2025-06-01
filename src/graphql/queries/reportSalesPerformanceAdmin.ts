import { gql } from '@apollo/client';

const REPORT_SALES_PERFORMANCE_ADMIN = gql`
  query reportSalesPerformanceAdmin($payload: ReportSalesPerformanceInput!) {
    reportSalesPerformanceAdmin(payload: $payload) {
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

export default REPORT_SALES_PERFORMANCE_ADMIN;
