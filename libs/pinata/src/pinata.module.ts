import { DynamicModule, Module } from '@nestjs/common';
import PinataService from './pinata.service';
import { PinataDTO } from './pinata.dto';

@Module({})
export class PinataModule {
  static register(options: PinataDTO): DynamicModule {
    const providers = [
      {
        provide: PinataService,
        useValue: new PinataService(options),
      },
    ];

    return {
      module: PinataService,
      providers,
      exports: providers,
      global: true,
    };
  }
}
