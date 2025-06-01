import { gql } from '@apollo/client';

const CONFIGURATIONS = gql`
  query configurations {
    configurations
  }
`;

export default CONFIGURATIONS;
