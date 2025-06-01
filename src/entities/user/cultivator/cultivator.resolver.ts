import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DataSource, DeepPartial, Not } from 'typeorm';
import ErrorMsgEnum from '@enums/error';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { FacilityModel } from '@entities/facility/facility.model';
import {
  DeprecatedSyncFacilityInput,
  SignUpCultivatorDTO,
} from './cultivator.input';
import { UserModel } from '../user.model';
import { JobEnum, QueueEnum } from '@enums/common';
import { RequestModel } from '@entities/request/request.model';
import {
  RequestStatusEnum,
  RequestTypeEnum,
} from '@entities/request/request.enum';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerIoTypesEnum } from '@entities/customerio/customerio.enum';
import { UserTokenDTO } from '../user.dto';
import { AuthService } from '@entities/auth/auth.service';
import { СultivatorService } from './cultivator.service';
import bcrypt from 'bcrypt';

@Resolver(() => UserModel)
export class CultivatorResolver {
  constructor(
    private readonly dataSource: DataSource,
    private eventEmitter: EventEmitter2,
    private readonly authService: AuthService,
    private readonly cultivatorService: СultivatorService,
    @InjectQueue(QueueEnum.queueUser) private readonly queueUser: Queue,
    @InjectQueue(QueueEnum.queueProduct) private readonly queueProduct: Queue,
    @InjectQueue(QueueEnum.queueHedera) private readonly queueHedera: Queue,
  ) {}

  @Mutation(() => Boolean, {
    description: '@public - deprecatedSyncFacility',
  })
  @UseGuards(AuthGuardUser)
  async deprecatedSyncFacility(
    @Args('payload', {
      type: () => DeprecatedSyncFacilityInput,
      nullable: false,
    })
    payload: DeprecatedSyncFacilityInput,
  ): Promise<boolean> {
    const facility = await this.dataSource
      .getRepository(FacilityModel)
      .findOne({
        where: {
          id: payload.licenseNumberFacility,
        },
        relations: ['owner'],
      });

    if (!facility) throw new Error(ErrorMsgEnum.FacilityNotExist);
    if (!facility.__owner__) throw new Error(ErrorMsgEnum.UserNotOwner);

    await Promise.all([
      this.queueUser.add(
        JobEnum.syncEmployeesJob,
        {
          facility: facility,
        },
        { attempts: 2, removeOnComplete: true },
      ),
      this.queueProduct.add(
        JobEnum.syncProductsJob,
        {
          facility: facility,
        },
        { attempts: 2, removeOnComplete: true },
      ),
    ]);

    return true;
  }

  @Mutation(() => UserTokenDTO, {
    description: '@public - Sign up cultivator',
  })
  async signUpCultivator(
    @Args('payload', {
      type: () => SignUpCultivatorDTO,
      nullable: false,
    })
    payload: SignUpCultivatorDTO,
  ): Promise<UserTokenDTO> {
    const email = payload.email.toLowerCase();

    const [facilityExist, request, userExist, otherUser] = await Promise.all([
      this.dataSource.getRepository(FacilityModel).findOne({
        where: {
          id: payload.licenseNumberFacility,
          metrcApiKey: FacilityModel.encryptMetrcApiKey(payload.metrcApiKey),
        },
        relations: ['owner'],
      }),
      this.dataSource.getRepository(RequestModel).findOne({
        where: {
          code: payload.code,
          type: RequestTypeEnum.request,
          status: RequestStatusEnum.approved,
          isActivated: false,
        },
      }),
      this.dataSource.getRepository(UserModel).findOne({
        where: [
          {
            email,
          },
        ],
        relations: ['userToFacilities'],
      }),
      this.dataSource.getRepository(UserModel).findOne({
        where: [
          {
            id: payload.licenseNumberEmployee,
            email: Not(email),
          },
        ],
      }),
    ]);

    let facility = facilityExist;
    let userDB = userExist;

    if (!request) {
      throw new Error(ErrorMsgEnum.CodeWrong);
    }

    if (otherUser || (userDB && userDB.id !== payload.licenseNumberEmployee)) {
      throw new Error(ErrorMsgEnum.EmailOrKeyAlreadyExist);
    }

    if (
      facility?.__owner__ &&
      facility?.__owner__?.id !== payload.licenseNumberEmployee
    ) {
      throw new Error(ErrorMsgEnum.FacilityOwnerWrong);
    }

    let newUserData: DeepPartial<UserModel>;
    // user data + validation
    if (userDB && userDB.passwordData.password) {
      if (
        !(await bcrypt.compare(payload.password, userDB.passwordData.password))
      ) {
        throw new Error(ErrorMsgEnum.EntityLoginPasswordWrong);
      }
    } else {
      newUserData = await this.cultivatorService.getUserData(payload, email);
    }

    if (!facility) {
      // facility data + validation
      facility = await this.cultivatorService.createFacility(
        payload.metrcApiKey,
        payload.licenseNumberFacility,
        email,
      );
    }

    // done after the creation of the facility so that the facility is validated and created if necessary
    if (!userDB) {
      userDB = await this.dataSource
        .getRepository(UserModel)
        .create(newUserData)
        .save();
    }

    let passwordData;
    if (userDB && !userDB.passwordData.password) {
      const salt = await bcrypt.genSalt();
      const newPassword = await bcrypt.hash(payload.password, salt);
      passwordData = {
        password: newPassword,
        salt,
      };
    }

    // update the context and establish connections
    await Promise.all([
      this.dataSource
        .getRepository(UserModel)
        .create({
          id: userDB.id,
          passwordData: passwordData
            ? {
                password: passwordData.password,
                salt: passwordData.salt,
              }
            : userDB.passwordData,
          userToFacilities: [
            {
              id: facility.id,
            },
            ...(userDB?.__userToFacilities__ || []).map((item) => ({
              id: item.id,
            })),
          ],
          context: {
            id: facility.id,
          },
        })
        .save(),
      this.dataSource
        .getRepository(FacilityModel)
        .create({
          id: facility.id,
          owner: {
            id: userDB.id,
          },
          userContact: {
            id: facility.__userContact__?.id || userDB.id,
          },
        })
        .save(),
      this.dataSource.getRepository(RequestModel).update(request.id, {
        isActivated: true,
      }),
    ]);

    this.eventEmitter.emit(CustomerIoTypesEnum.facilityIdentify, facility.id);

    await Promise.all([
      this.queueUser.add(
        JobEnum.syncEmployeesJob,
        {
          facility: facility,
        },
        { attempts: 2, removeOnComplete: true, removeOnFail: true },
      ),
      this.queueProduct.add(
        JobEnum.syncProductsJob,
        {
          facility: facility,
        },
        { attempts: 2, removeOnComplete: true, removeOnFail: true },
      ),
      this.queueHedera.add(
        JobEnum.createHederaWalletJob,
        {
          id: facility.id,
          model: 'FacilityModel',
          isAssociate: true,
        },
        { attempts: 2, removeOnComplete: true, removeOnFail: true },
      ),
    ]);

    const [user, token] = await Promise.all([
      this.dataSource.getRepository(UserModel).findOne({
        where: {
          id: userDB.id,
        },
      }),
      this.authService.login(userDB),
    ]);

    return { user, token };
  }
}
