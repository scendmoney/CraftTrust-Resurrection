import { FC } from 'react';
import Head from 'next/head';
import useMeClient from 'sharedProject/hooks/useMeClient';
import seo from 'sharedProject/seo';

import Loader from 'components/Loader/Loader';
import WalletSettings from 'components/Wallet/WalletSettings/WalletSettings';

const WalletSettingsPage: FC = () => {
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
        <title>Wallet Settings - {seo.name}</title>
      </Head>
      <WalletSettings user={dataMe} />
    </>
  );
};

export default WalletSettingsPage;
