import { gql } from '@apollo/client';

const GET_HBAR_RATE = gql`
  query getHBarRate {
    getHBarRate
  }
`;

export default GET_HBAR_RATE;
