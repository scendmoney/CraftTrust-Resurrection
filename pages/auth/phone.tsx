import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import PhoneSignIn from 'components/auth/PhoneSignIn/PhoneSignIn';

const SingInPage: FC = () => {
  return (
    <>
      <Head>
        <title>Sign In - {seo.name}</title>
      </Head>
      <PhoneSignIn />
    </>
  );
};

export default SingInPage;
