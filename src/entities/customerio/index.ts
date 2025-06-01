import { Module } from '@nestjs/common';
import { CustomerIoDataService } from './customerio.service';
import CustomerIoDataListener from './customerio.listener';
import { CustomerIoDataResolver } from './customerio.resolver';

@Module({
  providers: [
    CustomerIoDataService,
    CustomerIoDataListener,
    CustomerIoDataResolver,
  ],
  exports: [CustomerIoDataService],
})
export class CustomerIoDataModule {}
