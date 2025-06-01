import { FC } from 'react';
import Head from 'next/head';
import useMeClient from 'sharedProject/hooks/useMeClient';
import seo from 'sharedProject/seo';

import Loader from 'components/Loader/Loader';
import WalletProfile from 'components/Wallet/WalletProfile/WalletProfile';

const WalletLotteryPage: FC = () => {
  const { dataMe, loadingMe } = useMeClient();

  if (loadingMe) {
    return <Loader />;
  }

  if (!dataMe) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Wallet Lottery - {seo.name}</title>
      </Head>
      <WalletProfile user={dataMe} />
    </>
  );
};

export default WalletLotteryPage;
