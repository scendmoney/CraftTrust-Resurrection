import { ReactElement } from 'react';
import AnalyticsIcon from 'resources/iconsMui/AnalyticsIcon';
import BuyersIcon from 'resources/iconsMui/BuyersIcon';
import ChatIcon from 'resources/iconsMui/ChatIcon';
import CompaniesIcon from 'resources/iconsMui/CompaniesIcon';
import EmployeesIcon from 'resources/iconsMui/EmployeesIcon';
import InventoryIcon from 'resources/iconsMui/InventoryIcon';
import OrderIcon from 'resources/iconsMui/OrderIcon';
import RequestsIcon from 'resources/iconsMui/RequestsIcon';
import SettingIcon from 'resources/iconsMui/SettingIcon';
import StoreIcon from 'resources/iconsMui/StoreIcon';
import TransactionIcon from 'resources/iconsMui/TransactionIcon';
import Routes from 'routes';

type TListItem = {
  value: Routes;
  label: string;
  selectedWhen: Routes[];
  icon: ReactElement;
  disabled?: boolean;
  isAlert?: boolean;
};

export const listItems1 = (newRequest: boolean, newMessage: boolean): TListItem[] => [
  {
    value: Routes.ADMIN_REPORTS_CULTIVATOR_INSIGHTS,
    label: 'Analytics',
    icon: <AnalyticsIcon />,
    disabled: false,
    selectedWhen: [Routes.ADMIN_REPORTS_CULTIVATOR_INSIGHTS, Routes.ADMIN_REPORTS_BUYERS_INSIGHTS]
  },
  {
    value: Routes.ADMIN_MESSAGES,
    label: 'Contact Forms',
    icon: <ChatIcon />,
    selectedWhen: [Routes.ADMIN_MESSAGES],
    isAlert: newMessage
  },
  {
    value: Routes.ADMIN_REQUESTS,
    label: 'Requests',
    icon: <RequestsIcon />,
    selectedWhen: [Routes.ADMIN_REQUESTS],
    isAlert: newRequest
  },
  {
    value: Routes.ADMIN_PROMO_CAMPAIGNS,
    label: 'Campaigns',
    icon: <CompaniesIcon />,
    selectedWhen: [Routes.ADMIN_PROMO_CAMPAIGNS],
    disabled: false
  }
];

export const listItems2: TListItem[] = [
  {
    value: Routes.ADMIN_FACILITIES,
    label: 'Facilities',
    icon: <StoreIcon />,
    selectedWhen: [Routes.ADMIN_FACILITIES]
  },
  {
    value: Routes.ADMIN_USERS,
    label: 'Users',
    icon: <BuyersIcon />,
    selectedWhen: [Routes.ADMIN_USERS]
  },
  {
    value: Routes.ADMIN_TRANSACTIONS,
    label: 'Transactions',
    icon: <TransactionIcon />,
    selectedWhen: [Routes.ADMIN_TRANSACTIONS],
    disabled: false
  },
  {
    value: Routes.ADMIN_PRODUCTS,
    label: 'Products',
    icon: <InventoryIcon />,
    selectedWhen: [Routes.ADMIN_PRODUCTS],
    disabled: false
  },
  {
    value: Routes.ADMIN_ORDERS,
    label: 'Orders',
    icon: <OrderIcon />,
    disabled: false,
    selectedWhen: [Routes.ADMIN_ORDERS]
  }
];

export const listItems3: TListItem[] = [
  {
    value: Routes.ADMIN_ADMINS,
    label: 'Admins',
    icon: <EmployeesIcon />,
    selectedWhen: [Routes.ADMIN_ADMINS]
  },
  {
    value: Routes.ADMIN_SETTINGS,
    label: 'Settings',
    icon: <SettingIcon />,
    disabled: false,
    selectedWhen: [Routes.ADMIN_SETTINGS]
  }
];
