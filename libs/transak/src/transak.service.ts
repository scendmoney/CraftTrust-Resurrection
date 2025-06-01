import { Injectable } from '@nestjs/common';
import { TransakOptions } from './transak.types';
import axios from 'axios';
import ErrorMsgEnum from './transak.error';

@Injectable()
export class TransakService {
  private _logger;
  static options: TransakOptions = null;

  constructor(options: TransakOptions, logger) {
    TransakService.options = options;
    this._logger = logger;
  }

  async getAccessToken() {
    try {
      console.log('TransakService.options', TransakService.options);
      const response = await axios.post(
        `https://api-stg.transak.com/partners/api/v2/refresh-token`,
        { apiKey: TransakService.options.apiKey },
        {
          headers: {
            accept: 'application/json',
            'api-secret': TransakService.options.apiSecret,
            'content-type': 'application/json',
          },
        },
      );
      return response?.data?.data?.accessToken;
    } catch (error) {
      this._logger.error(
        `Transak error: ${error?.response?.data?.error?.message}`,
      );
      throw new Error(ErrorMsgEnum.TransakError);
    }
  }

  async updateWebhook() {
    try {
      const response = await axios.post(
        `https://api-stg.transak.com/partners/api/v2/refresh-token`,
        { apiKey: TransakService.options.apiKey },
        {
          headers: {
            accept: 'application/json',
            'api-secret': TransakService.options.apiSecret,
            'content-type': 'application/json',
          },
        },
      );
      return response?.data?.data?.accessToken;
    } catch (error) {
      this._logger.error(
        `Transak error: ${error?.response?.data?.error?.message}`,
      );
      throw new Error(ErrorMsgEnum.TransakError);
    }
  }
}
