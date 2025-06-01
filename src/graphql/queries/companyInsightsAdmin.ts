import { gql } from '@apollo/client';

const COMPANY_INSIGHTS_ADMIN = gql`
  query companyInsightsAdmin($payload: FilterGetDTO!) {
    companyInsightsAdmin(payload: $payload) {
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
        product {
          id
          item {
            id
            name
          }
          thumbnail {
            id
            url
          }
        }

        intoxication
        surveys
      }
      meta {
        skip
        take
        total
      }
    }
  }
`;

export default COMPANY_INSIGHTS_ADMIN;
