import { ConsoleLogger, DynamicModule, Module } from '@nestjs/common';
import { TransakOptions } from './transak.types';
import { TransakService } from './transak.service';

@Module({})
export class TransakModule {
  static register(options: TransakOptions): DynamicModule {
    const logger = new ConsoleLogger();
    const providers = [
      {
        provide: TransakService,
        useValue: new TransakService(options, logger),
      },
    ];

    return {
      module: TransakModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
