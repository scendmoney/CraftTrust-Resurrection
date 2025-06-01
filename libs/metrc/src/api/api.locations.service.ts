import { Injectable } from '@nestjs/common';
import { MetrcService } from '../metrc.service';

@Injectable()
export class ApiLocationsService extends MetrcService {
  async getLocations(
    userApiKey: string,
    id: string,
    licenseNumber?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/locations/v2/${id}`);

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getLocationsActive(
    userApiKey: string,
    licenseNumber: string,
    lastModifiedStart?: string,
    lastModifiedEnd?: string,
    pageNumber?: string,
    pageSize?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/locations/v2/active`);

    urlStr.searchParams.append('licenseNumber', licenseNumber);
    if (lastModifiedStart)
      urlStr.searchParams.append('lastModifiedStart', lastModifiedStart);

    if (lastModifiedEnd)
      urlStr.searchParams.append('lastModifiedEnd', lastModifiedEnd);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getLocationsInactive(
    userApiKey: string,
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/locations/v2/inactive`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getLocationsTypes(
    userApiKey: string,
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/locations/v2/types`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async addLocations(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/locations/v2`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateLocations(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/locations/v2`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async deleteLocations(
    userApiKey: string,
    id,
    licenseNumber: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/locations/v2/${id}`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.delete<any>(userApiKey, urlStr.href);
  }
}
