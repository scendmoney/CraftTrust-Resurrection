import { Injectable } from '@nestjs/common';
import { MetrcService } from '../metrc.service';
import { MetrcAuthBasic } from '../metrc.dto';
import { MetrcItem, MetrcItems } from './api.dto';
import { toCamelCase } from '@src/utils/utils';

@Injectable()
export class MetrcItemsService extends MetrcService {
  constructor(options: MetrcAuthBasic) {
    super(options);
  }

  async getItemsById(
    userApiKey: string,
    id: string,
    licenseNumber?: string,
  ): Promise<MetrcItem> {
    const urlStr = new URL(`${this.getUrl()}/items/v2/${id}`);

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.get<MetrcItem>(userApiKey, urlStr.href);
  }

  async getItemsActive(
    userApiKey: string,
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
    lastModifiedStart?: string,
    lastModifiedEnd?: string,
  ): Promise<MetrcItem[]> {
    const urlStr = new URL(`${this.getUrl()}/items/v2/active`);

    urlStr.searchParams.append('licenseNumber', licenseNumber);
    if (lastModifiedStart)
      urlStr.searchParams.append('lastModifiedStart', lastModifiedStart);

    if (lastModifiedEnd)
      urlStr.searchParams.append('lastModifiedEnd', lastModifiedEnd);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);

    return toCamelCase<MetrcItems>(
      await this.get<MetrcItems>(userApiKey, urlStr.href),
    ).data;
  }

  async getItemsInactive(
    userApiKey: string,
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
  ): Promise<MetrcItems> {
    const urlStr = new URL(`${this.getUrl()}/items/v2/inactive`);

    urlStr.searchParams.append('licenseNumber', licenseNumber);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<MetrcItems>(userApiKey, urlStr.href);
  }

  async getItemsCategories(
    userApiKey: string,
    licenseNumber?: string,
    pageNumber?: string,
    pageSize?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/items/v2/categories`);

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getItemsBrands(
    userApiKey: string,
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/items/v2/brands`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getItemsPhoto(
    userApiKey: string,
    photoId: string,
    licenseNumber?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/items/v2/photo/${photoId}`);

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async addItems(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/items/v2`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateItems(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/items/v2`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async addItemsPhoto(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/items/v2/photo`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async deleteItems(
    userApiKey: string,
    id,
    licenseNumber: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/items/v2/${id}`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.delete<any>(userApiKey, urlStr.href);
  }

  async deleteItemsBrand(
    userApiKey: string,
    id,
    licenseNumber: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/items/v2/brand/${id}`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.delete<any>(userApiKey, urlStr.href);
  }

  async addItemsBrand(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/items/v2/brand`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateItemsBrand(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/items/v2/brand`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }
}
