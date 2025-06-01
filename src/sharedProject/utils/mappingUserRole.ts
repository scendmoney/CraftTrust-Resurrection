import { UserRoleEnum } from 'graphql/_server';

const mappingUserRole = (oldMessage?: UserRoleEnum | undefined): string => {
  switch (oldMessage) {
    case UserRoleEnum.User:
      return 'User';
    case UserRoleEnum.AdminPlatform:
      return 'Admin';
    case UserRoleEnum.OwnerPlatform:
      return 'Super Admin';
    default:
      return '--';
  }
};

export default mappingUserRole;
