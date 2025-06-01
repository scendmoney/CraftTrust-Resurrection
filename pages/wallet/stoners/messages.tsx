import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import BluredWrapper from 'components/BluredWrapper/BluredWrapper';
import { chats } from 'components/Wallet/shared/data/chats';
import WalletTabs from 'components/Wallet/shared/WalletTabs/WalletTabs';
import WalletChats from 'components/Wallet/WalletChats/WalletChats';

const MessagesPage: FC = () => {
  return (
    <>
      <Head>
        <title>Wallet Messages - {seo.name}</title>
      </Head>
      <WalletTabs
        options={[
          {
            value: '/wallet/stoners/contacts',
            label: 'Contacts'
          },
          {
            value: '/wallet/stoners/messages',
            label: 'Messages'
          }
        ]}
      />
      <BluredWrapper>
        <WalletChats chats={chats} />
      </BluredWrapper>
    </>
  );
};

export default MessagesPage;
