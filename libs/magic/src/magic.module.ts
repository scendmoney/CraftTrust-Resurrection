import { DynamicModule, Module } from '@nestjs/common';
import { MagicService } from './magic.service';
import { MagicDTO } from './magic.dto';

@Module({})
export class MagicModule {
  static register(options: MagicDTO): DynamicModule {
    const providers = [
      {
        provide: MagicService,
        useValue: new MagicService(options),
      },
    ];

    return {
      module: MagicModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
