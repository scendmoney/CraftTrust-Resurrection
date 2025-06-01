import { NextPage } from 'next';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import EmailSignIn from 'components/auth/EmailSignIn/EmailSignIn';

const EmailPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>E-mail Sign In - {seo.name}</title>
      </Head>
      <EmailSignIn />
    </>
  );
};

export default EmailPage;
