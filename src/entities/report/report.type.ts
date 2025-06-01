export interface IGetRevenueQueryBuilder {
  facilityId?: string;
  startDate: Date;
  endDate: Date;
}

export interface IGetDateFilter {
  startDate: Date;
  endDate: Date;
  field: string;
}
