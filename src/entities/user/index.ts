import { ConsoleLogger, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { BullModule } from '@nestjs/bull';
import { CONFIG } from '@config/index';
import { CultivatorResolver } from './cultivator/cultivator.resolver';
import { AssetModule } from '@entities/asset';
import { BuyerResolver } from './buyer/buyer.resolver';
import { QueueEnum } from '@enums/common';
import { EmployeeResolver } from './employee/employee.resolver';
import { AdminResolver } from './admin/admin.resolver';
import { ClientResolver } from './client/client.resolver';
import { UserQueue } from './user.queue';
import { СultivatorService } from './cultivator/cultivator.service';
import { BuyerService } from './buyer/buyer.service';

const providersQueue = [];
if (CONFIG.platform.isCron) {
  providersQueue.push(UserQueue);
}

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    AssetModule,
    BullModule.forRoot({
      redis: CONFIG.redis.options,
    }),
    BullModule.registerQueue({
      name: QueueEnum.queueUser,
    }),
    BullModule.registerQueue({
      name: QueueEnum.queueHedera,
    }),
    BullModule.registerQueue({
      name: QueueEnum.queueProduct,
      limiter: { max: 10, duration: 60000 },
    }),
    BullModule.registerQueue({
      name: QueueEnum.queueFacility,
      limiter: { max: 10, duration: 60000 },
    }),
  ],
  providers: [
    СultivatorService,
    AdminResolver,
    BuyerResolver,
    BuyerService,
    ClientResolver,
    ConsoleLogger,
    CultivatorResolver,
    EmployeeResolver,
    UserResolver,
    ...providersQueue,
  ],
})
export class UserModule {}
