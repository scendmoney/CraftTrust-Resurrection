import { registerEnumType } from '@nestjs/graphql';

export enum AssetFileTypeEnum {
  image = 'image',
  logo = 'logo',
}

registerEnumType(AssetFileTypeEnum, { name: 'AssetFileTypeEnum' });
