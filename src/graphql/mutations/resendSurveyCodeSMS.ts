import { gql } from '@apollo/client';

const RESEND_SURVEY_CODE_SMS = gql`
  mutation resendSurveyCodeSMS($uuid: String!) {
    resendSurveyCodeSMS(uuid: $uuid)
  }
`;
export default RESEND_SURVEY_CODE_SMS;
