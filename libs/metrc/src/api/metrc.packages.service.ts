import { Injectable } from '@nestjs/common';
import { MetrcService } from '../metrc.service';
import { MetrcAuthBasic } from '../metrc.dto';
import { MetrcPackage, MetrcPackages } from './api.dto';
import { toCamelCase } from '@src/utils/utils';

@Injectable()
export class MetrcPackagesService extends MetrcService {
  constructor(options: MetrcAuthBasic) {
    super(options);
  }

  async getPackagesById(
    userApiKey: string,
    id: string,
    licenseNumber?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/${id}`);

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getPackagesSourceHarvestsById(
    userApiKey: string,
    id: string,
    licenseNumber?: string,
  ): Promise<any> {
    const urlStr = new URL(
      `${this.getUrl()}/packages/v2/${id}/source/harvests`,
    );

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getPackageByLabel(
    userApiKey: string,
    label: string,
    licenseNumber?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/${label}`);

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);

    return toCamelCase<MetrcPackage>(
      await this.get<any>(userApiKey, urlStr.href),
    );
  }

  async getPackagesByStatus(
    userApiKey: string,
    status: 'active' | 'onhold' | 'inactive' | 'intransit' | 'labsamples',
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
    lastModifiedStart?: string,
    lastModifiedEnd?: string,
  ): Promise<MetrcPackages> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/${status}`);

    urlStr.searchParams.append('licenseNumber', licenseNumber);
    if (lastModifiedStart)
      urlStr.searchParams.append('lastModifiedStart', lastModifiedStart);

    if (lastModifiedEnd)
      urlStr.searchParams.append('lastModifiedEnd', lastModifiedEnd);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);

    return toCamelCase<MetrcPackages>(
      await this.get<MetrcPackages>(userApiKey, urlStr.href),
    );
  }

  async getPackagesTypes(userApiKey: string) {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/types`);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getPackagesAdjustReasons(
    userApiKey: string,
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/adjust/reasons`);

    urlStr.searchParams.append('licenseNumber', licenseNumber);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async addPackages(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async addPackagesTesting(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/testing`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async addPackagesPlantings(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/plantings`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePackagesDonationFlag(
    userApiKey: string,
    licenseNumber: string,
    isFlag: boolean,
    payload,
  ): Promise<any> {
    const urlStr = new URL(
      `${this.getUrl()}/packages/v2/donation/${isFlag ? 'flag' : 'unflag'}`,
    );
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePackagesItem(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/item`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePackagesNote(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/note`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePackagesLocation(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/location`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePackagesLabtestsRequired(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/labtests/required`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePackagesTradesampleFlag(
    userApiKey: string,
    licenseNumber: string,
    isFlag: boolean,
    payload,
  ): Promise<any> {
    const urlStr = new URL(
      `${this.getUrl()}/packages/v2/tradesample/${isFlag ? 'flag' : 'unflag'}`,
    );
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async addPackagesAdjust(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/adjust`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePackagesRemediate(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/remediate`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePackagesFinish(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/finish`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePackagesUnfinish(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/unfinish`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async deletePackagesById(
    userApiKey: string,
    id: string,
    licenseNumber: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/packages/v2/${id}`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.delete<any>(userApiKey, urlStr.href);
  }
}
