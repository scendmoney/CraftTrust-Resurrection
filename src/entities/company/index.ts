import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModel } from './company.model';
import { CompanyAdminResolver } from './company.admin.resolver';
import { CompanyCultivatorResolver } from './company.cultivator.resolver';
import { CompanyBuyerResolver } from './company.buyer.resolver';
import { CompanyCron } from './company.cron';
import CompanyInsightViewModel from './company.insight.view.model';
import CompanyInsightViewResolveField from './company.insight.view.resolve_field';
import CompanySubscriber from './company.subscriber';
import { CompanyService } from './company.service';
import CompanyInsightBuyerViewModel from './company.insight.buyer.view.model';
import CompanyInsightBuyerViewResolveField from './company.insight.buyer.view.resolve_field';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyModel,
      CompanyInsightViewModel,
      CompanyInsightBuyerViewModel,
    ]),
  ],
  providers: [
    ConsoleLogger,
    CompanyAdminResolver,
    CompanyCultivatorResolver,
    CompanyBuyerResolver,
    CompanyCron,
    CompanyInsightViewResolveField,
    CompanySubscriber,
    CompanyService,
    CompanyInsightBuyerViewResolveField,
  ],
})
export class CompanyModule {}
