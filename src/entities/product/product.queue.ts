import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { FacilityModel } from '@entities/facility/facility.model';
import { JobEnum, QueueEnum } from '@enums/common';
import { ProductService } from './product.service';
import { CustomLoggerService } from '@common/logger/custom_logger.service';

@Injectable()
@Processor(QueueEnum.queueProduct)
export class ProductQueue {
  constructor(
    private readonly productService: ProductService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Process(JobEnum.syncProductsJob)
  async syncProductsJob({
    data: { facility },
  }: Job<{ facility: FacilityModel }>) {
    try {
      await this.productService.syncProducts(facility);
    } catch (error) {
      console.log('syncProductsJob', error);
      this.logger.error(
        `syncProductsJob error ${facility.id}: `,
        error.message,
      );
    }
  }
}
