import { RequestTypeEnum } from 'graphql/_server';

const mappingRequestType = (oldMessage?: RequestTypeEnum | undefined): string => {
  switch (oldMessage) {
    case RequestTypeEnum.ContactUs:
      return 'Contact Us';
    case RequestTypeEnum.Request:
      return 'Sign Up';
    default:
      return '--';
  }
};

export default mappingRequestType;
