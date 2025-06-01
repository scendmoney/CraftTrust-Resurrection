import { Injectable } from '@nestjs/common';
import { MetrcService } from '../metrc.service';
import { MetrcAuthBasic } from '../metrc.dto';
import { MetrcEmployee, MetrcEmployees } from './api.dto';
import { toCamelCase } from '@src/utils/utils';

@Injectable()
export class MetrcEmployeesService extends MetrcService {
  constructor(options: MetrcAuthBasic) {
    super(options);
  }

  async getEmployees(
    userApiKey: string,
    licenseNumberFacility: string,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<MetrcEmployee[]> {
    const urlStr = new URL(`${this.getUrl()}/employees/v2/`);
    urlStr.searchParams.append('licenseNumber', licenseNumberFacility);

    if (pageNumber)
      urlStr.searchParams.append('pageNumber', pageNumber.toString());
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize.toString());

    return toCamelCase<MetrcEmployees>(
      await this.get<MetrcEmployees>(userApiKey, urlStr.href),
    ).data;
  }

  async getEmployeeById(
    userApiKey: string,
    licenseNumberFacility: string,
    licenseNumberEmployee: string,
  ): Promise<MetrcEmployee | undefined> {
    const employees = await this.getEmployees(
      userApiKey,
      licenseNumberFacility,
    );
    return employees.find(
      (employee) => employee.license.number === licenseNumberEmployee,
    ) as MetrcEmployee | undefined;
  }
}
