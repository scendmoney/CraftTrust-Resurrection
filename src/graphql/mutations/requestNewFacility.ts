import { gql } from '@apollo/client';

const REQUEST_NEW_FACILITY = gql`
  mutation requestNewFacility($payload: RequestNewFacilityInput!, $token: String!) {
    requestNewFacility(payload: $payload, token: $token)
  }
`;
export default REQUEST_NEW_FACILITY;
