import { gql } from '@apollo/client';

const SUBMIT_SURVEY = gql`
  mutation submitSurvey($payload: SubmitSurveyInput!) {
    submitSurvey(payload: $payload) {
      id
      fullName
    }
  }
`;
export default SUBMIT_SURVEY;
