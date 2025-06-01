import { RequestStatusEnum } from 'graphql/_server';

const mappingRequestStatus = (oldMessage?: RequestStatusEnum | undefined): string => {
  switch (oldMessage) {
    case RequestStatusEnum.Closed:
      return 'Closed';
    case RequestStatusEnum.New:
      return 'New';
    case RequestStatusEnum.Processing:
      return 'Processing';
    case RequestStatusEnum.Approved:
      return 'Approved';
    case RequestStatusEnum.Rejected:
      return 'Rejected';
    default:
      return '--';
  }
};

export default mappingRequestStatus;
