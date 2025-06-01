import { CONFIG } from '@config/index';
import { Injectable } from '@nestjs/common';
import PinataClient from '@pinata/sdk';
import { PinataDTO } from './pinata.dto';
import CID from 'cids';
import { Stream } from 'typeorm';

@Injectable()
export default class PinataService {
  private pinata: PinataClient;
  static options: PinataDTO = null;

  constructor(options: PinataDTO) {
    PinataService.options = options;
    this.pinata = new PinataClient(CONFIG.pinata);
  }

  async uploadFileToPinataStream(
    readableStream: Stream,
    fileName: string,
  ): Promise<string> {
    try {
      const previewRes = await this.pinata.pinFileToIPFS(
        readableStream,
        PinataService.getOptions(fileName),
      );

      return previewRes.IpfsHash;
    } catch (error) {
      throw Error(error?.message || JSON.stringify(error, null, 2));
    }
  }

  async uploadJSONToPinata(json, fileName: string): Promise<string> {
    try {
      const previewRes = await this.pinata.pinJSONToIPFS(
        json,
        PinataService.getOptions(fileName),
      );
      return previewRes.IpfsHash;
    } catch (error) {
      throw Error(error?.message || error);
    }
  }

  static cidV1ToInt(cidv1: string): string {
    const cid16 = new CID(cidv1).toString('base16').substring(9);
    return BigInt(`0x${cid16}`).toString();
  }

  static getOptions(name) {
    return {
      pinataMetadata: {
        name,
      },
      pinataOptions: {
        cidVersion: 1 as 0 | 1,
      },
    };
  }
}
