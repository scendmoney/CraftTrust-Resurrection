import { registerEnumType } from '@nestjs/graphql';

export enum FacilityRoleEnum {
  buyer = 'buyer',
  cultivator = 'cultivator',
  buyerAndCultivator = 'buyerAndCultivator',
}

registerEnumType(FacilityRoleEnum, { name: 'FacilityRoleEnum' });
