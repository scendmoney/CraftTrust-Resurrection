import { gql } from '@apollo/client';

const SEND_CONTACT_US = gql`
  mutation sendContactUs($payload: SendContactUsInput!, $token: String!) {
    sendContactUs(payload: $payload, token: $token)
  }
`;
export default SEND_CONTACT_US;
