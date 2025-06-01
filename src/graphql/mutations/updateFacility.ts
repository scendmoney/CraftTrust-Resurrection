import { gql } from '@apollo/client';

const UPDATE_FACILITY = gql`
  mutation updateFacility($logo: Upload, $payload: UpdateFacilityDTO!) {
    updateFacility(logo: $logo, payload: $payload) {
      asset {
        id
        url
      }
      description
      address {
        fullAddress
        googlePlaceId
      }
      socials {
        facebook
        instagram
        site
        twitterX
        youtube
      }
      campaignEmail
      phoneNumber
      email

      displayName
      name

      id
    }
  }
`;
export default UPDATE_FACILITY;
