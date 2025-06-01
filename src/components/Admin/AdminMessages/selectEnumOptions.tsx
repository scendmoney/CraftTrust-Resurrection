import { RequestStatusEnum } from 'graphql/_server';

export const messageStatuses = [
  { value: RequestStatusEnum.Closed, label: 'Completed' },
  { value: RequestStatusEnum.New, label: 'Unread' },
  { value: RequestStatusEnum.Processing, label: 'Processing' }
];
