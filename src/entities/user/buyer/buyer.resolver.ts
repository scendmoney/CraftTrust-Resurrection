import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { DataSource, DeepPartial, Not } from 'typeorm';
import ErrorMsgEnum from '@enums/error';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { FacilityModel } from '@entities/facility/facility.model';
import { SignUpBuyerInput } from './buyer.input';
import { UserModel } from '../user.model';
import { FacilityRoleEnum } from '@entities/facility/facility.enum';
import { InviteModel } from '@entities/invite/invite.model';
import { JobEnum, QueueEnum } from '@enums/common';
import FacilityToFacilityModel from '@entities/facility_to_facility/facility_to_facility.model';
import { InviteStatusEnum, InviteTypeEnum } from '@entities/invite/invite.enum';
import { CustomerIoTypesEnum } from '@entities/customerio/customerio.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserTokenDTO } from '../user.dto';
import { AuthService } from '@entities/auth/auth.service';
import { BuyerService } from './buyer.service';
import bcrypt from 'bcrypt';

@Resolver(() => UserModel)
export class BuyerResolver {
  constructor(
    private readonly dataSource: DataSource,
    @InjectQueue(QueueEnum.queueUser) private readonly queueUser: Queue,
    @InjectQueue(QueueEnum.queueProduct) private readonly queueProduct: Queue,
    @InjectQueue(QueueEnum.queueHedera) private readonly queueHedera: Queue,
    private eventEmitter: EventEmitter2,
    private readonly authService: AuthService,
    private readonly buyerService: BuyerService,
  ) {}

  @Mutation(() => UserTokenDTO, {
    description: '@public - Sign up buyer',
  })
  async signUpBuyer(
    @Args('payload', {
      type: () => SignUpBuyerInput,
      nullable: false,
    })
    payload: SignUpBuyerInput,
  ): Promise<UserTokenDTO> {
    const email = payload.email.toLowerCase();

    const [facilityDB, invite, userExist, otherUser] = await Promise.all([
      this.dataSource.getRepository(FacilityModel).findOne({
        where: {
          id: payload.licenseNumberFacility,
        },
      }),
      this.dataSource.getRepository(InviteModel).findOne({
        where: {
          code: payload.code,
          status: InviteStatusEnum.processing,
          type: InviteTypeEnum.buyer,
        },
        relations: ['facility', 'relationFacility'],
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

    if (!invite) {
      throw new Error(ErrorMsgEnum.InviteCodeWrong);
    }

    if (
      otherUser ||
      (userExist && userExist.id !== payload.licenseNumberEmployee)
    ) {
      throw new Error(ErrorMsgEnum.EmailOrKeyAlreadyExist);
    }

    let facility = facilityDB;
    let userDB = userExist;

    if (invite.__facility__.id === payload.licenseNumberFacility) {
      throw new Error(ErrorMsgEnum.FacilityWrong);
    }

    if (facility?.role === FacilityRoleEnum.cultivator) {
      throw new Error(ErrorMsgEnum.FacilityNotAccessRetail);
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
      newUserData = await this.buyerService.getUserData(payload, email);
    }

    if (!facility) {
      // facility data + validation
      facility = await this.buyerService.createFacility(
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
      this.dataSource.getRepository(InviteModel).update(invite.id, {
        relationFacility: {
          id: facility.id,
        },
        status: InviteStatusEnum.approved,
      }),
      this.dataSource
        .getRepository(FacilityToFacilityModel)
        .create({
          facilityBuyer: {
            id: facility.id,
          },
          facilityCultivator: {
            id: invite.__facility__.id,
          },
        })
        .save(),
    ]);

    if (facility.metrcApiKey !== '') {
      await Promise.all([
        this.queueUser.add(
          JobEnum.syncEmployeesJob,
          {
            facility,
          },
          { attempts: 2, removeOnComplete: true, removeOnFail: true },
        ),
        this.queueProduct.add(
          JobEnum.syncProductsJob,
          {
            facility,
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
    }

    this.eventEmitter.emit(CustomerIoTypesEnum.buyerInvitationAccepted, {
      inviteId: invite.id,
      type: invite.type,
    });
    this.eventEmitter.emit(CustomerIoTypesEnum.facilityIdentify, facility.id);

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
