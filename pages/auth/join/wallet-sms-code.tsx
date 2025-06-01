import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckId from 'sharedArchitech/utils/nextRouterQueryCheckId';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import seo from 'sharedProject/seo';

import JoinWalletSmsCode from 'components/auth/JoinWalletSmsCode/JoinWalletSmsCode';

const JoinWalletSmsCodePage: FC = () => {
  const router = useRouter();
  const subcompanyId = nextRouterQueryCheckId(router?.query?.subcompanyId);
  const phone = nextRouterQueryCheckText(router?.query?.phone);
  const fullName = nextRouterQueryCheckText(router?.query?.fullName);

  if (!phone) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Welcome to Top-Shelf Grams - {seo.name}</title>
      </Head>

      <JoinWalletSmsCode subcompanyId={subcompanyId} phone={phone} fullName={fullName} />
    </>
  );
};

export default JoinWalletSmsCodePage;
