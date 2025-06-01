import { DynamicModule, Module } from '@nestjs/common';
import { CustomerioOptions } from './customerio.dto';
import CustomerioService from './customerio.service';

@Module({})
export class CustomerioModule {
  static register(options: CustomerioOptions): DynamicModule {
    const providers = [
      {
        provide: CustomerioService,
        useValue: new CustomerioService(options),
      },
    ];

    return {
      module: CustomerioService,
      providers,
      exports: providers,
      global: true,
    };
  }
}
