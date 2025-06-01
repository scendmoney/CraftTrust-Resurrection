import { gql } from '@apollo/client';

export const SURVEY_BY_ID_CLIENT = gql`
  query surveyByIdClient($payload: GetIdDTO!) {
    surveyByIdClient(payload: $payload) {
      ageRange
      appealingVisually
      aromaSmells
      buyerConfirmedDate
      buyerRejectedDate

      color
      completedDate

      experience
      fullName
      gender
      id
      intoxication
      nose
      oftenConsumeCannabis
      phone
      primaryPurpose

      smoked
      status

      uuid

      dates {
        createdDate
      }
      subcompany {
        id
        company {
          id
          productSurvey {
            thumbnail {
              id
              url
            }
            item {
              id
              name
            }
            id
          }
        }
        facilityBuyer {
          id
          displayName
          asset {
            id
            url
          }
        }
      }
    }
  }
`;
