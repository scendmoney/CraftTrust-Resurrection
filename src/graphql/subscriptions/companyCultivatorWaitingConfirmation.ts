import { gql } from '@apollo/client';

export const COMPANY_CULTIVATOR_WAITING_CONFIRMATION = gql`
  subscription companyCultivatorWaitingConfirmation {
    companyCultivatorWaitingConfirmation {
      id
    }
  }
`;
