import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import NotificationResolver from './notification.resolver';
import NotificationModel from './notification.model';
import NotificationSubscriber from './notification.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationModel])],
  providers: [NotificationResolver, NotificationSubscriber],
})
export default class NotificationModule {}
