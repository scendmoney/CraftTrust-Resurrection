import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DataSource, DeepPartial, In, IsNull, Not } from 'typeorm';
import { UserModel } from '../user.model';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import ErrorMsgEnum from '@enums/error';
import { CreateAdminInput, UpdateAdminProfileInput } from './admin.input';
import { UserRoleEnum } from '../user.enum';
import { EmailTemplatesEnum, SortDirectionEnum } from '@enums/common';
import { AuthGuardAdmin } from '@entities/auth/auth.guard';
import bcrypt from 'bcrypt';
import { CONFIG } from '@config/index';
import { UsersModelDTO } from '../user.dto';
import { FilterGetDTO, GetIdStringDTO } from '@common/query/query.dto';
import QueryService from '@common/query';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { AssetFileTypeEnum } from '@entities/asset/asset.enum';
import { AssetService } from '@entities/asset/asset.service';
import HederaService from 'libs/hedera/src/hedera.service';
import { FacilityModel } from '@entities/facility/facility.model';
import { AuthService } from '@entities/auth/auth.service';
import { addPrifixEmail } from '@src/utils/utils';
import CustomerioService from 'libs/customerio/src/customerio.service';
import { v4 as uuidv4 } from 'uuid';
import { CustomerIoDataService } from '@entities/customerio/customerio.service';
import { merge } from 'lodash';

@Resolver(() => UserModel)
export class AdminResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly assetService: AssetService,
    private readonly hederaService: HederaService,
    private readonly authService: AuthService,
    private readonly customerioService: CustomerioService,
  ) {}

  @Query(() => UserModel, {
    description: "@protected - Get own User's profile",
  })
  @UseGuards(AuthGuardAdmin)
  async meAdmin(@CurrentCtx() { user, relations }): Promise<UserModel> {
    const userDB = await this.dataSource.getRepository(UserModel).findOne({
      where: {
        id: user.id,
      },
      relations,
    });

    if (!userDB) throw new Error(ErrorMsgEnum.UserNotExist);

    return userDB;
  }

  @Mutation(() => Boolean, {})
  @UseGuards(AuthGuardAdmin)
  async createAdmin(
    @Args('payload', { type: () => CreateAdminInput })
    payload: CreateAdminInput,
    @CurrentCtx() { user },
  ) {
    if (![UserRoleEnum.owner_platform].includes(user.role)) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }
    const email = payload.email.toLowerCase();
    const [otherUser, countAdmins] = await Promise.all([
      this.dataSource.getRepository(UserModel).findOne({
        where: {
          email,
        },
        select: ['id'],
      }),
      this.dataSource.getRepository(UserModel).count({
        where: {
          role: In([UserRoleEnum.admin_platform, UserRoleEnum.owner_platform]),
        },
        select: ['id'],
      }),
    ]);

    if (otherUser) {
      throw new Error(ErrorMsgEnum.EmailAlreadyExist);
    }

    if (
      ![UserRoleEnum.admin_platform, UserRoleEnum.owner_platform].includes(
        payload.role,
      )
    ) {
      throw new Error(ErrorMsgEnum.UserNotAdmin);
    }
    const salt = await bcrypt.genSalt();
    const codeRecoveryPassword = uuidv4();

    const admin = await this.dataSource
      .getRepository(UserModel)
      .create({
        id: `admin-${countAdmins + 1}`,
        email,
        role: payload.role,
        passwordData: {
          salt: salt,
          codeRecoveryPassword: codeRecoveryPassword,
          dateRecoveryRequest: new Date(),
        },
        license: {
          licenseType: '-',
          licenseNumber: '-',
        },
        fullName: 'admin',
      })
      .save();

    await this.customerioService.sendEmail({
      to: email,
      subject: `Forgot password`,
      message_data: {
        url: `${CONFIG.platform.platformUrl}/auth/forgot?code=${codeRecoveryPassword}`,
      },
      transactional_message_id: addPrifixEmail(
        EmailTemplatesEnum.forgotPassword,
        CONFIG.platform.ENV.toLowerCase(),
      ),
      identifiers: {
        id: CustomerIoDataService.getUserId(admin.id),
      },
    });

    return true;
  }

  @Query(() => UsersModelDTO, {
    description: '@protected - users (admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async users(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { relations },
  ): Promise<UsersModelDTO> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const filters = payload?.filters || [];
    const order = QueryService.getSorts(sorts);
    let where = QueryService.getFilters(filters);
    if (!Object.keys(where).includes('role')) {
      where = merge(where, {
        role: In([UserRoleEnum.owner_platform, UserRoleEnum.admin_platform]),
      });
    }

    const [items, total] = await this.dataSource
      .getRepository(UserModel)
      .findAndCount({
        order,
        where: where,
        ...paginate,
        relations,
      });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    };
  }

  @Query(() => UserModel, {
    description: '@protected - get user By Id (admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async userById(
    @Args('payload', { type: () => GetIdStringDTO }) payload: GetIdStringDTO,
    @CurrentCtx() { relations },
  ): Promise<UserModel> {
    const userDb = await this.dataSource.getRepository(UserModel).findOne({
      where: {
        id: payload.id,
      },
      relations,
    });

    if (!userDb) throw Error(ErrorMsgEnum.EntityNotExist);
    return userDb;
  }

  @Mutation(() => UserModel, {
    description: '@protected - Update Admin Profile',
  })
  @UseGuards(AuthGuardAdmin)
  async updateAdminProfile(
    @Args('payload', {
      type: () => UpdateAdminProfileInput,
      nullable: false,
    })
    payload: UpdateAdminProfileInput,
    @Args('logo', { type: () => GraphQLUpload, nullable: true })
    logo: FileUpload,
    @CurrentCtx() { user, relations },
  ): Promise<UserModel> {
    if (
      payload.adminId !== user.id &&
      user.role !== UserRoleEnum.owner_platform
    ) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }

    const data: DeepPartial<UserModel> = {
      id: payload.adminId,
      ...payload,
      asset: await this.assetService.getAsset(logo, AssetFileTypeEnum.logo),
    };

    if (user.role !== UserRoleEnum.owner_platform) {
      delete data.role;
    }

    if (
      Object.keys(payload).includes('role') &&
      ![UserRoleEnum.admin_platform, UserRoleEnum.owner_platform].includes(
        payload.role,
      )
    ) {
      throw new Error(ErrorMsgEnum.UserNotAdmin);
    }

    const admin = await this.dataSource.getRepository(UserModel).findOne({
      where: {
        id: payload.adminId,
      },
      select: ['id', 'role'],
    });

    if (
      ![UserRoleEnum.admin_platform, UserRoleEnum.owner_platform].includes(
        admin.role,
      )
    ) {
      throw new Error(ErrorMsgEnum.UserNotAdmin);
    }

    await this.dataSource.getRepository(UserModel).create(data).save();

    if (
      Object.keys(payload).includes('email') ||
      (Object.keys(payload).includes('isBlocked') && payload.isBlocked)
    ) {
      await this.authService.clearDataUserInRedis(payload.adminId);
    }

    return this.dataSource.getRepository(UserModel).findOne({
      where: {
        id: payload.adminId,
      },
      relations,
    });
  }

  @Mutation(() => Boolean, {
    description: '@public - delete admin',
  })
  @UseGuards(AuthGuardAdmin)
  async deleteAdmin(
    @Args('payload', { type: () => GetIdStringDTO, nullable: false })
    payload: GetIdStringDTO,
    @CurrentCtx() { user },
  ): Promise<boolean> {
    if (![UserRoleEnum.owner_platform].includes(user.role)) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }

    const userDb = await this.dataSource.getRepository(UserModel).findOne({
      where: {
        id: payload.id,
      },
    });

    if (!userDb) {
      throw new Error(ErrorMsgEnum.UserNotExist);
    }

    if (
      ![UserRoleEnum.admin_platform, UserRoleEnum.owner_platform].includes(
        userDb.role,
      )
    ) {
      throw new Error(ErrorMsgEnum.UserNotAdmin);
    }

    await this.dataSource.getRepository(UserModel).delete(payload.id);

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuardAdmin)
  async allowFacilityContract(): Promise<boolean> {
    if (!CONFIG.hedera.isTestnet) throw new Error(ErrorMsgEnum.NoAccess);

    const facilitiesDb = await this.dataSource
      .getRepository(FacilityModel)
      .find({
        where: {
          publicAddress: Not(IsNull()),
        },
        select: ['id', 'index', 'publicAddress'],
      });

    for await (const facilityDb of facilitiesDb) {
      await Promise.allSettled([
        this.hederaService.tokenAssociateTransaction(
          facilityDb.publicAddress,
          CONFIG.hedera.mnemonic,
          facilityDb.index,
          CONFIG.hedera.token,
        ),
        this.hederaService.contractOrderAssociateTransaction(
          facilityDb.publicAddress,
          facilityDb.index,
        ),
      ]);
    }
    return true;
  }
}
