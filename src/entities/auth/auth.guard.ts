import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserRoleEnum } from '@entities/user/user.enum';
import ErrorMsgEnum from '@enums/error';

@Injectable()
export class AuthGuardAllUser implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await this.authService.canActivate(context);

    return true;
  }
}

@Injectable()
export class AuthGuardUser implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userRedis = await this.authService.canActivate(context);

    if (UserRoleEnum.user !== userRedis?.role) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }
    return true;
  }
}

@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userRedis = await this.authService.canActivate(context);

    if (
      ![UserRoleEnum.admin_platform, UserRoleEnum.owner_platform].includes(
        userRedis?.role,
      )
    ) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }
    return true;
  }
}

@Injectable()
export class AuthGuardClient implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userRedis = await this.authService.canActivate(context);

    if (UserRoleEnum.client !== userRedis?.role) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }
    return true;
  }
}
