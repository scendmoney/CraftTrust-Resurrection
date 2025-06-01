import { CONFIG } from '@config/index';
import { UserRoleEnum } from '@entities/user/user.enum';
import { UserModel } from '@entities/user/user.model';
import { RedisCacheKeysEnum } from '@enums/common';
import ErrorMsgEnum from '@enums/error';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RedisCacheService } from 'libs/redis/src';
import { pick } from 'lodash';
import { DataSource, DeepPartial } from 'typeorm';
import { IUpdateUserRedis } from './auth.dto';
import { CustomLoggerService } from '@common/logger/custom_logger.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisCacheService: RedisCacheService,
    private readonly dataSource: DataSource,
    private logger: CustomLoggerService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { token } = context.getArgByIndex(2);
    if (!token) throw new Error(ErrorMsgEnum.InvalidToken);
    const userRedis = await this._getUserFromRedis(token);
    if (userRedis.isBlocked) {
      await this.clearDataUserInRedis(userRedis.id);
      throw new Error(ErrorMsgEnum.UserBlocked);
    }

    if (userRedis.__context__) {
      await this.redisCacheService.setAndExpireat(
        `${RedisCacheKeysEnum.facilityOnline}:${userRedis.__context__?.id}`,
        true,
        5 * 60,
      );
    }

    const response = context.switchToHttp().getResponse();
    response.user = userRedis;
    ctx.user = userRedis;
    return userRedis;
  }

  async logoutByToken(token: string, userId: string) {
    await this.redisCacheService.del(
      `${RedisCacheKeysEnum.users}:${token}:${userId}`,
    );
    return true;
  }

  private async _getUserFromRedis(token: string) {
    try {
      await this.verify(token);
    } catch (error) {
      throw new Error('INVALID_TOKEN');
    }

    let userMetaData = null;
    try {
      const keys = await this.redisCacheService.keys(
        `${RedisCacheKeysEnum.users}:${token}*`,
      );
      if (keys.length) {
        userMetaData = await this.redisCacheService.get<DeepPartial<UserModel>>(
          keys[0],
        );
      }
    } catch (error) {
      throw new Error('INVALID_TOKEN');
    }

    if (!userMetaData) {
      throw new Error('INVALID_TOKEN');
    }

    if (!userMetaData.__context__ && userMetaData.role === UserRoleEnum.user) {
      userMetaData = await this.updateUserRedis({
        token,
        email: userMetaData?.email?.trim()?.toLowerCase(),
        phoneNumber: userMetaData?.phoneNumber?.trim(),
      });
    }

    return userMetaData;
  }

  async updateUserRedis({ token, email, phoneNumber }: IUpdateUserRedis) {
    const user = await this.dataSource.getRepository(UserModel).findOne({
      where: [
        {
          email,
        },
        {
          phoneNumber,
        },
      ],
      relations: ['context.owner', 'userToFacilities'],
    });

    if (!user) {
      throw new Error(ErrorMsgEnum.UserNotExist);
    }
    const updateData: DeepPartial<UserModel> = {};

    if (!user.__context__ && user.role === UserRoleEnum.user) {
      if (!user.__userToFacilities__?.length) {
        throw new Error(ErrorMsgEnum.InvalidToken);
      }
      updateData.context = {
        id: user.__userToFacilities__[0].id,
      };
      user.__context__ = user.__userToFacilities__[0];
    }
    if (Object.keys(updateData).length) {
      await this.dataSource.getRepository(UserModel).update(user.id, {
        id: user.id,
        ...updateData,
      });
    }

    if (
      !user.__context__ &&
      ![
        UserRoleEnum.admin_platform,
        UserRoleEnum.owner_platform,
        UserRoleEnum.client,
      ].includes(user?.role)
    ) {
      throw new Error(ErrorMsgEnum.ContextNotExist);
    }

    const metaData = {
      ...AuthService.serializeUser(user),
      __context__: user.__context__
        ? {
            id: user.__context__?.id,
            role: user.__context__.role,
            publicAddress: user.__context__.publicAddress,
            index: user.__context__.index,
            __owner__: {
              id: user.__context__.__owner__?.id,
            },
          }
        : null,
    };

    await this.redisCacheService.setAndExpireat(
      `${RedisCacheKeysEnum.users}:${token}:${user.id}`,
      metaData,
      CONFIG.redis.expireToken,
    );

    return metaData;
  }

  async updateUserContextRedis(userId: string) {
    const keys = await this.redisCacheService.keys(
      `${RedisCacheKeysEnum.users}:*:${userId}`,
    );
    if (keys.length) {
      const user = await this.dataSource.getRepository(UserModel).findOne({
        where: {
          id: userId,
        },
        relations: ['context.owner', 'userToFacilities'],
      });

      if (!user) {
        throw new Error(ErrorMsgEnum.UserNotExist);
      }

      const metaData = {
        ...AuthService.serializeUser(user),
        __context__: user.__context__
          ? {
              id: user.__context__?.id,
              role: user.__context__.role,
              publicAddress: user.__context__.publicAddress,
              index: user.__context__.index,
              __owner__: {
                id: user.__context__.__owner__?.id,
              },
            }
          : null,
      };

      await Promise.all(
        keys.map((key) =>
          this.redisCacheService.setAndExpireat(
            key,
            metaData,
            CONFIG.redis.expireToken,
          ),
        ),
      );
    }
  }

  async clearDataUserInRedis(userId: string) {
    const keys = await this.redisCacheService.keys(
      `${RedisCacheKeysEnum.users}:*:${userId}`,
    );

    if (keys.length) {
      await this.redisCacheService.del(keys);
    }
  }

  async login({
    id,
    email,
    phoneNumber,
    isBlocked,
  }: UserModel): Promise<string> {
    if (isBlocked) throw new Error(ErrorMsgEnum.UserBlocked);
    const token = await this.jwtService.signAsync({
      sub: id,
      email,
    });

    await this.updateUserRedis({
      token,
      email,
      phoneNumber,
    });

    return token;
  }

  async getUserRedisById(id: string) {
    const keys = await this.redisCacheService.keys(
      `${RedisCacheKeysEnum.users}:*:${id}`,
    );
    return (keys.length && keys[0]) || null;
  }

  async verify(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: CONFIG.platform.key,
    });
  }

  static serializeUser(user: UserModel) {
    return pick(user, [
      'id',
      'isBlocked',
      'isKyc',
      'role',
      'fullName',
      'email',
      'phoneNumber',
      'issuer',
      'publicAddress',
      'index',
    ]);
  }
}
