import { gql } from '@apollo/client';

const UPDATE_ADMIN_PROFILE = gql`
  mutation updateAdminProfile($logo: Upload, $payload: UpdateAdminProfileInput!) {
    updateAdminProfile(logo: $logo, payload: $payload) {
      asset {
        id
        url
      }
      isBlocked
      phoneNumber
      adminData {
        isNotificationContactUs
        isNotificationJoinFacility
      }
    }
  }
`;
export default UPDATE_ADMIN_PROFILE;
