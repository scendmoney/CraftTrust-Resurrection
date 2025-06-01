import { registerEnumType } from '@nestjs/graphql';

export enum NFTTypeEnum {
  other = 'other',
  survey = 'survey',
}
registerEnumType(NFTTypeEnum, { name: 'NFTTypeEnum' });

export enum NFTStatusEnum {
  blocked = 'blocked',
  processing = 'processing',
  done = 'done',
  error = 'error',
}
registerEnumType(NFTStatusEnum, { name: 'NFTStatusEnum' });
