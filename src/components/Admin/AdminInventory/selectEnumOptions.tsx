import { ProductStatusEnum } from 'graphql/_server';

export const inventoryStatuses = [
  { value: ProductStatusEnum.New, label: 'New' },
  { value: ProductStatusEnum.Archived, label: 'Archived' },
  { value: ProductStatusEnum.Listed, label: 'Listed' },
  { value: ProductStatusEnum.Unlisted, label: 'Unlisted' }
];
