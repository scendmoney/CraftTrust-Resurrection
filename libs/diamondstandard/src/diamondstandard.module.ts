import { DynamicModule, Module } from '@nestjs/common';
import DiamondstandardService from './diamondstandard.service';
import { DiamondstandardOptions } from './diamondstandard.dto';

@Module({})
export class DiamondstandardModule {
  static register(options: DiamondstandardOptions): DynamicModule {
    const providers = [
      {
        provide: DiamondstandardService,
        useValue: new DiamondstandardService(options),
      },
    ];

    return {
      module: DiamondstandardService,
      providers,
      exports: providers,
      global: true,
    };
  }
}
