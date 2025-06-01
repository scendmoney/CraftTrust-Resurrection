import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './custom_logger.service';
import { SentryService } from '@ntegral/nestjs-sentry';
import { SentryGlobalModule } from 'libs/sentry/src';

@Global()
@Module({
  imports: [SentryGlobalModule],
  providers: [CustomLoggerService, SentryService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
