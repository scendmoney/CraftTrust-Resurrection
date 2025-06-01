import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { DataSource } from 'typeorm';
import { FacilityModel } from '@entities/facility/facility.model';
import { JobEnum, QueueEnum } from '@enums/common';
import ErrorMsgEnum from '@enums/error';
import moment from 'moment';
import { MetrcFacilitiesService } from 'libs/metrc/src';
import { MetrcFacility } from 'libs/metrc/src/api/api.dto';
import { CustomLoggerService } from '@common/logger/custom_logger.service';

@Injectable()
@Processor(QueueEnum.queueFacility)
export class FacilityQueue {
  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: CustomLoggerService,
    private readonly metrcFacilitiesService: MetrcFacilitiesService,
  ) {}

  @Process(JobEnum.syncFacilityJob)
  async syncFacility({
    data: {
      facility: { id, metrcApiKey },
    },
  }: Job<{ facility: FacilityModel }>) {
    try {
      if (!id || !metrcApiKey) {
        throw new Error(ErrorMsgEnum.MetrcApiKeyNotExist);
      }

      let facilityMetrc: MetrcFacility | undefined;
      try {
        facilityMetrc = await this.metrcFacilitiesService.getFacilityById(
          metrcApiKey,
          id,
        );
      } catch (error) {
        throw new Error(ErrorMsgEnum.FacilitiesNotExistInMetrc);
      }
      if (!facilityMetrc) {
        throw new Error(ErrorMsgEnum.FacilitiesNotExistInMetrc);
      }

      await this.dataSource
        .getRepository(FacilityModel)
        .create({
          ...facilityMetrc,
          id: facilityMetrc.license.number,
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
    } catch (error) {
      this.logger.error(`syncFacilityJob (${id}): `, error.message);
    }
  }
}
