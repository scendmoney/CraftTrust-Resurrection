import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import { ISurveyModel, SurveyStatusEnum } from 'graphql/_server';
import { SURVEY_BY_ID_CLIENT } from 'graphql/queries/surveyByIdClient';
import { colors } from 'mui/theme/colors';
import ErrorPage from 'sharedProject/components/ErrorPage/ErrorPage';

import Loader from 'components/Loader/Loader';

import SurveyStep1 from './SurveyStep1/SurveyStep1';
import SurveyStep1Add from './SurveyStep1Add/SurveyStep1Add';
import SurveyStep2 from './SurveyStep2/SurveyStep2';
import SurveyStep3 from './SurveyStep3/SurveyStep3';
import styles from './styles';

const Survey: FC<{ id: number }> = ({ id }) => {
  const [step, setStep] = useState<'step1' | 'step1-add' | 'step2' | 'step3'>('step1');

  const [surveyById, setSurveyById] = useState<ISurveyModel | undefined>(undefined);

  const { loading } = useQuery<{ surveyByIdClient: ISurveyModel }>(SURVEY_BY_ID_CLIENT, {
    variables: {
      payload: {
        id: id
      }
    },
    onCompleted: (data) => {
      setSurveyById(data.surveyByIdClient);
    },
    skip: Boolean(!id)
  });

  if (loading) {
    return (
      <Box sx={styles.container}>
        <Loader animationDelay={0} color={colors.green} />
      </Box>
    );
  }

  if (surveyById?.status === SurveyStatusEnum.New) {
    return <ErrorPage text={'The rating form has not yet been confirmed'} />;
  }

  if (surveyById?.status === SurveyStatusEnum.Done) {
    return <ErrorPage text={'The rating form has already been passed.'} />;
  }

  if (surveyById?.status === SurveyStatusEnum.SurveySent) {
    return (
      <Box sx={styles.container}>
        <SurveyStep3 surveyByUuid={surveyById} id={id} />
      </Box>
    );
  }

  if (surveyById?.status !== SurveyStatusEnum.BuyerConfirmed) {
    return <ErrorPage text={`The rating form has the wrong status`} />;
  }

  return (
    <Box sx={styles.container}>
      {step === 'step1' && <SurveyStep1 setStep={setStep} surveyByUuid={surveyById} />}
      {step === 'step1-add' && <SurveyStep1Add setStep={setStep} surveyByUuid={surveyById} />}
      {step === 'step2' && <SurveyStep2 setStep={setStep} id={id} surveyByUuid={surveyById} />}
      {step === 'step3' && <SurveyStep3 surveyByUuid={surveyById} id={id} />}
    </Box>
  );
};

export default Survey;
