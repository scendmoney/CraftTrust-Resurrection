import { gql } from '@apollo/client';

export const SURVEYS_BUYER = gql`
  query surveysBuyer($payload: FilterGetDTO!) {
    surveysBuyer(payload: $payload) {
      items {
        id
        fullName
        surveySentDate
        completedDate
        phone
        status

        user {
          id
          asset {
            id
            url
          }
        }

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
