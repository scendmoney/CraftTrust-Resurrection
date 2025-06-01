import { FacilityRoleEnum, UserRoleEnum } from 'graphql/_server';
import Routes from 'routes';

function redirectAfterAuth(userRole?: UserRoleEnum, facilityRole?: FacilityRoleEnum) {
  if (userRole === UserRoleEnum.AdminPlatform || userRole === UserRoleEnum.OwnerPlatform) {
    return Routes.ADMIN_PRODUCTS;
  }
  if (userRole === UserRoleEnum.Client) {
    return Routes.WALLET;
  }
  if (userRole === UserRoleEnum.User) {
    if (facilityRole === FacilityRoleEnum.Buyer) {
      return Routes.CLIENT;
    }
    if (
      facilityRole === FacilityRoleEnum.Cultivator ||
      facilityRole === FacilityRoleEnum.BuyerAndCultivator
    ) {
      return Routes.CULTIVATOR_INVENTORY;
    }
  }
  return null;
}

export default redirectAfterAuth;
