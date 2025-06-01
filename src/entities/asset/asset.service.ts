import { Injectable } from '@nestjs/common';
import { AssetFileTypeEnum } from './asset.enum';
import { FileUpload } from 'graphql-upload';
import { StorageService } from 'libs/storage/src';
import { AssetModel } from './asset.model';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AssetService {
  constructor(private readonly storageService: StorageService) {}

  async getAsset(
    file: FileUpload,
    type: AssetFileTypeEnum,
  ): Promise<DeepPartial<AssetModel> | null> {
    if (file === null) {
      return null;
    } else if (file !== undefined) {
      const backetFile = await this.storageService.uploadFiles<AssetModel>(
        file,
      );
      return {
        ...backetFile,
        type,
      };
    } else {
      return undefined;
    }
  }
}
