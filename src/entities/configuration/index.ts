import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import ConfigurationResolver from './configuration.resolver';
import ConfigurationModel from './configuration.model';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigurationModel])],
  providers: [ConfigurationResolver],
})
export default class ConfigurationModule {}
