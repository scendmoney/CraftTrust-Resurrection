import { CompanyStatusEnum } from 'graphql/_server';

export const companyStatus = [
  { value: CompanyStatusEnum.Draft, label: 'Draft' },
  { value: CompanyStatusEnum.Completed, label: 'Completed' },
  { value: CompanyStatusEnum.Pending, label: 'Approval Pending' },
  { value: CompanyStatusEnum.Active, label: 'Active' },
  { value: CompanyStatusEnum.Archived, label: 'Archived' },
  { value: CompanyStatusEnum.Rejected, label: 'Rejected' }
];
