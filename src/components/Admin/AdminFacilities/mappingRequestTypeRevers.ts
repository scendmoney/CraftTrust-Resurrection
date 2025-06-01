import { FacilityRoleEnum } from 'graphql/_server';

const mappingFacilityRoleRevers = (oldMessage?: string): FacilityRoleEnum | string => {
  switch (oldMessage) {
    case 'Buyers':
      return FacilityRoleEnum.Buyer;
    case 'Cultivators':
      return FacilityRoleEnum.Cultivator;
    case 'Buyer and Cultivator':
      return FacilityRoleEnum.BuyerAndCultivator;
    default:
      return 'All Facilities';
  }
};

export default mappingFacilityRoleRevers;
