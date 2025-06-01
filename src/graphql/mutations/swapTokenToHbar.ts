import { gql } from '@apollo/client';

const SWAP_TOKEN_TO_HBAR = gql`
  mutation swapTokenToHbar($amount: Float!) {
    swapTokenToHbar(amount: $amount)
  }
`;
export default SWAP_TOKEN_TO_HBAR;
