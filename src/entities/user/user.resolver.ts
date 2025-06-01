import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserModel } from './user.model';
import { CurrentCtx } from '../auth/auth.decorator';
import {
  AuthGuardAdmin,
  AuthGuardAllUser,
  AuthGuardUser,
} from '../auth/auth.guard';
import { DataSource, DeepPartial } from 'typeorm';
import ErrorMsgEnum from '@enums/error';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { AssetFileTypeEnum } from '@entities/asset/asset.enum';
import {
  LoginSMSInput,
  UpdateUserDTO,
  UserEmailInput,
  UserLoginInput,
  UserRecoveryInput,
} from './user.input';
import { v4 as uuidv4 } from 'uuid';
import { AssetService } from '@entities/asset/asset.service';
import { FacilityModel } from '@entities/facility/facility.model';
import { InviteModel } from '@entities/invite/invite.model';
import { ProductModel } from '@entities/product/product.model';
import { OrderModel } from '@entities/order/order.model';
import { CompanyModel } from '@entities/company/company.model';
import { SubcompanyModel } from '@entities/subcompany/subcompany.model';
import { CartModel } from '@entities/cart/cart.model';
import OrderProductModel from '@entities/order_product/order_product.model';
import moment from 'moment';
import { CONFIG } from '@config/index';
import bcrypt from 'bcrypt';
import { UserTokenDTO } from './user.dto';
import { AuthService } from '@entities/auth/auth.service';
import CustomerioService from 'libs/customerio/src/customerio.service';
import { addPrifixEmail } from '@src/utils/utils';
import { EmailTemplatesEnum } from '@enums/common';
import { CustomerIoDataService } from '@entities/customerio/customerio.service';
import CodeModel from '@entities/code/code.model';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly assetService: AssetService,
    private readonly authService: AuthService,
    private readonly customerioService: CustomerioService,
  ) {}

  @Query(() => UserModel, {
    description: "@protected - Get own User's profile",
  })
  @UseGuards(AuthGuardAllUser)
  async me(@CurrentCtx() { user, relations }): Promise<UserModel> {
    const userDB = await this.dataSource.getRepository(UserModel).findOne({
      where: {
        id: user.id,
      },
      relations,
    });

    if (!userDB) throw new Error(ErrorMsgEnum.UserNotExist);

    return userDB;
  }

  @Mutation(() => Boolean, { description: '@public - forgot password' })
  async forgotPassword(
    @Args('payload', { type: () => UserEmailInput })
    payload: UserEmailInput,
  ): Promise<boolean> {
    const email = payload.email.toLowerCase();
    const user = await this.dataSource.getRepository(UserModel).findOne({
      where: { email },
    });

    if (!user) throw new Error('USER_NO_EXIST');

    if (
      moment().unix() <
      moment(user.passwordData.dateRecoveryRequest).add(5, 'seconds').unix()
    ) {
      throw new Error('WAITING_3_MINUTES');
    }

    const codeRecoveryPassword = uuidv4();

    await Promise.all([
      this.dataSource
        .getRepository(UserModel)
        .create({
          id: user.id,
          dates: {
            updatedDate: new Date(),
          },
          passwordData: {
            codeRecoveryPassword: codeRecoveryPassword,
            dateRecoveryRequest: new Date(),
          },
        })
        .save(),
      this.customerioService.sendEmail({
        to: user.email,
        subject: `Forgot password`,
        message_data: {
          url: `${CONFIG.platform.platformUrl}/auth/forgot?code=${codeRecoveryPassword}`,
        },
        transactional_message_id: addPrifixEmail(
          EmailTemplatesEnum.forgotPassword,
          CONFIG.platform.ENV.toLowerCase(),
        ),
        identifiers: {
          id: CustomerIoDataService.getUserId(user.id),
        },
      }),
    ]);

    return true;
  }

  @Mutation(() => Boolean, {
    description: '@public - changing your password using code recovery',
  })
  async recoveryPassword(
    @Args('payload', { type: () => UserRecoveryInput })
    { codeRecoveryPassword, password }: UserRecoveryInput,
  ): Promise<boolean> {
    const user = await this.dataSource
      .getRepository(UserModel)
      .findOne({ where: { passwordData: { codeRecoveryPassword } } });

    if (!user) throw new Error('INVALID_RECOVERY_CODE');

    let salt = user.passwordData?.salt;

    if (!salt) {
      salt = await bcrypt.genSalt();
    }

    const newPassword = await bcrypt.hash(password, salt);
    const hours = CONFIG.platform.recoveryPasswordHours;

    if (
      moment().unix() >
      moment(user.passwordData.dateRecoveryRequest)
        .add(hours.toString(), 'hours')
        .unix()
    ) {
      throw new Error('RECOVERY_CODE_TIMED_OUT');
    }

    await this.dataSource
      .getRepository(UserModel)
      .create({
        id: user.id,
        passwordData: {
          dateRecoveryDone: new Date(),
          isRecoveryPassword: true,
          password: newPassword,
          salt,
          codeRecoveryPassword: null,
          dateRecoveryRequest: null,
        },
      })
      .save();
    return true;
  }

  @Mutation(() => UserTokenDTO, {
    description: '@public - login',
  })
  async login(
    @Args('payload', { type: () => UserLoginInput }) payload: UserLoginInput,
  ): Promise<UserTokenDTO> {
    const userExist = await this.dataSource.getRepository(UserModel).findOne({
      where: { email: payload.email.toLowerCase() },
    });

    if (!userExist) throw new Error(ErrorMsgEnum.UserNotExist);
    if (!userExist.passwordData.password) {
      throw new Error(ErrorMsgEnum.UserNoPassword);
    }

    if (
      !(await bcrypt.compare(payload.password, userExist.passwordData.password))
    ) {
      throw new Error(ErrorMsgEnum.EntityLoginPasswordWrong);
    }

    const token = await this.authService.login(userExist);

    return {
      token,
      user: userExist,
    };
  }

  @Mutation(() => UserTokenDTO, {
    description: '@public - login client, buyer, cultivator, admin',
  })
  async loginSMS(
    @Args('payload', { type: () => LoginSMSInput })
    { phoneNumber, code }: LoginSMSInput,
  ): Promise<UserTokenDTO> {
    const [user, codeData] = await Promise.all([
      this.dataSource.getRepository(UserModel).findOne({
        where: {
          phoneNumber: phoneNumber,
        },
      }),
      this.dataSource.getRepository(CodeModel).findOne({
        where: {
          phone: phoneNumber,
          code,
        },
      }),
    ]);

    if (!codeData || !user) {
      throw new Error(ErrorMsgEnum.UserOrCodeWrong);
    }

    const [token] = await Promise.all([
      this.authService.login(user),
      this.dataSource.getRepository(CodeModel).delete(codeData.id),
    ]);

    return {
      token,
      user: user,
    };
  }

  // @Query(() => Boolean, {
  //   description: '@protected - check email',
  // })
  // async checkEmail(
  //   @Args('email', {
  //     type: () => String,
  //     nullable: false,
  //   })
  //   email: string,
  // ): Promise<boolean> {
  //   const userDB = await this.dataSource.getRepository(UserModel).findOne({
  //     where: {
  //       email: email.toLowerCase(),
  //     },
  //     select: ['id'],
  //   });

  //   return !!userDB;
  // }

  @Mutation(() => UserModel, {
    description: '@protected - Input data for update user profile',
  })
  @UseGuards(AuthGuardUser)
  async updateUser(
    @Args('payload', {
      type: () => UpdateUserDTO,
      nullable: false,
    })
    payload: UpdateUserDTO,
    @Args('logo', { type: () => GraphQLUpload, nullable: true })
    logo: FileUpload,
    @CurrentCtx() { user, relations },
  ): Promise<UserModel> {
    const data: DeepPartial<UserModel> = {
      id: user.id,
      ...payload,
      asset: await this.assetService.getAsset(logo, AssetFileTypeEnum.logo),
    };

    await this.dataSource.getRepository(UserModel).create(data).save();

    return this.dataSource.getRepository(UserModel).findOne({
      where: {
        id: user.id,
      },
      relations,
    });
  }

  @Mutation(() => Boolean, {
    description: "@public - Remove User's profile",
    deprecationReason: 'Temporary method',
  })
  @UseGuards(AuthGuardAdmin)
  async deprecatedRemoveUser(@Args('id', { type: () => String }) id: string) {
    await Promise.all([
      this.dataSource.getRepository(FacilityModel).update(
        {
          userContact: {
            id,
          },
        },
        { userContact: null },
      ),
      this.dataSource.getRepository(FacilityModel).update(
        {
          owner: {
            id,
          },
        },
        { owner: null },
      ),
      this.dataSource
        .getRepository(UserModel)
        .update(id, { email: null, asset: null }),
    ]);

    return true;
  }

  @Mutation(() => Boolean, {
    description: "@public - Remove User's profile and facility",
    deprecationReason: 'Temporary method',
  })
  @UseGuards(AuthGuardAdmin)
  async deprecatedRemoveUserAndFacility(
    @Args('id', { type: () => String }) id: string,
  ) {
    const [
      facilities,
      products,
      subcompanys,
      invites,
      orderProducts,
      orders,
      carts,
      usersContext,
    ] = await Promise.all([
      this.dataSource.getRepository(FacilityModel).find({
        where: {
          owner: {
            id,
          },
        },
        select: ['id'],
        withDeleted: true,
      }),
      this.dataSource.getTreeRepository(ProductModel).find({
        where: {
          facility: {
            owner: {
              id,
            },
          },
        },
        select: ['id'],
        relations: ['item'],
        withDeleted: true,
      }),
      this.dataSource.getTreeRepository(SubcompanyModel).find({
        where: [
          {
            facilityBuyer: {
              owner: {
                id,
              },
            },
          },
        ],
        select: ['id'],
        relations: ['surveys'],
        withDeleted: true,
      }),
      this.dataSource.getTreeRepository(InviteModel).find({
        where: [
          {
            facility: {
              owner: {
                id,
              },
            },
          },
          {
            relationFacility: {
              owner: {
                id,
              },
            },
          },
          {
            owner: {
              id,
            },
          },
          {
            employee: {
              id,
            },
          },
        ],
        select: ['id'],
        withDeleted: true,
      }),
      this.dataSource.getTreeRepository(OrderProductModel).find({
        where: [
          {
            order: {
              facilityBuyer: {
                owner: {
                  id: id,
                },
              },
            },
          },
          {
            order: {
              facilityCultivator: {
                owner: {
                  id: id,
                },
              },
            },
          },
        ],
        select: ['id'],
        withDeleted: true,
      }),
      this.dataSource.getTreeRepository(OrderModel).find({
        where: [
          {
            facilityBuyer: {
              owner: {
                id: id,
              },
            },
          },
          {
            facilityCultivator: {
              owner: {
                id: id,
              },
            },
          },
        ],
        select: ['id'],
        relations: {
          products: true,
          transactions: {
            blockchainTransactions: true,
          },
        },
        withDeleted: true,
      }),
      this.dataSource.getRepository(CartModel).find({
        where: [
          {
            facilityBuyer: {
              owner: {
                id: id,
              },
            },
          },
          {
            facilityCultivator: {
              owner: {
                id: id,
              },
            },
          },
        ],
        select: ['id'],
        withDeleted: true,
        relations: {
          cartItems: true,
        },
      }),
      this.dataSource.getRepository(UserModel).find({
        where: {
          context: {
            owner: {
              id,
            },
          },
        },
        select: ['id'],
        withDeleted: true,
      }),
    ]);

    await this.dataSource.getRepository(SubcompanyModel).remove(subcompanys);
    await this.dataSource
      .getRepository(OrderProductModel)
      .remove(orderProducts);

    const companies = await this.dataSource
      .getTreeRepository(CompanyModel)
      .find({
        where: {
          facilityCultivator: {
            owner: {
              id,
            },
          },
        },
        select: ['id'],
        relations: ['subcompanies.surveys'],
        withDeleted: true,
      });

    const promises = [];
    if (carts.length) {
      promises.push(this.dataSource.getRepository(CartModel).remove(carts));
    }
    if (companies.length) {
      promises.push(
        this.dataSource.getRepository(CompanyModel).remove(companies),
      );
    }
    if (invites.length) {
      promises.push(this.dataSource.getRepository(InviteModel).remove(invites));
    }
    if (orders.length) {
      promises.push(this.dataSource.getRepository(OrderModel).remove(orders));
    }
    if (usersContext.length) {
      promises.push(
        this.dataSource.getRepository(UserModel).update(
          usersContext.map(({ id }) => id),
          {
            context: null,
          },
        ),
      );
    }
    await Promise.all([
      ...promises,
      this.dataSource.getRepository(FacilityModel).update(
        {
          userContact: {
            id,
          },
        },
        {
          userContact: null,
        },
      ),
    ]);

    if (products.length) {
      await this.dataSource.getTreeRepository(ProductModel).remove(products);
    }

    if (facilities.length) {
      await this.dataSource.query(
        `DELETE FROM public.user_to_facilities WHERE facility_id in('${facilities
          .map(({ id }) => id)
          .join(',')}') ;`,
      );

      await this.dataSource.query(
        `DELETE FROM public.facility_to_facility WHERE facility_id in('${facilities
          .map(({ id }) => id)
          .join(',')}') OR facility_rel_id in('${facilities
          .map(({ id }) => id)
          .join(',')}');`,
      );
      await this.dataSource
        .getRepository(FacilityModel)
        .delete(facilities.map(({ id }) => id));
    }
    await this.dataSource.getRepository(UserModel).delete(id);
    return true;
  }

  @Mutation(() => UserModel, {
    description: '@protected - update user context',
  })
  @UseGuards(AuthGuardUser)
  async updateUserContext(
    @CurrentCtx() { user, relations },
    @Args('facilityId', { type: () => String, nullable: false })
    facilityId: string,
  ): Promise<UserModel> {
    const [facility] = await Promise.all([
      this.dataSource.getRepository(FacilityModel).findOne({
        where: {
          id: facilityId,
          users: {
            id: user.id,
          },
        },
      }),
    ]);

    if (!facility) {
      throw new Error(ErrorMsgEnum.FacilityNotExist);
    }

    await this.dataSource.getRepository(UserModel).update(user.id, {
      context: {
        id: facilityId,
      },
    });

    await this.authService.updateUserContextRedis(user.id);

    return this.dataSource
      .getRepository(UserModel)
      .findOne({ where: { id: user.id }, relations });
  }
}
