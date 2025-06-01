import { gql } from '@apollo/client';

export const SURVEY_BY_UUID = gql`
  query surveyByUuid($uuid: String!) {
    surveyByUuid(uuid: $uuid) {
      activatedDate
      ageRange
      appealingVisually
      aromaSmells
      buyerConfirmedDate
      buyerRejectedDate
      code
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
  }
`;
