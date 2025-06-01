import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import SurveyLotterySignInWallet from 'components/surveyLotteryV1/SurveyLotterySignInWallet/SurveyLotterySignInWallet';

const SurveyLotterySignInWalletPage: FC = () => {
  return (
    <>
      <Head>
        <title>Survey Lottery Sign In - {seo.name}</title>
      </Head>
      <SurveyLotterySignInWallet uuid={''} />
    </>
  );
};

export default SurveyLotterySignInWalletPage;
