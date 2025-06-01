import { FC } from 'react';
import Head from 'next/head';
import useCustomerIoAnalytics from 'sharedProject/hooks/useCustomerIoAnalytics';
import seo from 'sharedProject/seo';

import CultivatorInventory from 'components/Cultivator/CultivatorInventory/CultivatorInventory';

const InventoryPage: FC = () => {
  useCustomerIoAnalytics(true);
  return (
    <>
      <Head>
        <title>Inventory Cultivator - {seo.name}</title>
      </Head>
      <CultivatorInventory />
    </>
  );
};

export default InventoryPage;
