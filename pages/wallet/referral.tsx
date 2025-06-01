import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import WalletReferral from 'components/Wallet/WalletReferral/WalletReferral';

const WalletReferralPage: FC = () => {
  return (
    <>
      <Head>
        <title>Wallet Referral - {seo.name}</title>
      </Head>
      <WalletReferral />
    </>
  );
};

export default WalletReferralPage;
