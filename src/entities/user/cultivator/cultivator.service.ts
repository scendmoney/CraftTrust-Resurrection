import { FacilityModel } from '@entities/facility/facility.model';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import moment from 'moment';
import ErrorMsgEnum from '@enums/error';
import { SignUpCultivatorDTO } from './cultivator.input';
import { MetrcEmployeesService, MetrcFacilitiesService } from 'libs/metrc/src';
import bcrypt from 'bcrypt';
import { UserRoleEnum } from '../user.enum';
import { MetrcFacility } from 'libs/metrc/src/api/api.dto';
import { FacilityRoleEnum } from '@entities/facility/facility.enum';

@Injectable()
export class СultivatorService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly metrcEmployeesService: MetrcEmployeesService,
    private readonly metrcFacilitiesService: MetrcFacilitiesService,
  ) {}

  async getUserData(payload: SignUpCultivatorDTO, email: string) {
    let employeeMetrc;
    try {
      employeeMetrc = await this.metrcEmployeesService.getEmployeeById(
        payload.metrcApiKey,
        payload.licenseNumberFacility,
        payload.licenseNumberEmployee,
      );
    } catch (error) {
      console.log(error);
      throw new Error(ErrorMsgEnum.FacilitiesOrUserKeyNotExistInMetrc);
    }

    if (!employeeMetrc) {
      throw new Error(ErrorMsgEnum.EmployeeNotExistInMetrc);
    }

    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(payload.password, salt);

    return {
      ...payload,
      joinDate: new Date(),
      email,
      id: employeeMetrc.license.number,
      fullName: employeeMetrc.fullName,
      passwordData: {
        password: newPassword,
        salt,
      },
      license: {
        licenseNumber: employeeMetrc.license.number,
        licenseStartDate: employeeMetrc.license.startDate,
        licenseEndDate: employeeMetrc.license.endDate,
        licenseType: employeeMetrc.license.licenseType,
        isLicenseActive:
          employeeMetrc.license.licenseType !== 'Unlicensed' &&
          !!employeeMetrc.license.endDate &&
          moment(employeeMetrc.license.endDate).format('YYYY-MM-DD') >
            moment().format('YYYY-MM-DD'),
      },
      role: UserRoleEnum.user,
    };
  }

  async createFacility(
    metrcApiKey: string,
    licenseNumberFacility: string,
    email: string,
  ) {
    let facilityMetrc: MetrcFacility;

    try {
      facilityMetrc = await this.metrcFacilitiesService.getFacilityById(
        metrcApiKey,
        licenseNumberFacility,
      );
    } catch (error) {
      throw new Error(ErrorMsgEnum.FacilitiesOrUserKeyNotExistInMetrc);
    }
    if (!facilityMetrc) {
      throw new Error(ErrorMsgEnum.FacilitiesNotExistInMetrc);
    }

    if (!facilityMetrc.facilityType.canGrowPlants) {
      throw new Error(ErrorMsgEnum.FacilityNotAccessGrowPlants);
    }
    let role = FacilityRoleEnum.cultivator;
    if (facilityMetrc.facilityType.isRetail) {
      role = FacilityRoleEnum.buyerAndCultivator;
    }

    return this.dataSource
      .getRepository(FacilityModel)
      .create({
        ...facilityMetrc,
        id: facilityMetrc.license.number,
        metrcApiKey: metrcApiKey,
        email,
        campaignEmail: email,
        role,
        license: {
          licenseNumber: facilityMetrc.license.number,
          licenseStartDate: facilityMetrc.license.startDate,
          licenseEndDate: facilityMetrc.license.endDate,
          licenseType: facilityMetrc.license.licenseType,
          isLicenseActive:
            facilityMetrc.license.licenseType !== 'Unlicensed' &&
            !!facilityMetrc.license.endDate &&
            moment(facilityMetrc.license.endDate).format('YYYY-MM-DD') >
              moment().format('YYYY-MM-DD'),
        },
      })
      .save();
  }
}
