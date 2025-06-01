import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import AdminAdmins from 'components/Admin/AdminAdmins/AdminAdmins';

const AdminsPage: FC = () => {
  return (
    <>
      <Head>
        <title>Admins - {seo.name}</title>
      </Head>
      <AdminAdmins />
    </>
  );
};

export default AdminsPage;
