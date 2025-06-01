import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import seo from 'sharedProject/seo';

import PasswordRecovery from 'components/auth/PasswordRecovery/PasswordRecovery';

const PasswordRecoveryPage: NextPage = () => {
  const router = useRouter();
  const email = nextRouterQueryCheckText(router.query.email);

  return (
    <>
      <Head>
        <title>Forgot Password Code - {seo.name}</title>
      </Head>
      <PasswordRecovery email={email} />
    </>
  );
};

export default PasswordRecoveryPage;
