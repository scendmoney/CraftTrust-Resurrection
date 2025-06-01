import { Global, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import HealthCheckController from './health_check.controller';

@Global()
@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckController],
})
export default class HealthCheckModule {}
