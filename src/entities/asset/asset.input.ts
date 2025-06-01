import { InputType, PickType } from '@nestjs/graphql';
import { AssetModel } from './asset.model';

@InputType()
export class AssetIdInput extends PickType(AssetModel, ['id'], InputType) {}

@InputType()
export class AssetModelInput extends PickType(
  AssetModel,
  ['id', 'url'],
  InputType,
) {}
