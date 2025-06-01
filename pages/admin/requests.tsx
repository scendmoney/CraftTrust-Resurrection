import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import AdminRequests from 'components/Admin/AdminRequests/AdminRequests';

const RequestsPage: FC = () => {
  return (
    <>
      <Head>
        <title>Requests - {seo.name}</title>
      </Head>
      <AdminRequests />
    </>
  );
};

export default RequestsPage;
