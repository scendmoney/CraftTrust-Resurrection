import { gql } from '@apollo/client';

const UPDATE_CONFIGURATIONS = gql`
  mutation updateConfiguration($payload: ConfigurationUpdateInput!) {
    updateConfiguration(payload: $payload)
  }
`;

export default UPDATE_CONFIGURATIONS;
