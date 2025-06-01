import { registerEnumType } from '@nestjs/graphql';

export enum UserRoleEnum {
  user = 'user',
  client = 'client',
  admin_platform = 'admin_platform',
  owner_platform = 'owner_platform',
}

registerEnumType(UserRoleEnum, { name: 'UserRoleEnum' });
