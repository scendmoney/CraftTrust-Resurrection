import { Module } from '@nestjs/common';
import { ReportAdminResolver } from './report.admin.resolver';
import { ReportBuyerResolver } from './report.buyer.resolver';
import { ReportCultivatorResolver } from './report.cultivator.resolver';
import ReportService from './report.service';

@Module({
  providers: [
    ReportAdminResolver,
    ReportBuyerResolver,
    ReportCultivatorResolver,
    ReportService,
  ],
})
export class ReportModule {}
