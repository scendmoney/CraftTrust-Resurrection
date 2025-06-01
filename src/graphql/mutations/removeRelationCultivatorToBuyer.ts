import { gql } from '@apollo/client';

const REMOVE_RELATION_CULTIVATOR_TO_BUYER = gql`
  mutation removeRelationCultivatorToBuyer($payload: RemoveRelationCultivatorToBuyerInput!) {
    removeRelationCultivatorToBuyer(payload: $payload)
  }
`;
export default REMOVE_RELATION_CULTIVATOR_TO_BUYER;
