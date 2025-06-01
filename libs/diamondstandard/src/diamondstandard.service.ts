import { Injectable } from '@nestjs/common';
import {
  DiamondstandardOptions,
  HistoryDto,
  InitiateSellRequestDto,
  SellReferenceDto,
} from './diamondstandard.dto';
import axios from 'axios';
import {
  HistoryInput,
  InitiateSellRequestInput,
  SellReferenceInput,
  SellRequestStatusInput,
} from './diamondstandard.input';

// doc: https://github.com/akashpwl/Carat-Buyback-API-Doc
@Injectable()
export default class DiamondstandardService {
  static options: DiamondstandardOptions = null;

  constructor(options: DiamondstandardOptions) {
    DiamondstandardService.options = options;
  }

  //Carat to USD fiat
  static async getCaratUsd(accountId: string): Promise<number> {
    const response = await axios.get(
      `${this.options.url}/v1/carat-buyback/price-quote`,
      {
        params: {
          accountId,
        },
        headers: {
          'X-API-Key': this.options.apiKey,
        },
      },
    );
    return response?.data?.price || 0;
  }

  // Step 1: Generate a sell reference for a specified quantity of carats at a given price.
  // The quantity of carats should be multiplied by decimals of carat (i.e., 100).
  // The price should be passed in cents.
  static async sellReference({
    accountId,
    quantity,
    price,
  }: SellReferenceInput): Promise<SellReferenceDto> {
    try {
      const response = await axios.get(
        `${this.options.url}/v1/carat-buyback/sell-reference`,
        {
          params: {
            accountId,
            quantity,
            price,
          },
          headers: {
            'X-API-Key': this.options.apiKey,
          },
        },
      );

      return response.data;
    } catch (err) {
      throw Error(
        `Error /v1/carat-buyback/sell-reference: ${
          err.response?.data?.message || err?.message
        }`,
      );
    }
  }

  // Step 2: Initiate a sell request for a specified quantity of carats at a given price.
  // The quantity parameter should be the number of carats multiplied by 100. (e.g. 100.25 should be passed as 10025)
  // The price parameter should be in cents (e.g., $0.86 should be passed as 86).
  // The sell request must be initiated within 15 minutes of generating the sell reference.
  // The allowance transaction memo must include the sell reference.
  // Signature payload must be of below format
  // Format - "accountId,price,quantity,transactionId"
  // Example - "0.0.875673,86,3000,0.0.97713@1718263065.501357948"
  // Signature must be Array of unsigned integers.
  static async initiateSellRequest(
    params: InitiateSellRequestInput,
  ): Promise<InitiateSellRequestDto> {
    try {
      const response = await axios.post(
        `${this.options.url}/v1/carat-buyback/initiate-sell-request`,
        params,
        {
          headers: {
            'X-API-Key': DiamondstandardService.options.apiKey,
          },
        },
      );
      return response?.data || null;
    } catch (err) {
      throw Error(
        `Error /v1/carat-buyback/initiate-sell-request: ${
          err?.response?.data?.message || err?.message
        }`,
      );
    }
  }

  // Check the status of a sell request.
  static async sellRequestStatus(
    params: SellRequestStatusInput,
  ): Promise<string> {
    const response = await axios.get(
      `${this.options.url}/v1/carat-buyback/sell-request-status`,
      {
        params,
        headers: {
          'X-API-Key': DiamondstandardService.options.apiKey,
        },
      },
    );
    return response?.data?.status || '';
  }

  // Check the hostory of sell requests.
  static async history(params: HistoryInput): Promise<HistoryDto[]> {
    const response = await axios.get(
      `${this.options.url}/v1/carat-buyback/sell-request-history`,
      {
        params,
        headers: {
          'X-API-Key': DiamondstandardService.options.apiKey,
        },
      },
    );
    return response?.data || [];
  }
}
