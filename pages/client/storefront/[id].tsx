import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import ClientCultivatorById from 'components/Client/ClientCultivatorById/ClientCultivatorById';

const CultivatorStorefrontId: NextPage = () => {
  const router = useRouter();
  const cultivatorId = nextRouterQueryCheckText(router?.query?.id);
  useCustomerIoAnalytics(true);

  if (!cultivatorId) {
    return null;
  }
  return (
    <div>
      <Head>
        <title>Cultivator Storefront - {seo.name}</title>
      </Head>
      <ClientCultivatorById cultivatorId={cultivatorId} />
    </div>
  );
};

export default CultivatorStorefrontId;
