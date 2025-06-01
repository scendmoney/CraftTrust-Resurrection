import { gql } from '@apollo/client';

const SURVEY_PACKAGE_CONFIRMED = gql`
  mutation surveyPackageConfirmed($uuid: String!) {
    surveyPackageConfirmed(uuid: $uuid) {
      id
      status
    }
  }
`;
export default SURVEY_PACKAGE_CONFIRMED;
