import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import BluredWrapper from 'components/BluredWrapper/BluredWrapper';
import WalletTabs from 'components/Wallet/shared/WalletTabs/WalletTabs';

const WalletCultivatorsPage: FC = () => {
  return (
    <>
      <Head>
        <title>Wallet Cultivators Feed - {seo.name}</title>
      </Head>
      <BluredWrapper>
        <WalletTabs
          options={[
            {
              value: '/wallet/streams/feed',
              label: 'Feed'
            },
            {
              value: '/wallet/streams/surveys',
              label: 'Surveys'
            },
            {
              value: '/wallet/streams/cultivators',
              label: 'Cultivators'
            }
          ]}
        />
      </BluredWrapper>
    </>
  );
};

export default WalletCultivatorsPage;
