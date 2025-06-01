import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import moment from 'moment';
import ErrorMsgEnum from '@enums/error';
import { MetrcEmployeesService, MetrcFacilitiesService } from 'libs/metrc/src';
import bcrypt from 'bcrypt';
import { UserRoleEnum } from '../user.enum';
import { MetrcFacility, MetrcFacilityType } from 'libs/metrc/src/api/api.dto';
import { FacilityRoleEnum } from '@entities/facility/facility.enum';
import { SignUpBuyerInput } from './buyer.input';
import { FacilityModel } from '@entities/facility/facility.model';

@Injectable()
export class BuyerService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly metrcEmployeesService: MetrcEmployeesService,
    private readonly metrcFacilitiesService: MetrcFacilitiesService,
  ) {}

  async getUserData(payload: SignUpBuyerInput, email: string) {
    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(payload.password, salt);

    if (payload.metrcApiKey && payload.metrcApiKey !== '') {
      try {
        const employeeMetrc = await this.metrcEmployeesService.getEmployeeById(
          payload.metrcApiKey,
          payload.licenseNumberFacility,
          payload.licenseNumberEmployee,
        );

        if (!employeeMetrc) {
          throw new Error(ErrorMsgEnum.EmployeeNotExistInMetrc);
        }

        return {
          ...payload,
          fullName: employeeMetrc.fullName || payload.fullName,
          joinDate: new Date(),
          email,
          phoneNumber: null, // since the phone has become unique for registration and authorization. Then a conflict arises when registering a number from an invite
          id: payload.licenseNumberEmployee,
          role: UserRoleEnum.user,
          passwordData: { password: newPassword, salt },
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
        };
      } catch (error) {
        throw new Error(ErrorMsgEnum.FacilitiesOrUserKeyNotExistInMetrc);
      }
    }

    return {
      ...payload,
      fullName: payload.fullName || 'Employee',
      joinDate: new Date(),
      email,
      phoneNumber: null, // since the phone has become unique for registration and authorization. Then a conflict arises when registering a number from an invite
      id: payload.licenseNumberEmployee,
      role: UserRoleEnum.user,
      passwordData: { password: newPassword, salt },
      license: {
        licenseNumber: '',
        licenseStartDate: moment().format('YYYY-MM-DD'),
        licenseEndDate: moment().format('YYYY-MM-DD'),
        licenseType: 'Unlicensed',
        isLicenseActive: false,
      },
    };
  }

  async createFacility(
    metrcApiKey: string,
    licenseNumberFacility: string,
    email: string,
  ) {
    let facilityData: MetrcFacility = {
      name: licenseNumberFacility,
      displayName: licenseNumberFacility,
      role: FacilityRoleEnum.buyer,
      facilityType: {
        isRetail: true,
        ...new MetrcFacilityType(),
      },
      license: {
        number: licenseNumberFacility.toString(),
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        licenseType: '-',
      },
    };

    if (metrcApiKey && metrcApiKey !== '') {
      try {
        const facilityMetrc = await this.metrcFacilitiesService.getFacilityById(
          metrcApiKey,
          licenseNumberFacility,
        );

        if (!facilityMetrc) {
          throw new Error(ErrorMsgEnum.FacilitiesNotExistInMetrc);
        }

        if (!facilityMetrc.facilityType.isRetail) {
          throw new Error(ErrorMsgEnum.FacilityNotAccessRetail);
        }

        facilityData = {
          ...facilityMetrc,
          role: facilityMetrc.facilityType.canGrowPlants
            ? FacilityRoleEnum.buyerAndCultivator
            : FacilityRoleEnum.buyer,
        };
      } catch (error) {
        throw new Error(ErrorMsgEnum.FacilitiesOrUserKeyNotExistInMetrc);
      }
    }

    return this.dataSource
      .getRepository(FacilityModel)
      .create({
        ...facilityData,
        id: facilityData.license.number,
        metrcApiKey: metrcApiKey,
        license: {
          licenseNumber: facilityData.license.number,
          licenseStartDate: facilityData.license.startDate,
          licenseEndDate: facilityData.license.endDate,
          licenseType: facilityData.license.licenseType,
          isLicenseActive:
            facilityData.license.licenseType !== 'Unlicensed' &&
            !!facilityData.license.endDate &&
            moment(facilityData.license.endDate).format('YYYY-MM-DD') >
              moment().format('YYYY-MM-DD'),
        },
        email,
        campaignEmail: email,
      })
      .save();
  }
}
