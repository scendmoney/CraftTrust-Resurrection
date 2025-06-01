import { Injectable } from '@nestjs/common';
import { MetrcService } from '../metrc.service';
import { MetrcAuthBasic } from '../metrc.dto';
import { toCamelCase } from '@src/utils/utils';
import { MetrcFacility } from './api.dto';

@Injectable()
export class MetrcFacilitiesService extends MetrcService {
  constructor(options: MetrcAuthBasic) {
    super(options);
  }

  async getFacilities(userApiKey: string): Promise<MetrcFacility[]> {
    return toCamelCase<MetrcFacility[]>(
      await this.get<MetrcFacility[]>(
        userApiKey,
        `${this.getUrl()}/facilities/v2/`,
      ),
    ) as MetrcFacility[];
  }

  async getFacilityById(
    userApiKey: string,
    licenseNumber: string,
  ): Promise<MetrcFacility | undefined> {
    const facilities: MetrcFacility[] = await this.getFacilities(userApiKey);
    return facilities.find(
      (facility) => facility.license.number === licenseNumber,
    ) as MetrcFacility | undefined;
  }
}
