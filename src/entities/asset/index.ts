import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AssetModel } from './asset.model';
import { AssetResolveField } from './asset.resolve_field';
import { AssetService } from './asset.service';

@Module({
  imports: [TypeOrmModule.forFeature([AssetModel])],
  providers: [AssetResolveField, AssetService],
  exports: [AssetService],
})
export class AssetModule {}
