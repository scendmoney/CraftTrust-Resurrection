import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModel } from './cart.model';
import { CartResolver } from './cart.resolver';
import CartResolveField from './cart.resolve_field';
import { CustomerIoDataModule } from '@entities/customerio';

@Module({
  imports: [TypeOrmModule.forFeature([CartModel]), CustomerIoDataModule],
  providers: [CartResolver, CartResolveField],
})
export class CartModule {}
