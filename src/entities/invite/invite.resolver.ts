import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentCtx } from '../auth/auth.decorator';
import { DataSource, DeepPartial, In, Not } from 'typeorm';
import ErrorMsgEnum from '@enums/error';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { InviteModel } from './invite.model';
import { CreateInviteInput, InviteByCodeInput } from './invite.input';
import { InviteStatusEnum, InviteTypeEnum } from './invite.enum';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import crypto from 'crypto';
import { TwilioService } from 'libs/twilio/src';
import { FacilityModel } from '@entities/facility/facility.model';
import { CONFIG } from '@config/index';
import { InvitationsDTO } from './invite.dto';
import { SortDirectionEnum } from '@enums/common';
import QueryService from '@common/query';
import { FacilityRoleEnum } from '@entities/facility/facility.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerIoTypesEnum } from '@entities/customerio/customerio.enum';

@Resolver(() => InviteModel)
export class InviteResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly twilioService: TwilioService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Mutation(() => InviteModel, {
    description: '@protected - create invite',
  })
  @UseGuards(AuthGuardUser)
  async createInvite(
    @Args('payload', {
      type: () => CreateInviteInput,
      nullable: false,
    })
    payload: CreateInviteInput,
    @CurrentCtx() { user, relations },
  ): Promise<InviteModel> {
    const { employeeId, ...other } = payload;

    const phone = payload.phone
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll(' ', '')
      .replaceAll('-', '');

    const [facility, otherInvite] = await Promise.all([
      this.dataSource.getRepository(FacilityModel).findOne({
        where: {
          id: user.__context__.id,
        },
        relations: ['users', 'owner'],
      }),
      this.dataSource.getRepository(InviteModel).findOne({
        where: {
          facility: {
            id: user.__context__.id,
          },
          phone,
          status: Not(
            In([InviteStatusEnum.rejected, InviteStatusEnum.approved]),
          ),
          type: payload.type,
        },
        select: ['id'],
      }),
    ]);

    if (otherInvite) {
      throw new Error(ErrorMsgEnum.InviteAlreadyExist);
    }
    if (!facility) {
      throw new Error(ErrorMsgEnum.FacilityNotExist);
    }
    if (facility.__owner__?.id !== user.id) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }

    const query: DeepPartial<InviteModel> = {
      code: crypto.randomBytes(8).toString('hex'),
      facility: {
        id: user.__context__.id,
      },
      ...other,
      owner: {
        id: user.id,
      },
    };

    let message = '';
    switch (payload.type) {
      case InviteTypeEnum.employee: {
        if (facility.role !== FacilityRoleEnum.buyer) {
          const userEmployee = facility.__users__.find(
            (item) => item.id === employeeId,
          );
          if (!userEmployee || !employeeId) {
            throw new Error(ErrorMsgEnum.EmployeeNotExist);
          }
          if (userEmployee.email) {
            throw new Error(ErrorMsgEnum.EmployeeAlreadyExist);
          }
          query.employee = {
            id: employeeId,
            phoneNumber: phone,
          };
        }
        message = `Invitation to ${
          payload.employeeId || payload.name
        } to join ${facility.displayName} storefront. ${
          CONFIG?.platform?.platformUrl
        }/auth/join/employee?code=${query.code}`;

        break;
      }
      case InviteTypeEnum.buyer: {
        message = `Invitation to ${payload.name} to join ${facility.displayName} storefront. ${CONFIG?.platform?.platformUrl}/auth/join/buyer?code=${query.code}`;
        break;
      }
      default:
        throw new Error(ErrorMsgEnum.InviteTypeWrong);
    }

    await this.twilioService.sendSMS(message, phone);

    const result = await this.dataSource
      .getRepository(InviteModel)
      .create(query)
      .save();

    this.eventEmitter.emit(CustomerIoTypesEnum.buyerInvitation, {
      inviteId: result.id,
      type: payload.type,
    });

    return this.dataSource.getRepository(InviteModel).findOne({
      where: {
        id: result.id,
      },
      relations,
    });
  }

  @Mutation(() => InviteModel, {
    description: '@public - reject invite',
  })
  @UseGuards(AuthGuardUser)
  async rejectInvite(
    @Args('payload', { type: () => GetIdDTO, nullable: false })
    payload: GetIdDTO,
    @CurrentCtx() { user, relations },
  ): Promise<InviteModel> {
    const invite = await this.dataSource.getRepository(InviteModel).findOne({
      where: {
        id: payload.id,
      },
      relations: ['owner'],
    });

    if (!invite) {
      throw new Error(ErrorMsgEnum.InviteNotExist);
    }

    if (invite.__owner__?.id !== user.id) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }

    if (invite.status === InviteStatusEnum.approved) {
      throw new Error(ErrorMsgEnum.InviteActivated);
    }

    await this.dataSource.getRepository(InviteModel).update(invite.id, {
      status: InviteStatusEnum.rejected,
    });

    this.eventEmitter.emit(CustomerIoTypesEnum.buyerInvitationCanceled, {
      inviteId: invite.id,
      type: invite.type,
    });

    return this.dataSource.getRepository(InviteModel).findOne({
      where: {
        id: payload.id,
      },
      relations,
    });
  }

  @Mutation(() => Boolean, {
    description: '@public - resend invite',
  })
  @UseGuards(AuthGuardUser)
  async resendInvite(
    @Args('payload', { type: () => GetIdDTO, nullable: false })
    payload: GetIdDTO,
    @CurrentCtx() { user },
  ): Promise<boolean> {
    const invite = await this.dataSource.getRepository(InviteModel).findOne({
      where: {
        id: payload.id,
        status: Not(InviteStatusEnum.rejected),
      },
      relations: ['owner', 'facility', 'employee'],
    });
    if (!invite) {
      throw new Error(ErrorMsgEnum.InviteNotExist);
    }

    if (invite.__owner__?.id !== user.id) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }

    let message = '';
    switch (invite.type) {
      case InviteTypeEnum.employee: {
        message = `Invitation to ${invite.__employee__.id} to join ${invite.__facility__.displayName} storefront. ${CONFIG?.platform?.platformUrl}/auth/join/employee?code=${invite.code}`;
        break;
      }
      case InviteTypeEnum.buyer: {
        message = `Invitation to ${invite.name} to join ${invite.__facility__.displayName} storefront. ${CONFIG?.platform?.platformUrl}/auth/join/buyer?code=${invite.code}`;
        break;
      }
      default:
        throw new Error(ErrorMsgEnum.InviteTypeWrong);
    }

    await this.twilioService.sendSMS(message, invite.phone);

    return true;
  }

  @Query(() => InvitationsDTO, {
    description: '@protected - invitations',
  })
  @UseGuards(AuthGuardUser)
  async invitations(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { user, relations },
  ): Promise<InvitationsDTO> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const filters = payload?.filters || [];
    const order = QueryService.getSorts(sorts);
    const where = QueryService.getFilters(filters);

    const [items, total] = await this.dataSource
      .getRepository(InviteModel)
      .findAndCount({
        order,
        where: {
          ...where,
          owner: {
            id: user.id,
          },
          facility: {
            id: user.__context__.id,
          },
        },
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

  @Query(() => InviteModel, {
    description: '@protected - Get invite by id',
  })
  async inviteByCode(
    @Args('payload', { type: () => InviteByCodeInput })
    payload: InviteByCodeInput,
    @CurrentCtx() { relations },
  ): Promise<InviteModel> {
    const invite = await this.dataSource.getRepository(InviteModel).findOne({
      where: {
        code: payload.code,
        status: Not(InviteStatusEnum.rejected),
      },
      relations,
    });
    if (!invite) throw Error(ErrorMsgEnum.EntityNotExist);
    return invite;
  }
}
