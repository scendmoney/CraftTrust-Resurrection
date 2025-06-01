import { RequestStatusEnum } from 'graphql/_server';

const mappingRequestMessageStatusRevers = (oldMessage?: string): RequestStatusEnum | string => {
  switch (oldMessage) {
    case 'Unread':
      return RequestStatusEnum.New;
    default:
      return 'All Contact Forms';
  }
};

export default mappingRequestMessageStatusRevers;
