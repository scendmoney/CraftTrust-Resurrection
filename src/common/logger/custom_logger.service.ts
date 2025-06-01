import { CONFIG } from '@config/index';
import { ConsoleLogger } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';
import * as Sentry from '@sentry/node';

export class CustomLoggerService extends ConsoleLogger {
  sentry = new SentryService();

  error(
    message: string,
    stack?: string,
    context: string = this.context,
    tags?: { [key: string]: string },
    extras?: { [key: string]: any },
  ) {
    if (CONFIG.platform.ENV !== 'local') {
      Sentry.withScope((scope) => {
        if (tags) {
          for (const [key, value] of Object.entries({
            ...tags,
            module: context,
          })) {
            scope.setTag(key, value);
          }
        }

        if (extras) {
          scope.setExtras(extras);
        }
        this.sentry.error(message, stack ? stack : '', context);
      });

      return;
    }
    return super.error(message, stack, context);
  }
}
