import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AssetModel } from './asset.model';
import { StorageService } from 'libs/storage/src';

@Resolver(() => AssetModel)
export class AssetResolveField {
  @ResolveField('url')
  async url(@Parent() asset: AssetModel): Promise<string> {
    return StorageService.getCDNPath(asset.path);
  }

  // @ResolveField('download')
  // async download(@Parent() asset: AssetModel): Promise<string> {
  //   return null;
  //   // return this.bucketController.createLinkToDownload(asset.path);
  // }
}
