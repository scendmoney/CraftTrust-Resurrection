import { RequestStatusEnum } from 'graphql/_server';

const mappingRequestMessageStatus = (oldMessage?: RequestStatusEnum | undefined): string => {
  switch (oldMessage) {
    case RequestStatusEnum.Closed:
      return 'Completed';
    case RequestStatusEnum.New:
      return 'Unread';
    case RequestStatusEnum.Processing:
      return 'Processing';
    default:
      return '--';
  }
};

export default mappingRequestMessageStatus;
