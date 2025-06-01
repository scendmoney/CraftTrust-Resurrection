import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService extends Redis implements OnModuleInit {
  private _logger;
  constructor(options, logger) {
    super(options);
    this._logger = logger;
  }

  async get<T>(key: string) {
    return JSON.parse(await super.get(key)) as T;
  }

  set<T>(key: string, value: T) {
    return super.set(key, JSON.stringify(value));
  }

  setAndExpireat<T>(key: string, value: T, expire: number) {
    return super.set(key, JSON.stringify(value), 'EX', expire);
  }

  onModuleInit() {
    this.on('connect', function () {
      this._logger.log('CONNECTION SUCCESS!', 'REDIS');
    });
    this.on('connecting', function () {
      this._logger.debug('CONNECTING...', 'REDIS');
    });
    this.on('end', function () {
      this._logger.fatal('CONNECTION TERMINATED!', 'REDIS');
    });
    this.on('error', (error) => {
      this._logger.error(`CONNECTION FAILED: ${error.message}`, 'REDIS');
    });
    this.on('reconnecting', function (wait) {
      this._logger.warn(`CONNECTION WAIT: ${wait}`, 'REDIS');
    });
  }
}
