import { gql } from '@apollo/client';

const CONFIRM_SURVEY_BUYER = gql`
  mutation confirmSurveyBuyer($payload: GetIdDTO!) {
    confirmSurveyBuyer(payload: $payload) {
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
export default CONFIRM_SURVEY_BUYER;
