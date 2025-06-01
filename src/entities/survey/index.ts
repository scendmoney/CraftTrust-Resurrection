import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyModel } from './survey.model';
import { SurveyResolver } from './survey.client.resolver';
import { SurveyBuyerResolver } from './survey.buyer.resolver';
import { SurveyAdminResolver } from './survey.admin.resolver';
import { SurveyCultivatorResolver } from './survey.cultivator.resolver';
import { BullModule } from '@nestjs/bull';
import { QueueEnum } from '@enums/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurveyModel]),
    BullModule.registerQueue({
      name: QueueEnum.queueHedera,
    }),
  ],
  providers: [
    SurveyResolver,
    SurveyBuyerResolver,
    SurveyAdminResolver,
    SurveyCultivatorResolver,
  ],
})
export class SurveyModule {}
