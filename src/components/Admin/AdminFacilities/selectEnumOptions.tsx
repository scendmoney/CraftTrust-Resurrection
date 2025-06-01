import { FacilityRoleEnum } from 'graphql/_server';

export const facilityRoles = [
  { value: FacilityRoleEnum.Cultivator, label: 'Cultivators' },
  { value: FacilityRoleEnum.Buyer, label: 'Buyers' },
  { value: FacilityRoleEnum.BuyerAndCultivator, label: 'Buyer and Cultivator' }
];
