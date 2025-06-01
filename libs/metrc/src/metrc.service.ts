import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MetrcAuthBasic } from './metrc.dto';

@Injectable()
export class MetrcService {
  private _softwareApiKey = null;
  private _url = null;

  constructor(options: MetrcAuthBasic) {
    this._softwareApiKey = options.softwareApiKey;
    this._url = options.url;
  }

  static getAuthBasic(userApiKey: string, softwareApiKey: string) {
    return {
      username: softwareApiKey,
      password: userApiKey,
    };
  }

  getUrl() {
    return this._url;
  }

  async post<K, T>(userApiKey: string, url: string, payload: K): Promise<T> {
    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        auth: MetrcService.getAuthBasic(userApiKey, this._softwareApiKey),
        timeout: 61000,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Status: ${error.response.status}, data: ${JSON.stringify(
            error.response.data,
          )}, message: ${error.message}`,
        );
      } else {
        throw new Error(error.message);
      }
    }
  }

  async get<T>(userApiKey: string, url: string): Promise<T> {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        auth: MetrcService.getAuthBasic(userApiKey, this._softwareApiKey),
        timeout: 61000,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Status: ${error.response.status}, data: ${JSON.stringify(
            error.response.data,
          )}, message: ${error.message}`,
        );
      } else {
        throw new Error(error.message);
      }
    }
  }

  async put<K, T>(userApiKey: string, url: string, payload: K): Promise<T> {
    try {
      const response = await axios.put(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        auth: MetrcService.getAuthBasic(userApiKey, this._softwareApiKey),
        timeout: 61000,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Status: ${error.response.status}, data: ${JSON.stringify(
            error.response.data,
          )}, message: ${error.message}`,
        );
      } else {
        throw new Error(error.message);
      }
    }
  }

  async delete<T>(userApiKey: string, url: string): Promise<T> {
    try {
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        auth: MetrcService.getAuthBasic(userApiKey, this._softwareApiKey),
        timeout: 61000,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Status: ${error.response.status}, data: ${JSON.stringify(
            error.response.data,
          )}, message: ${error.message}`,
        );
      } else {
        throw new Error(error.message);
      }
    }
  }
}
