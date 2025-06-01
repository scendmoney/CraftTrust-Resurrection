import { AuthGuardUser } from '@entities/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { ReportSalesPerformanceInput } from './report.input';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { ReportSalesPerformances } from './report.dto';
import ReportService from './report.service';

@Resolver()
export class ReportBuyerResolver {
  constructor(
    private readonly dataSource: DataSource,
    private reportService: ReportService,
  ) {}

  @Query(() => ReportSalesPerformances, {
    description: '@protected - Report Total Revenue (by user buyer)',
  })
  @UseGuards(AuthGuardUser)
  async reportSalesPerformanceByBuyer(
    @Args('payload', { type: () => ReportSalesPerformanceInput })
    payload: ReportSalesPerformanceInput,
    @CurrentCtx() { user },
  ): Promise<ReportSalesPerformances> {
    return this.reportService.getSalesPerformanceByBuyer(
      payload,
      user.__context__.id,
    );
  }
}
