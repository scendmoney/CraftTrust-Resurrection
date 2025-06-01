import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import AdminInventory from 'components/Admin/AdminInventory/AdminInventory';

const AdminProductsPage: FC = () => {
  return (
    <>
      <Head>
        <title>Campaigns - {seo.name}</title>
      </Head>
      <AdminInventory />
    </>
  );
};

export default AdminProductsPage;
