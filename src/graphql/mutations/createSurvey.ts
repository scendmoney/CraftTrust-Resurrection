import { gql } from '@apollo/client';

const CREATE_SURVEY = gql`
  mutation createSurvey($payload: CreateSurveyInput!) {
    createSurvey(payload: $payload) {
      fullName
      id
      phone
      uuid
    }
  }
`;
export default CREATE_SURVEY;
