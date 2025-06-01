import { gql } from '@apollo/client';

const REQUEST_BY_ID = gql`
  query requestById($payload: GetIdDTO!) {
    requestById(payload: $payload) {
      id

      admin {
        id
        asset {
          id
          url
        }
        fullName
      }
      companyName
      messageReject
      email
      facilityRole
      licenseNumber
      message
      name
      phone
      status
      type
      dates {
        createdDate
        updatedDate
      }
    }
  }
`;

export default REQUEST_BY_ID;
