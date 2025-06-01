import { CompanyStatusEnum } from 'graphql/_server';

const mappingCompanyStatus = (oldMessage?: CompanyStatusEnum | undefined): string => {
  switch (oldMessage) {
    case CompanyStatusEnum.Active:
      return 'Active';
    case CompanyStatusEnum.Completed:
      return 'Completed';
    case CompanyStatusEnum.Archived:
      return 'Archived';
    case CompanyStatusEnum.Draft:
      return 'Draft';
    case CompanyStatusEnum.Pending:
      return 'Approval Pending';
    case CompanyStatusEnum.Rejected:
      return 'Rejected';
    default:
      return '--';
  }
};

export default mappingCompanyStatus;
