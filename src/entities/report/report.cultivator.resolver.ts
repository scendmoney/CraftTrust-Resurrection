import { Args, Query, Resolver } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { ReportSalesPerformances } from './report.dto';
import { ReportSalesPerformanceInput } from './report.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import ReportService from './report.service';

@Resolver()
export class ReportCultivatorResolver {
  constructor(
    private readonly dataSource: DataSource,
    private reportService: ReportService,
  ) {}

  @Query(() => ReportSalesPerformances, {
    description: '@protected - Report Total Revenue (by user cultivator)',
  })
  @UseGuards(AuthGuardUser)
  async reportSalesPerformanceByCultivator(
    @Args('payload', { type: () => ReportSalesPerformanceInput })
    payload: ReportSalesPerformanceInput,
    @CurrentCtx() { user },
  ): Promise<ReportSalesPerformances> {
    return this.reportService.getSalesPerformanceByCultivator(
      payload,
      user.__context__.id,
    );
  }
}
