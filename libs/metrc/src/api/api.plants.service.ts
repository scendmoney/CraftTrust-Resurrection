import { Injectable } from '@nestjs/common';
import { MetrcService } from '../metrc.service';

@Injectable()
export class ApiPlantsService extends MetrcService {
  async getPlantsTypes(userApiKey: string): Promise<string[]> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/additives/types`);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getPlants(
    userApiKey: string,
    id: string,
    licenseNumber?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/${id}`);

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getPlantsByLabel(
    userApiKey: string,
    label: string,
    licenseNumber?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/${label}`);

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getPlantsByStatus(
    userApiKey: string,
    status: 'additives' | 'inactive' | 'onhold' | 'flowering' | 'vegetative',
    licenseNumber: string,
    lastModifiedStart?: string,
    lastModifiedEnd?: string,
    pageNumber?: string,
    pageSize?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/${status}`);

    urlStr.searchParams.append('licenseNumber', licenseNumber);
    if (lastModifiedStart)
      urlStr.searchParams.append('lastModifiedStart', lastModifiedStart);

    if (lastModifiedEnd)
      urlStr.searchParams.append('lastModifiedEnd', lastModifiedEnd);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getPlantsGrowthphases(userApiKey: string): Promise<string[]> {
    const urlStr = new URL(`${this.getUrl()}/additives/growthphases`);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getPlantsWasteReasons(
    userApiKey: string,
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/waste/reasons`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async addPlantsAdditives(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/additives`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async addPlantsAdditivesByLocation(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/additives/bylocation`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async addPlantsPlantings(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/plantings`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async addPlantsPlantbatchPackages(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/plantbatch/packages`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async addPlantsManicure(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/manicure`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePlantsLocation(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/location`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePlantsGrowthphase(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/growthphase`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePlantsTag(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/tag`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePlantsStrain(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/strain`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePlantsHarvest(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/harvest`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updatePlantsMerge(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/merge`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async deletePlants(
    userApiKey: string,
    id,
    licenseNumber: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/${id}`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.delete<any>(userApiKey, urlStr.href);
  }

  async addPlantsWaste(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/waste`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async getPlantsWasteMethodsAll(
    userApiKey: string,
    pageNumber?: string,
    pageSize?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/waste/methods/all`);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async updatePlantsSplit(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/plants/v2/split`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }
}
