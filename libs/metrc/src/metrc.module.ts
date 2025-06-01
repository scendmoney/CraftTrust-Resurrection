import { DynamicModule, Module } from '@nestjs/common';
import { MetrcFacilitiesService } from './api/metrc.facilities.service';
import { MetrcEmployeesService } from './api/metrc.employees.service';
import { MetrcAuthBasic } from './metrc.dto';
import { MetrcPackagesService } from './api/metrc.packages.service';
import { MetrcItemsService } from './api/metrc.items.service';
import { MetrcLabtestsService } from './api/metrc.labtests.service';

@Module({})
export class MetrcModule {
  static register(options: MetrcAuthBasic): DynamicModule {
    const providers = [
      {
        provide: MetrcFacilitiesService,
        useValue: new MetrcFacilitiesService(options),
      },
      {
        provide: MetrcEmployeesService,
        useValue: new MetrcEmployeesService(options),
      },
      {
        provide: MetrcPackagesService,
        useValue: new MetrcPackagesService(options),
      },
      {
        provide: MetrcItemsService,
        useValue: new MetrcItemsService(options),
      },
      {
        provide: MetrcLabtestsService,
        useValue: new MetrcLabtestsService(options),
      },
    ];

    return {
      module: MetrcModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
