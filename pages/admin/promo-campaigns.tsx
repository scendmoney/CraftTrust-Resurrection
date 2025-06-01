import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import AdminPromoCompanies from 'components/Admin/AdminPromoCompanies/AdminPromoCompanies';

const AdminPromoCompaniesPage: FC = () => {
  return (
    <>
      <Head>
        <title>Campaigns - {seo.name}</title>
      </Head>
      <AdminPromoCompanies />
    </>
  );
};

export default AdminPromoCompaniesPage;
