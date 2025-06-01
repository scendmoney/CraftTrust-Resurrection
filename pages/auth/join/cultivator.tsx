import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import ErrorPage from 'sharedProject/components/ErrorPage/ErrorPage';
import seo from 'sharedProject/seo';

import JoinCultivator from 'components/auth/JoinCultivator/SignUp';

const JoinCultivatorPage: FC = () => {
  const router = useRouter();
  const code = nextRouterQueryCheckText(router.query.code);

  if (!code) {
    return <ErrorPage text={'Wrong code'} />;
  }
  return (
    <>
      <Head>
        <title>Join Cultivator - {seo.name}</title>
      </Head>
      <JoinCultivator code={code} />
    </>
  );
};

export default JoinCultivatorPage;
