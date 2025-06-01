import { ReactElement } from 'react';
import AnalyticsIcon from 'resources/iconsMui/AnalyticsIcon';
import BuyersIcon from 'resources/iconsMui/BuyersIcon';
import ChatIcon from 'resources/iconsMui/ChatIcon';
import CompaniesIcon from 'resources/iconsMui/CompaniesIcon';
import EmployeesIcon from 'resources/iconsMui/EmployeesIcon';
import InventoryIcon from 'resources/iconsMui/InventoryIcon';
import OrderIcon from 'resources/iconsMui/OrderIcon';
import TransactionIcon from 'resources/iconsMui/TransactionIcon';
import Routes from 'routes';

export type TListItem = {
  value: Routes;
  label: string;
  selectedWhen: Routes[];
  icon: ReactElement;
  disabled?: boolean;
  isAlert?: boolean;
};

export const listItems1 = (
  isChatMessage: boolean,
  isNewCampaign: boolean,
  newOrder: boolean
): TListItem[] => {
  return [
    {
      value: Routes.CULTIVATOR_REPORTS_BUYERS_INSIGHTS,
      label: 'Analytics',
      icon: <AnalyticsIcon />,
      disabled: false,
      selectedWhen: [Routes.CULTIVATOR_REPORTS_BUYERS_INSIGHTS]
    },
    {
      value: Routes.CULTIVATOR_MESSAGES,
      label: 'Messages',
      icon: <ChatIcon />,
      disabled: false,
      selectedWhen: [Routes.CULTIVATOR_MESSAGES],
      isAlert: isChatMessage
    },
    {
      value: Routes.CULTIVATOR_ORDERS,
      label: 'Orders',
      icon: <OrderIcon />,
      disabled: false,
      selectedWhen: [Routes.CULTIVATOR_ORDERS],
      isAlert: newOrder
    },
    {
      value: Routes.CULTIVATOR_PROMO_CAMPAIGNS,
      label: 'Campaigns',
      icon: <CompaniesIcon />,
      selectedWhen: [Routes.CULTIVATOR_PROMO_CAMPAIGNS],
      disabled: false,
      isAlert: isNewCampaign
    }
  ];
};

export const listItems2: TListItem[] = [
  {
    value: Routes.CULTIVATOR_TRANSACTIONS,
    label: 'Transactions',
    icon: <TransactionIcon />,
    selectedWhen: [Routes.CULTIVATOR_TRANSACTIONS],
    disabled: false
  },
  // {
  //   value: Routes.CULTIVATOR_LISTING,
  //   label: 'Listings',
  //   icon: <StorefrontOutlinedIcon />,
  //   disabled: true,
  //   selectedWhen: [Routes.CULTIVATOR_LISTING]
  // },
  {
    value: Routes.CULTIVATOR_INVENTORY,
    label: 'Inventory',
    icon: <InventoryIcon />,
    selectedWhen: [Routes.CULTIVATOR_INVENTORY]
  }
];

export const listItems3: TListItem[] = [
  {
    value: Routes.CULTIVATOR_BUYERS,
    label: 'Buyers',
    icon: <BuyersIcon />,
    selectedWhen: [Routes.CULTIVATOR_BUYERS, Routes.CULTIVATOR_BUYERS_INVITES]
  },
  {
    value: Routes.CULTIVATOR_EMPLOYEES,
    label: 'Employees',
    icon: <EmployeesIcon />,
    disabled: false,
    selectedWhen: [Routes.CULTIVATOR_EMPLOYEES, Routes.CULTIVATOR_EMPLOYEES_INVITES]
  }
];
