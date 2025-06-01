import { Injectable } from '@nestjs/common';
import { MetrcService } from '../metrc.service';

@Injectable()
export class ApiHarvestsService extends MetrcService {
  async getHarvests(
    userApiKey: string,
    id: string,
    licenseNumber?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/harvests/v2/${id}`);

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getHarvestsByStatus(
    userApiKey: string,
    status: 'active' | 'onhold' | 'inactive',
    licenseNumber,
    lastModifiedStart?,
    lastModifiedEnd?,
    pageNumber?,
    pageSize?,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/harvests/v2/${status}`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    if (lastModifiedStart)
      urlStr.searchParams.append('lastModifiedStart', lastModifiedStart);

    if (lastModifiedEnd)
      urlStr.searchParams.append('lastModifiedEnd', lastModifiedEnd);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getHarvestsWaste(
    userApiKey: string,
    licenseNumber,
    harvestId,
    pageNumber?,
    pageSize?,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/harvests/v2/waste`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    if (harvestId) urlStr.searchParams.append('harvestId', harvestId);
    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getHarvestsWasteType(
    userApiKey: string,
    pageNumber,
    pageSize,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/harvests/v2/waste/types`);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async addHarvestsPackages(
    userApiKey: string,
    licenseNumber,
    isTesting,
    payload,
  ): Promise<any> {
    const urlStr = isTesting
      ? new URL(`${this.getUrl()}/harvests/v2/packages/testing`)
      : new URL(`${this.getUrl()}/harvests/v2/packages`);

    urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateHarvestsLocation(
    userApiKey: string,
    licenseNumber,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/harvests/v2/location`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async addHarvestsWaste(
    userApiKey: string,
    licenseNumber,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/harvests/v2/waste`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateHarvestsRename(
    userApiKey: string,
    licenseNumber,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/harvests/v2/rename`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateHarvestsFinish(
    userApiKey: string,
    licenseNumber,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/harvests/v2/finish`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateHarvestsUnfinish(
    userApiKey: string,
    licenseNumber,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/harvests/v2/unfinish`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateHarvestsRestore(
    userApiKey: string,
    licenseNumber,
    payload,
  ): Promise<any> {
    const urlStr = new URL(
      `${this.getUrl()}/harvests/v2/restore/harvestedplants`,
    );
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async deleteHarvestsWaste(
    userApiKey: string,
    id,
    licenseNumber,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/harvests/v2/waste/${id}`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.delete<any>(userApiKey, urlStr.href);
  }
}
