import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemModel } from './cart_item.model';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemModel])],
})
export class CartItemModule {}
