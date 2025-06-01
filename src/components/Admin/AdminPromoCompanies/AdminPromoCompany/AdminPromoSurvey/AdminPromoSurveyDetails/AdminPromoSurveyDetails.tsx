import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ISurveyModel } from 'graphql/_server';
import { SURVEY_BY_ID_ADMIN } from 'graphql/queries/surveyByIdAdmin';
import PromoSurveyDetails from 'sharedProject/components/PromoSurveyDetails/PromoSurveyDetails';

import Loader from 'components/Loader/Loader';

const AdminPromoSurveyDetails: FC<{ id: number; closeDetails: () => void }> = ({
  id,
  closeDetails
}) => {
  const [surveyByIdAdmin, setSurveyByIdAdmin] = useState<ISurveyModel | undefined>(undefined);

  const { loading } = useQuery<{ surveyByIdAdmin: ISurveyModel }>(SURVEY_BY_ID_ADMIN, {
    variables: {
      payload: {
        id: id
      }
    },
    onCompleted: (data) => {
      setSurveyByIdAdmin(data.surveyByIdAdmin);
    },
    skip: Boolean(!id)
  });

  if (loading) {
    return <Loader />;
  }
  if (!surveyByIdAdmin) {
    return null;
  }
  return <PromoSurveyDetails data={surveyByIdAdmin} closeDetails={closeDetails} />;
};

export default AdminPromoSurveyDetails;
