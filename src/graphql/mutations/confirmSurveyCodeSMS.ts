import { gql } from '@apollo/client';

const CONFIRM_SURVEY_CODE_SMS = gql`
  mutation confirmSurveyCodeSMS($payload: ConfirmSurveyCodeSMSInput!) {
    confirmSurveyCodeSMS(payload: $payload)
  }
`;
export default CONFIRM_SURVEY_CODE_SMS;
