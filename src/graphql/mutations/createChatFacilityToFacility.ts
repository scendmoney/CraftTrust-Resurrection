import { gql } from '@apollo/client';

const CREATE_CHAT_FACILITY_TO_FACILITY = gql`
  mutation createChatFacilityToFacility($payload: CreateChatFacilityToFacilityInput!) {
    createChatFacilityToFacility(payload: $payload)
  }
`;
export default CREATE_CHAT_FACILITY_TO_FACILITY;
