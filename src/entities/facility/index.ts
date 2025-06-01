import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityModel } from './facility.model';
import { FacilityResolver } from './facility.resolver';
import { AssetModule } from '@entities/asset';
import { FacilityAdminResolver } from './admin/facility.admin.resolver';
import { FacilityQueue } from './facility.queue';
import { FacilityCron } from './facility.cron';
import { BullModule } from '@nestjs/bull';
import { CONFIG } from '@config/index';
import { QueueEnum } from '@enums/common';
import { FacilityService } from './facility.service';

const providersQueue = [];
if (CONFIG.platform.isCron) {
  providersQueue.push(FacilityQueue);
}

@Module({
  imports: [
    TypeOrmModule.forFeature([FacilityModel]),
    AssetModule,
    BullModule.forRoot({
      redis: CONFIG.redis.options,
    }),
    BullModule.registerQueue({
      name: QueueEnum.queueUser,
    }),
    BullModule.registerQueue({
      name: QueueEnum.queueFacility,
      limiter: {
        max: 20,
        duration: 30 * 1000,
      },
    }),
  ],
  providers: [
    ConsoleLogger,
    FacilityResolver,
    FacilityAdminResolver,
    FacilityCron,
    FacilityService,
    ...providersQueue,
  ],
  exports: [FacilityService],
})
export class FacilityModule {}
