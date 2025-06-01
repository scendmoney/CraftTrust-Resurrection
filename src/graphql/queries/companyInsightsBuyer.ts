import { gql } from '@apollo/client';

const COMPANY_INSIGHTS_BUYER = gql`
  query companyInsightsBuyer($payload: FilterGetDTO!) {
    companyInsightsBuyer(payload: $payload) {
      items {
        ageRange
        appealingVisually
        aromaSmells
        color

        companyId
        experience

        gender
        smoked
        id
        nose
        oftenConsumeCannabis
        primaryPurpose

        intoxication
        surveys

        product {
          id
          thumbnail {
            id
            url
          }
          item {
            id
            name
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

export default COMPANY_INSIGHTS_BUYER;
