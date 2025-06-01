import { gql } from '@apollo/client';

const UPDATE_COMPANY_ADMIN = gql`
  mutation updateCompanyAdmin($payload: UpdateCompanyInput!) {
    updateCompanyAdmin(payload: $payload) {
      id
      status
      companyName
    }
  }
`;
export default UPDATE_COMPANY_ADMIN;
