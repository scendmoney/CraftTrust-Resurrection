import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import LoggingInterceptor from './log';

@Catch(HttpException)
export default class HttpExceptionFilter implements GqlExceptionFilter {
  constructor(private logger: ConsoleLogger) {}

  catch = async (exception: HttpException, host: ArgumentsHost) => {
    const context = GqlArgumentsHost.create(host);
    const log = await LoggingInterceptor.parseFieldsByContext(context);
    this.logger.error(exception.message, log.queryName);
    return exception;
  };
}
