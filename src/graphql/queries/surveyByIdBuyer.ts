import { gql } from '@apollo/client';

export const SURVEY_BY_ID_BUYER = gql`
  query surveyByIdBuyer($payload: GetIdDTO!) {
    surveyByIdBuyer(payload: $payload) {
      ageRange
      appealingVisually
      aromaSmells
      color
      experience
      gender
      smoked
      id
      nose
      oftenConsumeCannabis
      intoxication
      primaryPurpose
      fullName

      surveySentDate
      completedDate
      phone
      status
      dates {
        createdDate
      }
      subcompany {
        id
        company {
          id
          productSurvey {
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
