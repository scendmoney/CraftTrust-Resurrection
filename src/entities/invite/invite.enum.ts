import { registerEnumType } from '@nestjs/graphql';

export enum InviteTypeEnum {
  buyer = 'buyer',
  employee = 'employee',
}

export enum InviteStatusEnum {
  processing = 'processing',
  approved = 'approved',
  rejected = 'rejected',
}

registerEnumType(InviteTypeEnum, { name: 'InviteTypeEnum' });
registerEnumType(InviteStatusEnum, { name: 'InviteStatusEnum' });
