import { Injectable } from '@nestjs/common';
import { MetrcService } from '../metrc.service';
import { MetrcAuthBasic } from '../metrc.dto';

@Injectable()
export class MetrcLabtestsService extends MetrcService {
  constructor(options: MetrcAuthBasic) {
    super(options);
  }
  async getLabTestResults(
    userApiKey: string,
    licenseNumber: string,
    packageId: string,
    pageNumber?: string,
    pageSize?: string,
  ): Promise<any> {
    const urlStr = new URL(`${this.getUrl()}/labtests/v2/results`);

    urlStr.searchParams.append('licenseNumber', licenseNumber);
    urlStr.searchParams.append('packageId', packageId);

    if (pageNumber) urlStr.searchParams.append('pageNumber', pageNumber);
    if (pageSize) urlStr.searchParams.append('pageSize', pageSize);

    return this.get<any>(userApiKey, urlStr.href);
  }

  async getDocument(
    userApiKey: string,
    licenseNumber: string,
    docId: string,
  ): Promise<any> {
    const urlStr = new URL(
      `${this.getUrl()}/labtests/v2/labtestdocument/${docId}`,
    );

    urlStr.searchParams.append('licenseNumber', licenseNumber);

    return this.get<any>(userApiKey, urlStr.href);
  }
}
