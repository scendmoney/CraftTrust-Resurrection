import { FacilityRoleEnum } from 'graphql/_server';

export const mappingFacilitiesRole = (old?: FacilityRoleEnum | undefined): string => {
  switch (old) {
    case FacilityRoleEnum.Buyer:
      return 'Buyer';
    case FacilityRoleEnum.BuyerAndCultivator:
      return 'Buyer and Cultivator';
    case FacilityRoleEnum.Cultivator:
      return 'Cultivator';
    default:
      return '--';
  }
};

export const facilityRoles = [
  {
    value: FacilityRoleEnum.Buyer,
    label: 'Buyer'
  },
  {
    value: FacilityRoleEnum.BuyerAndCultivator,
    label: 'Buyer and Cultivator'
  },
  {
    value: FacilityRoleEnum.Cultivator,
    label: 'Cultivator'
  }
];
