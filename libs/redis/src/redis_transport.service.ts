import { Injectable } from '@nestjs/common';
import {
  ClientProviderOptions,
  ClientRedis,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';

@Injectable()
export class RedisTransportService extends ClientRedis {
  constructor(options) {
    super(options);
  }

  static getProviderOptions = (options): ClientProviderOptions => ({
    name: 'REDIS',
    transport: Transport.REDIS,
    options,
  });

  sendPromise<T>(topicName: string, topicMessage: any): Promise<T> {
    return lastValueFrom(
      super.send(topicName, topicMessage).pipe(timeout(30000)),
    );
  }

  async onApplicationBootstrap() {
    await super.connect();
  }

  async beforeApplicationShutdown() {
    await super.close();
  }
}
