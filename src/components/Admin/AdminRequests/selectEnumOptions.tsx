import { RequestFacilityRoleEnum, RequestStatusEnum } from 'graphql/_server';

export const requestStatuses = [
  { value: RequestStatusEnum.Approved, label: 'Approved' },
  { value: RequestStatusEnum.Rejected, label: 'Rejected' },
  { value: RequestStatusEnum.Processing, label: 'Processing' },
  { value: RequestStatusEnum.New, label: 'New' }
];

export const facilityRoles = [
  { value: RequestFacilityRoleEnum.Cultivator, label: 'Cultivators' },
  { value: RequestFacilityRoleEnum.Buyer, label: 'Buyers' }
];
