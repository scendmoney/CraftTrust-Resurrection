import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcompanyModel } from './subcompany.model';
import { SubcompanyAdminResolver } from './subcompany.admin.resolver';
import { SubcompanyCultivatorResolver } from './subcompany.cultivator.resolver';
import { SubcompanyBuyerResolver } from './subcompany.buyer.resolver';
import { SubcompanyResolveField } from './subcompany.resolve_field';
import SubcompanySubscriber from './subcompany.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([SubcompanyModel])],
  providers: [
    SubcompanyAdminResolver,
    SubcompanyCultivatorResolver,
    SubcompanyBuyerResolver,
    SubcompanyResolveField,
    SubcompanySubscriber,
  ],
})
export class SubcompanyModule {}
