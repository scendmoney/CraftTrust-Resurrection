import { gql } from '@apollo/client';

const DELETE_SUBCOMPANY_CULTIVATOR = gql`
  mutation deleteSubcompanyCultivator($payload: GetIdDTO!) {
    deleteSubcompanyCultivator(payload: $payload)
  }
`;
export default DELETE_SUBCOMPANY_CULTIVATOR;
