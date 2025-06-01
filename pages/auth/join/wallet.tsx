import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckId from 'sharedArchitech/utils/nextRouterQueryCheckId';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import seo from 'sharedProject/seo';

import JoinWallet from 'components/auth/JoinWallet/JoinWallet';

const JoinWalletPage: FC = () => {
  const router = useRouter();
  const subcompanyId = nextRouterQueryCheckId(router?.query?.subcompanyId);
  const phone = nextRouterQueryCheckText(router?.query?.phone);

  return (
    <>
      <Head>
        <title>Sign in to Continue - {seo.name}</title>
      </Head>

      <JoinWallet subcompanyId={subcompanyId} phone={phone} />
    </>
  );
};

export default JoinWalletPage;
