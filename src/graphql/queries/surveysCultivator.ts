import { gql } from '@apollo/client';

export const SURVEYS_CULTIVATOR = gql`
  query surveysCultivator($payload: FilterGetDTO!) {
    surveysCultivator(payload: $payload) {
      items {
        id
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
      meta {
        skip
        take
        total
      }
    }
  }
`;
