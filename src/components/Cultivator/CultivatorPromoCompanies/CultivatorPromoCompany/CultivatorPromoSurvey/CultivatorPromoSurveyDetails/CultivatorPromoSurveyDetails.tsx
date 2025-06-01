import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ISurveyModel } from 'graphql/_server';
import { SURVEY_BY_ID_CULTIVATOR } from 'graphql/queries/surveyByIdCultivator';
import PromoSurveyDetails from 'sharedProject/components/PromoSurveyDetails/PromoSurveyDetails';

import Loader from 'components/Loader/Loader';

const CultivatorPromoSurveyDetails: FC<{ id: number; closeDetails: () => void }> = ({
  id,
  closeDetails
}) => {
  const [surveyByIdCultivator, setSurveyByIdCultivator] = useState<ISurveyModel | undefined>(
    undefined
  );

  const { loading } = useQuery<{ surveyByIdCultivator: ISurveyModel }>(SURVEY_BY_ID_CULTIVATOR, {
    variables: {
      payload: {
        id: id
      }
    },
    onCompleted: (data) => {
      setSurveyByIdCultivator(data.surveyByIdCultivator);
    },
    skip: Boolean(!id)
  });

  if (loading) {
    return <Loader />;
  }

  return <PromoSurveyDetails data={surveyByIdCultivator} closeDetails={closeDetails} />;
};

export default CultivatorPromoSurveyDetails;
