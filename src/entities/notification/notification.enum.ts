import { registerEnumType } from '@nestjs/graphql';

export enum NotificationStatusEnum {
  read = 'read',
  new = 'new',
}

export enum NotificationTypeEnum {
  message = 'message',
}

registerEnumType(NotificationStatusEnum, { name: 'NotificationStatusEnum' });
registerEnumType(NotificationTypeEnum, { name: 'NotificationTypeEnum' });
