import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import OrderProductModel from './order_product.model';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProductModel])],
  providers: [],
  exports: [],
})
export default class OrderProductModule {}
