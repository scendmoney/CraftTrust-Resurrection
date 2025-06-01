import { RequestFacilityRoleEnum } from 'graphql/_server';

const mappingRequestTypeRevers = (oldMessage?: string): RequestFacilityRoleEnum | string => {
  switch (oldMessage) {
    case 'Cultivators':
      return RequestFacilityRoleEnum.Cultivator;
    case 'Buyers':
      return RequestFacilityRoleEnum.Buyer;
    default:
      return 'All Request';
  }
};

export default mappingRequestTypeRevers;
