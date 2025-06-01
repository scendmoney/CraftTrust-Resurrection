import { Injectable } from '@nestjs/common';
import { MetrcService } from '../metrc.service';

@Injectable()
export class ApiSalesService extends MetrcService {
  async getSalesCustomertypes(userApiKey: string): Promise<string[]> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/customertypes`);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getSalesRegistrationLocations(userApiKey: string): Promise<string[]> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/registration/locations`);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getSalesDelivery(
    userApiKey: string,
    id: string,
    licenseNumber?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/delivery/${id}`);

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getSalesDeliveriesByStatus(
    userApiKey: string,
    status: 'active' | 'inactive',
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
    lastModifiedStart?: string,
    lastModifiedEnd?: string,
    salesDateStart?: string,
    salesDateEnd?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/deliveries/${status}`);

    urlStr.searchParams.append('licenseNumber', licenseNumber);
    if (lastModifiedStart)
      urlStr.searchParams.append('lastModifiedStart', lastModifiedStart);

    if (lastModifiedEnd)
      urlStr.searchParams.append('lastModifiedEnd', lastModifiedEnd);

    if (salesDateStart)
      urlStr.searchParams.append('salesDateStart', salesDateStart);

    if (salesDateEnd) urlStr.searchParams.append('salesDateEnd', salesDateEnd);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getSalesDeliveriesReturnreasons(
    userApiKey: string,
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
  ) {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/delivery/returnreasons`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getSalesCounties(userApiKey: string) {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/counties`);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getSalesPaymenttypes(userApiKey: string) {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/paymenttypes`);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getSalesReceipts(
    userApiKey: string,
    id: string,
    licenseNumber?: string,
  ) {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/receipts/${id}`);
    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getSalesReceiptsByStatus(
    userApiKey: string,
    status: 'active' | 'inactive',
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
    lastModifiedStart?: string,
    lastModifiedEnd?: string,
    salesDateStart?: string,
    salesDateEnd?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/receipts/${status}`);

    urlStr.searchParams.append('licenseNumber', licenseNumber);
    if (lastModifiedStart)
      urlStr.searchParams.append('lastModifiedStart', lastModifiedStart);

    if (lastModifiedEnd)
      urlStr.searchParams.append('lastModifiedEnd', lastModifiedEnd);

    if (salesDateStart)
      urlStr.searchParams.append('salesDateStart', salesDateStart);

    if (salesDateEnd) urlStr.searchParams.append('salesDateEnd', salesDateEnd);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async addSalesDeliveries(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/deliveries`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async addSalesReceipts(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/receipts`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateSalesDeliveriesHub(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/deliveries/hub`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateSalesDeliveriesHubAccept(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/deliveries/hub/accept`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateSalesDeliveriesComplete(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/deliveries/complete`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateSalesDeliveriesHubDepart(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/deliveries/hub/depart`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateSalesDeliveriesHubVerifyId(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/deliveries/hub/verifyID`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateSalesDeliveries(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/deliveries`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateSalesReceipts(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/receipts`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateSalesReceiptsByStatus(
    userApiKey: string,
    status: 'finalize' | 'unfinalize',
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/receipts/${status}`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async deleteSalesDelivery(
    userApiKey: string,
    id,
    licenseNumber: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/delivery/${id}`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.delete<any>(userApiKey, urlStr.href);
  }

  async deleteSalesReceipts(
    userApiKey: string,
    id,
    licenseNumber: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/receipts/${id}`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.delete<any>(userApiKey, urlStr.href);
  }

  async getSalesDeliveriesRetailerByStatus(
    userApiKey: string,
    status: 'active' | 'inactive',
    licenseNumber: string,
    pageNumber?: string,
    pageSize?: string,
    lastModifiedStart?: string,
    lastModifiedEnd?: string,
  ): Promise<any> {
    const urlStr = new URL(
      `${this.getUrl()}/sales/v2/deliveries/retailer/${status}`,
    );

    urlStr.searchParams.append('licenseNumber', licenseNumber);
    if (lastModifiedStart)
      urlStr.searchParams.append('lastModifiedStart', lastModifiedStart);

    if (lastModifiedEnd)
      urlStr.searchParams.append('lastModifiedEnd', lastModifiedEnd);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async getSalesDeliveryRetailer(
    userApiKey: string,
    id: string,
    licenseNumber?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/delivery/retailer/${id}`);

    if (licenseNumber)
      urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.get<any>(userApiKey, urlStr.href);
  }

  async addSalesDeliveriesRetailer(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/deliveries/retailer`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async updateSalesDeliveriesRetailer(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/deliveries/retailer`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.put<any, any>(userApiKey, urlStr.href, payload);
  }

  async deleteSalesDeliveriesRetailer(
    userApiKey: string,
    id,
    licenseNumber: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/delivery/retailer/${id}`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.delete<any>(userApiKey, urlStr.href);
  }

  async addSalesDeliveriesRetailerDepart(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(
      `${this.getUrl()}/sales/v2/deliveries/retailer/depart`,
    );
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async addSalesDeliveriesRetailerRestock(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(
      `${this.getUrl()}/sales/v2/deliveries/retailer/restock`,
    );
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async addSalesDeliveriesRetailerSale(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(
      `${this.getUrl()}/sales/v2/deliveries/retailer/sale`,
    );
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }

  async addSalesDeliveriesRetailerEnd(
    userApiKey: string,
    licenseNumber: string,
    payload,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/sales/v2/deliveries/retailer/end`);
    urlStr.searchParams.append('licenseNumber', licenseNumber);
    return this.post<any, any>(userApiKey, urlStr.href, payload);
  }
}
