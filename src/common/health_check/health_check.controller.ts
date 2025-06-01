import { CONFIG } from '@config/index';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { RedisTransportService } from 'libs/redis/src';

@Controller('health')
export default class HealthCheckController {
  constructor(
    private healthCheckService: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  checkHealth() {
    return this.healthCheckService.check([
      () => this.db.pingCheck('database', { timeout: 3000 }),
      () =>
        this.microservice.pingCheck('redis', {
          ...(RedisTransportService.getProviderOptions(
            CONFIG.redis.options,
          ) as any),
          timeout: 3000,
        }),
      // () => this.http.pingCheck('google', 'https://google.com'),
      // () =>
      //   this.http.pingCheck(
      //     'pinata',
      //     'https://api.pinata.cloud/data/testAuthentication',
      //     {
      //       headers: {
      //         pinata_api_key: CONFIG.pinata.pinataApiKey,
      //         pinata_secret_api_key: CONFIG.pinata.pinataSecretApiKey,
      //       },
      //     },
      //   ),
    ]);
  }
}
