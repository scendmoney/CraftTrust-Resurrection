import { Args, Query, Resolver } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { ReportSalesPerformances } from './report.dto';
import { ReportSalesPerformanceInput } from './report.input';
import { AuthGuardAdmin } from '@entities/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import ReportService from './report.service';

@Resolver()
export class ReportAdminResolver {
  constructor(
    private readonly dataSource: DataSource,
    private reportService: ReportService,
  ) {}

  @Query(() => ReportSalesPerformances, {
    description: '@protected - Report Sales Performance (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async reportSalesPerformanceAdmin(
    @Args('payload', { type: () => ReportSalesPerformanceInput })
    payload: ReportSalesPerformanceInput,
  ): Promise<ReportSalesPerformances> {
    return this.reportService.getSalesPerformanceAdmin(payload);
  }

  @Query(() => ReportSalesPerformances, {
    description: '@protected - Report Total Revenue (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async reportSalesPerformanceByCultivatorAdmin(
    @Args('payload', { type: () => ReportSalesPerformanceInput })
    payload: ReportSalesPerformanceInput,
    @Args('facilityId', { type: () => String })
    facilityId: string,
  ): Promise<ReportSalesPerformances> {
    return this.reportService.getSalesPerformanceByCultivator(
      payload,
      facilityId,
    );
  }

  @Query(() => ReportSalesPerformances, {
    description: '@protected - Report Total Revenue (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async reportSalesPerformanceByBuyerAdmin(
    @Args('payload', { type: () => ReportSalesPerformanceInput })
    payload: ReportSalesPerformanceInput,
    @Args('facilityId', { type: () => String })
    facilityId: string,
  ): Promise<ReportSalesPerformances> {
    return this.reportService.getSalesPerformanceByBuyer(payload, facilityId);
  }
}
