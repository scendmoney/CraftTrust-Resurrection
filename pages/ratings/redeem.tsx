import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import ErrorPage from 'sharedProject/components/ErrorPage/ErrorPage';
import seo from 'sharedProject/seo';

import SurveyRedeem from 'components/Survey/SurveyRedeem/SurveyRedeem';

const ClientRedeemPage: FC = () => {
  const router = useRouter();
  const uuid = nextRouterQueryCheckText(router?.query?.uuid);

  if (!uuid) {
    return <ErrorPage text={'Wrong campaign'} />;
  }

  return (
    <>
      <Head>
        <title>Ratings Redeem - {seo.name}</title>
      </Head>
      <SurveyRedeem uuid={uuid} />
    </>
  );
};

export default ClientRedeemPage;
