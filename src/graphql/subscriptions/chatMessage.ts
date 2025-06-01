import { gql } from '@apollo/client';

export const CHAT_MESSAGE_FOR_CULTIVATOR = gql`
  subscription chatMessage {
    chatMessage {
      isMessageBuyer
      chatSid
      id
    }
  }
`;

export const CHAT_MESSAGE_FOR_BUYER = gql`
  subscription chatMessage {
    chatMessage {
      isMessageCultivator
      chatSid
      id
    }
  }
`;
