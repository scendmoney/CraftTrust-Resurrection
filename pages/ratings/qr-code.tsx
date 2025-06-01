import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import ErrorPage from 'sharedProject/components/ErrorPage/ErrorPage';
import seo from 'sharedProject/seo';

import SurveyQrCode from 'components/Survey/SurveyQrCode/SurveyQrCode';

const QrCodePage: FC = () => {
  const router = useRouter();
  const uuid = nextRouterQueryCheckText(router?.query?.uuid);

  if (!uuid) {
    return <ErrorPage text={'Wrong ID'} />;
  }

  return (
    <>
      <Head>
        <title>Survey QrCode - {seo.name}</title>
      </Head>
      <SurveyQrCode uuid={uuid} />
    </>
  );
};

export default QrCodePage;
