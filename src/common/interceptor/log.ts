import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export default class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const now = Date.now();
    const log = await LoggingInterceptor.parseFieldsByContext(context);
    return next.handle().pipe(
      tap(() => {
        if (log.queryType && Date.now() - now >= 500) {
          this.logger.debug(`${(Date.now() - now) / 1000} sec`, log.queryName);
        }
      }),
    );
  }

  static async parseFieldsByContext(context: ExecutionContext) {
    const contextParams = LoggingInterceptor.getQueryDataByContext(context);

    const data = {
      ...contextParams,
    };

    return data;
  }

  static getQueryDataByContext(context: ExecutionContext): {
    scheme: string;
    queryType: string;
    queryName: string;
  } {
    const { fieldName: queryName, operation } = context.getArgByIndex(3) || {};

    return {
      scheme: context.getType(),
      queryType: operation?.operation,
      queryName,
    };
  }
}
