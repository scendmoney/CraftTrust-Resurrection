import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { DataSource, DeepPartial, In } from 'typeorm';
import { UserRoleEnum } from './user.enum';
import { MetrcEmployeesService } from 'libs/metrc/src';
import { FacilityModel } from '@entities/facility/facility.model';
import { UserModel } from './user.model';
import { JobEnum, QueueEnum } from '@enums/common';
import moment from 'moment';
import { CustomLoggerService } from '@common/logger/custom_logger.service';

@Injectable()
@Processor(QueueEnum.queueUser)
export class UserQueue {
  constructor(
    private readonly dataSource: DataSource,
    private readonly metrcEmployeesService: MetrcEmployeesService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Process(JobEnum.syncEmployeesJob)
  async syncEmployeesJob({
    data: { facility },
  }: Job<{ facility: FacilityModel }>) {
    try {
      if (!facility.metrcApiKey) return;

      const [employees] = await Promise.all([
        this.metrcEmployeesService.getEmployees(
          facility.metrcApiKey,
          facility.id,
        ),
      ]);
      if (employees.length) {
        const dataUsers = await employees
          .map((employee) => {
            return {
              ...employee,
              id: employee.license.number,
              license: {
                licenseNumber: employee.license.number,
                licenseStartDate: employee.license.startDate,
                licenseEndDate: employee.license.endDate,
                licenseType: employee.license.licenseType,
                isLicenseActive:
                  employee.license.licenseType !== 'Unlicensed' &&
                  !!employee.license.endDate &&
                  moment(employee.license.endDate).format('YYYY-MM-DD') >
                    moment().format('YYYY-MM-DD'),
              },
              role: UserRoleEnum.user,
            };
          })
          .filter((item) => item !== undefined);
        const dbUsers = await this.dataSource.getRepository(UserModel).find({
          where: {
            id: In(dataUsers.map(({ id }) => id)),
          },
          select: ['id'],
          relations: ['userToFacilities'],
        });
        const users = dataUsers.map((item) => {
          const result: DeepPartial<UserModel> = {
            ...item,
            userToFacilities: [
              {
                id: facility.id,
              },
            ],
          };

          const dbUser = dbUsers.find(({ id }) => id === item.id);

          if (dbUser) {
            result.userToFacilities = [
              ...dbUser.__userToFacilities__.map(({ id }) => ({
                id,
              })),
              ...result.userToFacilities,
            ];
          }
          return result;
        });

        await this.dataSource
          .getRepository(UserModel)
          .save(this.dataSource.getRepository(UserModel).create(users));
      }
      await this.dataSource.getRepository(FacilityModel).update(facility.id, {
        quantityEmployee: () => `(SELECT count(*) as count 
          FROM public.user_to_facilities utf
          where utf.facility_id = '${facility.id}')`,
        quantityActiveEmployee: () => `(SELECT count(*) as count 
          FROM public.user_to_facilities utf
          left join public."user" u on u.id = utf.user_id 
          where utf.facility_id = '${facility.id}' and u.email is not null)`,
      });
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
