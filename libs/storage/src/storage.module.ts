import { DynamicModule, Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageDTO } from './storage.dto';

@Module({})
export class StorageModule {
  static register(options: StorageDTO): DynamicModule {
    const providers = [
      {
        provide: StorageService,
        useValue: new StorageService(options),
      },
    ];

    return {
      module: StorageModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
