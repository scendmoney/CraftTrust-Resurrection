import { registerEnumType } from '@nestjs/graphql';

export enum CompanyStatusEnum {
  Active = 'Active',
  Draft = 'Draft',
  Archived = 'Archived',
  Pending = 'Pending',
  Rejected = 'Rejected',
  Completed = 'Completed',
}

registerEnumType(CompanyStatusEnum, { name: 'CompanyStatusEnum' });
