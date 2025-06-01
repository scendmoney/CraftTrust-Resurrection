import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

const SurveyLotteryResultsPage: FC = () => {
  return (
    <>
      <Head>
        <title>Survey Lottery Results - {seo.name}</title>
      </Head>
    </>
  );
};

export default SurveyLotteryResultsPage;
