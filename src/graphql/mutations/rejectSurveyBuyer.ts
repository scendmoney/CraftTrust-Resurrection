import { gql } from '@apollo/client';

const REJECT_SURVEY_BUYER = gql`
  mutation rejectSurveyBuyer($payload: GetIdDTO!) {
    rejectSurveyBuyer(payload: $payload) {
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
export default REJECT_SURVEY_BUYER;
