import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ISurveyModel } from 'graphql/_server';
import { SURVEY_BY_ID_BUYER } from 'graphql/queries/surveyByIdBuyer';
import PromoSurveyDetails from 'sharedProject/components/PromoSurveyDetails/PromoSurveyDetails';

import Loader from 'components/Loader/Loader';

const ClientPromoSurveyDetails: FC<{ id: number; closeDetails: () => void }> = ({
  id,
  closeDetails
}) => {
  const [surveyByIdAdmin, setSurveyByIdAdmin] = useState<ISurveyModel | undefined>(undefined);

  const { loading } = useQuery<{ surveyByIdBuyer: ISurveyModel }>(SURVEY_BY_ID_BUYER, {
    variables: {
      payload: {
        id: id
      }
    },
    onCompleted: (data) => {
      setSurveyByIdAdmin(data.surveyByIdBuyer);
    },
    skip: Boolean(!id)
  });

  if (loading) {
    return <Loader />;
  }

  return <PromoSurveyDetails data={surveyByIdAdmin} closeDetails={closeDetails} />;
};

export default ClientPromoSurveyDetails;
