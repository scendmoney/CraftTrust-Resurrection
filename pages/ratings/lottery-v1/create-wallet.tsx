import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import SurveyLotteryCreateWallet from 'components/surveyLotteryV1/SurveyLotteryCreateWallet/SurveyLotteryCreateWallet';

const SurveyLotteryCreateWalletPage: FC = () => {
  return (
    <>
      <Head>
        <title>Survey Lottery - {seo.name}</title>
      </Head>
      <SurveyLotteryCreateWallet uuid={''} />
    </>
  );
};

export default SurveyLotteryCreateWalletPage;
