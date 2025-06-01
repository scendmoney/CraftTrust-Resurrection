import { gql } from '@apollo/client';

const GENERATE_CODE_SMS = gql`
  mutation generateCodeSMS($payload: GenerateCodeSMSInput!) {
    generateCodeSMS(payload: $payload)
  }
`;
export default GENERATE_CODE_SMS;
