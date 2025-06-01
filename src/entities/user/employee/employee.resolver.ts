import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { UserModel } from '../user.model';
import { UsersModelDTO, UserTokenDTO } from '../user.dto';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { FilterGetDTO, GetIdStringDTO } from '@common/query/query.dto';

import { SortDirectionEnum } from '@enums/common';
import QueryService from '@common/query';
import ErrorMsgEnum from '@enums/error';
import { InviteModel } from '@entities/invite/invite.model';
import { SignUpEmployeeInput } from './employee.input';
import { InviteStatusEnum, InviteTypeEnum } from '@entities/invite/invite.enum';
import { FacilityModel } from '@entities/facility/facility.model';
import { FacilityRoleEnum } from '@entities/facility/facility.enum';
import { v4 as uuidv4 } from 'uuid';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import bcrypt from 'bcrypt';
import { AuthService } from '@entities/auth/auth.service';

@Resolver(() => UserModel)
export class EmployeeResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly authService: AuthService,
  ) {}

  @Query(() => UsersModelDTO, {
    description: '@protected - employees',
  })
  @UseGuards(AuthGuardUser)
  async employees(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { user, relations },
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
    const where: any = QueryService.getFilters(filters);

    if (where.userToFacilities) {
      where.userToFacilities.id = user.__context__.id;
    } else {
      where.userToFacilities = {
        id: user.__context__.id,
      };
    }

    const [items, total] = await this.dataSource
      .getRepository(UserModel)
      .findAndCount({
        order,
        where: {
          ...where,
          id: Not(user.id),
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

  @Query(() => UserModel, {
    description: '@protected - get employee By Id',
  })
  @UseGuards(AuthGuardUser)
  async employeeById(
    @Args('payload', { type: () => GetIdStringDTO }) payload: GetIdStringDTO,
    @CurrentCtx() { user, relations },
  ): Promise<UserModel> {
    const userEmployee = await this.dataSource
      .getRepository(UserModel)
      .findOne({
        where: {
          id: payload.id,
          userToFacilities: {
            id: user.__context__.id,
          },
        },
        relations,
      });

    if (!userEmployee) throw Error(ErrorMsgEnum.EntityNotExist);
    return userEmployee;
  }

  @Mutation(() => UserTokenDTO)
  async signUpEmployee(
    @Args('payload', { type: () => SignUpEmployeeInput, nullable: false })
    payload: SignUpEmployeeInput,
  ): Promise<UserTokenDTO> {
    const email = payload.email.toLowerCase();
    const [otherUser, userDBId, invite] = await Promise.all([
      this.dataSource.getRepository(UserModel).findOne({
        where: {
          email,
          id: Not(payload.licenseNumberEmployee),
        },
      }),
      this.dataSource.getRepository(UserModel).findOne({
        where: {
          id: payload.licenseNumberEmployee,
        },
        relations: ['userToFacilities'],
      }),
      this.dataSource.getRepository(InviteModel).findOne({
        where: {
          code: payload.code,
          type: InviteTypeEnum.employee,
          status: InviteStatusEnum.processing,
        },
        relations: ['employee', 'facility'],
      }),
    ]);

    let userDB = userDBId;

    if (!invite) {
      throw new Error(ErrorMsgEnum.InviteCodeWrong);
    }

    if ((userDB?.email && userDB?.email !== payload.email) || otherUser) {
      throw new Error(ErrorMsgEnum.EmailOrKeyAlreadyExist);
    }

    if (userDB && userDB.passwordData.password) {
      if (
        !(await bcrypt.compare(payload.password, userDB.passwordData.password))
      ) {
        throw new Error(ErrorMsgEnum.EntityLoginPasswordWrong);
      }
    }

    let employeeId = invite?.__employee__?.id;

    if (invite.__facility__.role === FacilityRoleEnum.buyer && !employeeId) {
      employeeId = uuidv4();

      if (!userDB) {
        const salt = await bcrypt.genSalt();
        const newPassword = await bcrypt.hash(payload.password, salt);
        userDB = await this.dataSource
          .getRepository(UserModel)
          .create({
            id: employeeId,
            joinDate: new Date(),
            email,
            passwordData: {
              password: newPassword,
              salt,
            },
            license: {
              licenseType: '-',
              licenseNumber: '-',
            },
            fullName: '',
            ...payload,
            context: {
              id: invite.__facility__.id,
            },
            userToFacilities: [
              {
                id: invite.__facility__.id,
              },
            ],
          })
          .save();
      }
      await this.dataSource.getRepository(InviteModel).update(invite.id, {
        employee: {
          id: userDB.id,
        },
      });
    } else {
      if (!invite.__employee__) {
        throw new Error(ErrorMsgEnum.EmployeeNotExist);
      }

      if (employeeId !== payload.licenseNumberEmployee) {
        throw new Error(ErrorMsgEnum.IncorrectEmployeeLicenseNumber);
      }
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

    const [newUser] = await Promise.all([
      this.dataSource
        .getRepository(UserModel)
        .create({
          id: employeeId,
          joinDate: new Date(),
          email,
          license: {
            licenseType: '-',
            licenseNumber: payload.licenseNumberEmployee || '-',
          },
          fullName:
            userDB?.fullName ||
            payload.fullName ||
            payload.licenseNumberEmployee,
          context: {
            id: invite.__facility__.id,
          },
          passwordData: passwordData
            ? {
                password: passwordData.password,
                salt: passwordData.salt,
              }
            : userDB.passwordData,
        })
        .save(),
      this.dataSource
        .getRepository(InviteModel)
        .create({
          id: invite.id,
          status: InviteStatusEnum.approved,
        })
        .save(),
    ]);

    userDB = newUser;

    await this.dataSource
      .getRepository(FacilityModel)
      .update(invite.__facility__.id, {
        quantityEmployee: () => `coalesce((SELECT count(*) as count
            FROM public.user_to_facilities utf
            where utf.facility_id = '${invite.__facility__.id}'),0)`,
        quantityActiveEmployee: () => `coalesce((SELECT count(*) as count
            FROM public.user_to_facilities utf
            left join public."user" u on u.id = utf.user_id
            where utf.facility_id = '${invite.__facility__.id}' and u.email is not null),0)`,
      });

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
