import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import { ISurveyModel } from 'graphql/_server';
import { SURVEY_BY_UUID } from 'graphql/queries/survayByUuid';
import { colors } from 'mui/theme/colors';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import ErrorPage from 'sharedProject/components/ErrorPage/ErrorPage';
import seo from 'sharedProject/seo';

import Loader from 'components/Loader/Loader';
import SurveyLotteryIndex from 'components/surveyLotteryV2/SurveryLotteryIndex/SurveyLotteryIndex';

const LotteryPage: FC = () => {
  const router = useRouter();
  const uuid = nextRouterQueryCheckText(router?.query?.uuid);

  const [surveyByUuid, setSurveyByUuid] = useState<ISurveyModel | undefined>(undefined);

  const { loading } = useQuery<{ surveyByUuid: ISurveyModel }>(SURVEY_BY_UUID, {
    variables: {
      uuid: uuid
    },
    onCompleted: (data) => {
      setSurveyByUuid(data.surveyByUuid);
    },
    skip: Boolean(!uuid)
  });

  if (loading) {
    return (
      <Box>
        <Loader animationDelay={0} color={colors.green} />
      </Box>
    );
  }

  if (!uuid || !surveyByUuid) {
    return <ErrorPage text={'Wrong campaign'} />;
  }

  return (
    <>
      <Head>
        <title>Survey Lottery - {seo.name}</title>
      </Head>
      <SurveyLotteryIndex surveyByUuid={surveyByUuid} />
    </>
  );
};

export default LotteryPage;
