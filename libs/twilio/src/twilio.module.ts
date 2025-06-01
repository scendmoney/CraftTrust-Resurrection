import { DynamicModule, Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioOptions } from './twilio.types';

@Module({})
export class TwilioModule {
  static register(options: TwilioOptions): DynamicModule {
    const providers = [
      {
        provide: TwilioService,
        useValue: new TwilioService(options),
      },
    ];

    return {
      module: TwilioModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
