import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import ErrorPage from 'sharedProject/components/ErrorPage/ErrorPage';
import seo from 'sharedProject/seo';

import JoinBuyer from 'components/auth/JoinBuyer/JoinBuyer';

const JoinBuyerPage: FC = () => {
  const router = useRouter();
  const code = nextRouterQueryCheckText(router.query.code);

  if (!code) {
    return <ErrorPage text={'Wrong code'} />;
  }

  return (
    <>
      <Head>
        <title>Join Buyer - {seo.name}</title>
      </Head>
      <JoinBuyer code={code} />
    </>
  );
};

export default JoinBuyerPage;
