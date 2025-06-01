import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import seo from 'sharedProject/seo';

import CheckSmsCode from 'components/auth/CheckSmsCode/CheckSmsCode';

const SmsCodePage: NextPage = () => {
  const router = useRouter();
  const phone = nextRouterQueryCheckText(router.query.phone);

  useEffect(() => {
    if (!phone) {
      router.push('/404');
    }
  }, [phone, router]);

  if (!phone) {
    return null;
  }

  return (
    <>
      <Head>
        <title>SMS Code - {seo.name}</title>
      </Head>
      <CheckSmsCode phone={phone} />
    </>
  );
};

export default SmsCodePage;
