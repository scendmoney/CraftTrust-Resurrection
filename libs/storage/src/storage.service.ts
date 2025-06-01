import { Injectable, OnModuleInit } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';
import { readdirSync, statSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

import ErrorMsgEnum from '@enums/error';
import sharp from 'sharp';
import { Stream } from 'typeorm';
import { StorageDTO } from './storage.dto';

const imageMimetypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/tiff',
  'image/jp2',
];

@Injectable()
export class StorageService implements OnModuleInit {
  static options: StorageDTO = null;
  private _bucket = null;

  constructor(options: StorageDTO) {
    StorageService.options = options;
  }

  async onModuleInit() {
    this._bucket = new Storage({
      credentials: StorageService.options.backetCredentials,
    }).bucket(StorageService.options.backetName);
  }

  static getCDNPath = (path?: string): string => {
    if (StorageService.options.cdnFirst) {
      return `${StorageService.options.cdnFirst}/${path || ''}`;
    }
    return `${StorageService.options.cdnSecond}/${path || ''}`;
  };

  async uploadFiles<T>(file: FileUpload, folderCustom?: string): Promise<T> {
    if (!file) {
      throw Error(ErrorMsgEnum.FileIsWrong);
    }
    const { mimetype, createReadStream, filename } = await file;

    const isImage = imageMimetypes.includes(mimetype);

    if (!isImage) {
      throw Error('Wrong type file');
    }
    const folder = 'images/';

    const hashname = uuidv4();
    const filePath = `${folderCustom || folder}${hashname}.${filename
      .split('.')
      .pop()}`;
    const myBucket = await this.getBacket();
    const fileBucket = myBucket.file(filePath);

    const data = {
      hashname,
      filename,
      mimetype,
      path: filePath,
      width: 0,
      height: 0,
      size: 0,
    };

    const pipelineSharp = sharp();
    pipelineSharp.metadata().then((metadata) => {
      data.width = metadata.width;
      data.height = metadata.height;
      data.size = metadata.size;
    });

    const result = await new Promise<T>((resolve, reject) =>
      createReadStream()
        .on('error', (error) => reject(error))
        .pipe(pipelineSharp)
        .pipe(fileBucket.createWriteStream())
        .on('error', (error) => reject(error))
        .on('finish', () => {
          resolve(data as T);
        }),
    );

    return result;
  }

  getFile = async (filePath: string): Promise<Stream> =>
    this._bucket.file(filePath).createReadStream();

  deleteFile = async (filePath: string): Promise<void> => {
    await this._bucket.file(filePath).delete();
  };

  getBacket = () => this._bucket;

  getDirectories = (path) =>
    readdirSync(path).filter((file) =>
      statSync(`${path}/${file}`).isDirectory(),
    );
}
