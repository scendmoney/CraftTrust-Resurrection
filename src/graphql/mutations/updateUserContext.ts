import { gql } from '@apollo/client';

const UPDATE_USER_CONTEXT = gql`
  mutation updateUserContext($facilityId: String!) {
    updateUserContext(facilityId: $facilityId) {
      id
    }
  }
`;
export default UPDATE_USER_CONTEXT;
