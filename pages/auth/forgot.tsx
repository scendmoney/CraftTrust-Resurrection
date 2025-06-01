import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import seo from 'sharedProject/seo';

import ForgotPassword from 'components/auth/ForgotPassword/ForgotPassword';

const ForgotPasswordPage: NextPage = () => {
  const router = useRouter();
  const code = nextRouterQueryCheckText(router.query.code);

  useEffect(() => {
    if (!code) {
      router.push('/404');
    }
  }, [code, router]);

  if (!code) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Forgot Password Code - {seo.name}</title>
      </Head>
      <ForgotPassword code={code} />
    </>
  );
};

export default ForgotPasswordPage;
