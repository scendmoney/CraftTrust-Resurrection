import { FacilityRoleEnum } from 'graphql/_server';

export const usersRolesBuyers = [
  { value: FacilityRoleEnum.Buyer, label: 'Buyer' },
  { value: FacilityRoleEnum.BuyerAndCultivator, label: 'Buyer and Cultivator' }
];

export const usersRolesCultivators = [
  { value: FacilityRoleEnum.Cultivator, label: 'Cultivator' },
  { value: FacilityRoleEnum.BuyerAndCultivator, label: 'Buyer and Cultivator' }
];
