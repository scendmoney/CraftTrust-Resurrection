import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import AdminUsers from 'components/Admin/AdminUsers/AdminUsers';

const UsersPage: FC = () => {
  return (
    <>
      <Head>
        <title>Users - {seo.name}</title>
      </Head>
      <AdminUsers />
    </>
  );
};

export default UsersPage;
