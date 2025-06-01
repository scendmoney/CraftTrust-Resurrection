import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Sentry from '@sentry/node';

const errorsToTrackInSentry = [InternalServerErrorException, TypeError];
const enableSentry = (err) => {
  const sendToSentry = errorsToTrackInSentry.some(
    (errorType) => err instanceof errorType,
  );
  if (sendToSentry) Sentry.captureException(err);
  throw err;
};

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  private _env = 'null';

  constructor(private env) {
    this._env = env;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> | Promise<Observable<unknown>> {
    if (this._env !== 'local') {
      return next.handle().pipe(catchError(enableSentry));
    }
    return next.handle().pipe(catchError((err) => throwError(err)));
  }
}
