import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import CodeModel from './code.model';
import CodeResolver from './code.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CodeModel])],
  providers: [CodeResolver],
})
export default class CodeModule {}
