import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './product.model';
import { ProductCultivatorResolver } from './product.cultivator.resolver';
import { BullModule } from '@nestjs/bull';
import { CONFIG } from '@config/index';
import { QueueEnum } from '@enums/common';
import { ProductQueue } from './product.queue';
import { ProductCron } from './product.cron';
import { ProductBuyerResolver } from './product.buyer.resolver';
import { ProductController } from './product.controller';
import ProductResolveField from './product.resolve_field';
import { ProductAdminResolver } from './product.admin.resolver';
import { ProductService } from './product.service';

const providersQueue = [];
if (CONFIG.platform.isCron) {
  providersQueue.push(ProductQueue);
}

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductModel]),
    BullModule.forRoot({
      redis: CONFIG.redis.options,
    }),
    BullModule.registerQueue({
      name: QueueEnum.queueProduct,
      limiter: { max: 10, duration: 60000 },
    }),
  ],
  providers: [
    ConsoleLogger,
    ProductCultivatorResolver,
    ProductCron,
    ProductBuyerResolver,
    ProductAdminResolver,
    ProductResolveField,
    ProductService,
    ...providersQueue,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
