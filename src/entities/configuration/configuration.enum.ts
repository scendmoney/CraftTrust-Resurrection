import { registerEnumType } from '@nestjs/graphql';

export enum ConfigurationTypesEnum {
  commissionOrderBuyer = 'commissionOrderBuyer',
  commissionOrderCultivator = 'commissionOrderCultivator',
}

registerEnumType(ConfigurationTypesEnum, { name: 'ConfigurationTypesEnum' });
