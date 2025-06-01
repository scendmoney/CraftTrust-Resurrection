import { registerEnumType } from '@nestjs/graphql';

export enum RequestTypeEnum {
  contactUs = 'contactUs',
  request = 'request',
}

export enum RequestStatusEnum {
  new = 'new',
  processing = 'processing',
  closed = 'closed',
  approved = 'approved',
  rejected = 'rejected',
}

export enum RequestFacilityRoleEnum {
  buyer = 'buyer',
  cultivator = 'cultivator',
}

registerEnumType(RequestTypeEnum, { name: 'RequestTypeEnum' });
registerEnumType(RequestStatusEnum, { name: 'RequestStatusEnum' });
registerEnumType(RequestFacilityRoleEnum, { name: 'RequestFacilityRoleEnum' });
