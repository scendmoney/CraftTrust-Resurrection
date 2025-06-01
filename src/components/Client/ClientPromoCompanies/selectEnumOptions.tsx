import { CompanyStatusEnum } from 'graphql/_server';

export const companyStatus = [
  { value: CompanyStatusEnum.Active, label: 'Active' },
  { value: CompanyStatusEnum.Completed, label: 'Completed' },
  { value: CompanyStatusEnum.Archived, label: 'Archived' }
];
