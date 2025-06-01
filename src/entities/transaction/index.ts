import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module } from '@nestjs/common';
import TransactionModel from './transaction.model';
import { TransactionCron } from './transaction.cron';
import { OrderModule } from '@entities/order';
import { TransactionResolver } from './transaction.resolver';
import { TransactionAdminResolver } from './transaction.admin.resolver';
import { TransactionService } from './transaction.service';
import { FacilityModule } from '@entities/facility';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionModel]),
    OrderModule,
    FacilityModule,
  ],
  providers: [
    ConsoleLogger,
    TransactionCron,
    TransactionResolver,
    TransactionAdminResolver,
    TransactionService,
  ],
})
export default class TransactionModule {}
