import { gql } from '@apollo/client';

const EMPLOYEE_BY_ID = gql`
  query employeeById($payload: GetIdStringDTO!) {
    employeeById(payload: $payload) {
      asset {
        id
        url
      }
      joinDate
      email
      phoneNumber
      id
      fullName
      isBlocked
      role
      dates {
        createdDate
      }
      license {
        licenseEndDate
        licenseNumber
        isLicenseActive
      }
    }
  }
`;

export default EMPLOYEE_BY_ID;
