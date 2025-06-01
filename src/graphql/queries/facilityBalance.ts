import { gql } from '@apollo/client';

export const FACILITY_BALANCE_CARAT = gql`
  query facilityBalanceCarat {
    facilityBalanceCarat {
      balanceBlocked {
        balance
        balanceUsd
      }
      balanceBuy {
        balance
        balanceUsd
      }
      balanceWallet {
        balance
        balanceUsd
      }
      rate
      token
    }
  }
`;

export default FACILITY_BALANCE_CARAT;
