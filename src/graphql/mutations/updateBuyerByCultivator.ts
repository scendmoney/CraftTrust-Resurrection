import { gql } from '@apollo/client';

const UPDATE_BUYER_BY_CULTIVATOR = gql`
  mutation updateBuyerByCultivator($payload: UpdateBuyerByCultivatorInput!) {
    updateBuyerByCultivator(payload: $payload) {
      id
      facilityCultivatorRelations {
        id
        isNetActivated
        netBalance
        netDays
      }
    }
  }
`;
export default UPDATE_BUYER_BY_CULTIVATOR;
