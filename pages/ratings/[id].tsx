import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckId from 'sharedArchitech/utils/nextRouterQueryCheckId';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import ErrorPage from 'sharedProject/components/ErrorPage/ErrorPage';
import seo from 'sharedProject/seo';

import Survey from 'components/Survey/Survey';

const SurveyPage: FC = () => {
  const router = useRouter();
  const id = nextRouterQueryCheckId(router?.query?.id);

  if (!id) {
    return <ErrorPage text={'Wrong Survey'} />;
  }

  return (
    <>
      <Head>
        <title>Survey - {seo.name}</title>
      </Head>
      <Survey id={id} />
    </>
  );
};

export default SurveyPage;
