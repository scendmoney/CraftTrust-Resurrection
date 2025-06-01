import { gql } from '@apollo/client';

const CREATE_COMPANY_ADMIN = gql`
  mutation createCompanyAdmin($payload: CreateCompanyInput!) {
    createCompanyAdmin(payload: $payload) {
      id
      dateEnd
      dateStart
      status
    }
  }
`;
export default CREATE_COMPANY_ADMIN;
