import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModel } from './item.model';

@Module({
  imports: [TypeOrmModule.forFeature([ItemModel])],
})
export class ItemModule {}
