import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import AdminMessages from 'components/Admin/AdminMessages/AdminMessages';

const MessagesPage: FC = () => {
  return (
    <>
      <Head>
        <title>Forms - {seo.name}</title>
      </Head>
      <AdminMessages />
    </>
  );
};

export default MessagesPage;
