import { gql } from '@apollo/client';

const REPORT_SALES_PERFORMANCE_BY_CULTIVATOR = gql`
  query reportSalesPerformanceByCultivator($payload: ReportSalesPerformanceInput!) {
    reportSalesPerformanceByCultivator(payload: $payload) {
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
        avgPriceBuyer
        avgPricePoundBuyer

        quantityProductPurchased

        totalPurchased
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export default REPORT_SALES_PERFORMANCE_BY_CULTIVATOR;
