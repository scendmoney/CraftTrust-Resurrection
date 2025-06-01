import { ReactElement } from 'react';
import Routes from 'routes';

type TListItem = {
  value: Routes;
  label?: string;
  icon?: ReactElement;
  disabled?: boolean;
};

export const listItems1: TListItem[] = [
  {
    value: Routes.CLIENT,
    label: 'Storefront',
    disabled: false
  },
  {
    value: Routes.BLOG,
    label: 'Blog',
    disabled: true
  },
  {
    value: Routes.CONTACT,
    label: 'Contact',
    disabled: true
  }
];
