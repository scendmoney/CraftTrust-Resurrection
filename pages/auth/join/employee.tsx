import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import ErrorPage from 'sharedProject/components/ErrorPage/ErrorPage';
import seo from 'sharedProject/seo';

import JoinEmployee from 'components/auth/JoinEmployee/JoinEmployee';

const JoinEmployeePage: FC = () => {
  const router = useRouter();
  const code = nextRouterQueryCheckText(router.query.code);

  if (!code) {
    return <ErrorPage text={'Wrong code'} />;
  }

  return (
    <>
      <Head>
        <title>Join Employee - {seo.name}</title>
      </Head>
      <JoinEmployee code={code} />
    </>
  );
};

export default JoinEmployeePage;
