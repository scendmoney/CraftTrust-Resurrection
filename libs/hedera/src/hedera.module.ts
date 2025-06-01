import { DynamicModule, Module } from '@nestjs/common';
import HederaService from './hedera.service';
import { HederaOptions } from './hedera.dto';

@Module({})
export class HederaModule {
  static register(options: HederaOptions): DynamicModule {
    const providers = [
      {
        provide: HederaService,
        useValue: new HederaService(options),
      },
    ];

    return {
      module: HederaService,
      providers,
      exports: providers,
      global: true,
    };
  }
}
