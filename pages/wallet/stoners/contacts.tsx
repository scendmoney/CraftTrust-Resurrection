import { FC } from 'react';
import Box from '@mui/material/Box';
import Head from 'next/head';
import seo from 'sharedProject/seo';

import BluredWrapper from 'components/BluredWrapper/BluredWrapper';
import { contacts } from 'components/Wallet/shared/data/contacts';
import WalletTabs from 'components/Wallet/shared/WalletTabs/WalletTabs';
import WalletContacts from 'components/Wallet/WalletContacts/WalletContacts';

const ContactsPage: FC = () => {
  return (
    <>
      <Head>
        <title>Wallet Contacts - {seo.name}</title>
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
      <Box>
        <BluredWrapper>
          <WalletContacts chats={contacts} />
        </BluredWrapper>
      </Box>
    </>
  );
};

export default ContactsPage;
