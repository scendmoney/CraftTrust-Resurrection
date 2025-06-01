import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import BluredWrapper from 'components/BluredWrapper/BluredWrapper';
import WalletTabs from 'components/Wallet/shared/WalletTabs/WalletTabs';
import WalletFeed from 'components/Wallet/WalletFeed/WalletFeed';

const WalletFeedPage: FC = () => {
  return (
    <>
      <Head>
        <title>Wallet Stoners Feed - {seo.name}</title>
      </Head>

      <>
        <WalletTabs
          options={[
            {
              value: '/wallet/streams/feed',
              label: 'Feed'
            },
            {
              value: '/wallet/streams/surveys',
              label: 'Surveys',
              disabled: true
            },
            {
              value: '/wallet/streams/cultivators',
              label: 'Cultivators',
              disabled: true
            }
          ]}
        />
        <BluredWrapper>
          <WalletFeed />
        </BluredWrapper>
      </>
    </>
  );
};

export default WalletFeedPage;
