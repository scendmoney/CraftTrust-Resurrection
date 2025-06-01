import { gql } from '@apollo/client';

const UPDATE_CHAT_TIME = gql`
  mutation updateTimeChat($payload: GetIdStringDTO!) {
    updateTimeChat(payload: $payload) {
      id
      isMessageBuyer
      isMessageCultivator
      facilityCultivator {
        id
        isChatMessage
      }
      facilityBuyer {
        id
        isChatMessage
      }
    }
  }
`;
export default UPDATE_CHAT_TIME;
