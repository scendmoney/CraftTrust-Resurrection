import type { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import WalletIndex from 'components/Wallet/WalletIndex/WalletIndex';

const WalletIndexPage: FC = () => {
  return (
    <>
      <Head>
        <title>Wallet My Strains - {seo.name}</title>
      </Head>

      <>
        <WalletIndex />
      </>
    </>
  );
};

export default WalletIndexPage;
