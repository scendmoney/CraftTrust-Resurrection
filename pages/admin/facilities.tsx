import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import AdminFacilities from 'components/Admin/AdminFacilities/AdminFacilities';

const FacilitiesPage: FC = () => {
  return (
    <>
      <Head>
        <title>Facilities - {seo.name}</title>
      </Head>
      <AdminFacilities />
    </>
  );
};

export default FacilitiesPage;
