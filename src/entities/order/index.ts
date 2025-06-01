import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModel } from './order.model';
import { OrderResolver } from './order.resolver';
import OrderResolveField from './order.resolve_field';
import AuthModule from '@entities/auth';
import OrderService from './order.service';
import OrderSubscriber from './order.subscriber';
import { BullModule } from '@nestjs/bull';
import { QueueEnum } from '@enums/common';
import { OrderCron } from './order.cron';
import { OrderAdminResolver } from './order.admin.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderModel]),
    AuthModule,
    BullModule.registerQueue({
      name: QueueEnum.queueFacility,
    }),
  ],
  providers: [
    ConsoleLogger,
    OrderResolver,
    OrderAdminResolver,
    OrderResolveField,
    OrderService,
    OrderSubscriber,
    OrderCron,
  ],
  exports: [OrderService],
})
export class OrderModule {}
