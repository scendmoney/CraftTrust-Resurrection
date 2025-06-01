import { DynamicModule, Global, HttpException, Module } from '@nestjs/common';
import { GraphqlInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryOptions } from './sentry.types';

@Global()
@Module({})
export class SentryGlobalModule {
  static register(options: SentryOptions): DynamicModule {
    const providers = [
      {
        provide: APP_INTERCEPTOR,
        useFactory: () =>
          new GraphqlInterceptor({
            filters: [
              {
                type: HttpException,
                filter: (e: HttpException) => {
                  return 500 > e.getStatus();
                },
              },
            ],
          }),
      },
    ];

    return {
      module: SentryGlobalModule,
      imports: [
        SentryModule.forRootAsync({
          useFactory: () => {
            return {
              dsn: options.dsn,
              environment: options.env,
              tracesSampleRate: 1.0,
              maxValueLength: 3000,
              logLevels: ['debug', 'error'],
            };
          },
        }),
      ],
      providers,
      global: true,
    };
  }
}
