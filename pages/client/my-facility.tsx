import { FC } from 'react';
import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { IUserModel } from 'graphql/_server';
import { ME_USER_CONTEXT_PROFILE } from 'graphql/queries/me';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import ClientFacilityProfile from 'components/Client/ClientFacilityProfile/ClientFacilityProfile';
import Loader from 'components/Loader/Loader';

const MyFacilityPage: FC = () => {
  useCustomerIoAnalytics(true);
  const { data, loading } = useQuery<{ me: IUserModel }>(ME_USER_CONTEXT_PROFILE);
  const dataMe = data?.me;

  if (!dataMe) return null;

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Profile - {seo.name}</title>
      </Head>
      <Fade in={Boolean(dataMe)} timeout={1200}>
        <Box>
          <ClientFacilityProfile user={dataMe} />
        </Box>
      </Fade>
    </>
  );
};

export default MyFacilityPage;
