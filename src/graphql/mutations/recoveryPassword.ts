import { gql } from '@apollo/client';

const RECOVERY_PASSWORD = gql`
  mutation recoveryPassword($payload: UserRecoveryInput!) {
    recoveryPassword(payload: $payload)
  }
`;
export default RECOVERY_PASSWORD;
