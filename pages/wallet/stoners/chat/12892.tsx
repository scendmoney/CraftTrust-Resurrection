import { FC } from 'react';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import BluredWrapper from 'components/BluredWrapper/BluredWrapper';
import WalletChat from 'components/Wallet/WalletChat/WalletChat';

const ChatPage: FC = () => {
  return (
    <>
      <Head>
        <title>Chat Page - {seo.name}</title>
      </Head>
      <BluredWrapper>
        <WalletChat />
      </BluredWrapper>
    </>
  );
};

export default ChatPage;
