/* eslint-disable no-use-before-define */
import { InputType, PickType } from '@nestjs/graphql';
import { AssetModel } from './asset.model';

@InputType()
export class AssetIdDTO extends PickType(AssetModel, ['id'], InputType) {}
