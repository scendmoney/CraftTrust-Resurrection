import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import ErrorPage from 'sharedProject/components/ErrorPage/ErrorPage';
import seo from 'sharedProject/seo';

import SurveyLotteryIndex from 'components/surveyLotteryV1/SurveryLotteryIndex/SurveyLotteryIndex';

const LotteryPage: FC = () => {
  const router = useRouter();
  const uuid = nextRouterQueryCheckText(router?.query?.uuid);

  if (!uuid) {
    return <ErrorPage text={'Wrong campaign'} />;
  }

  return (
    <>
      <Head>
        <title>Survey Lottery - {seo.name}</title>
      </Head>
      <SurveyLotteryIndex uuid={''} />
    </>
  );
};

export default LotteryPage;
