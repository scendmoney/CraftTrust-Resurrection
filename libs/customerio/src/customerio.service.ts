import { Injectable } from '@nestjs/common';
import Analytics from '@customerio/cdp-analytics-node';
import { APIClient, SendEmailRequest } from 'customerio-node';
import { SendEmailRequestOptions } from 'customerio-node/lib/api/requests';
import { CustomerioOptions } from './customerio.dto';

@Injectable()
export default class CustomerioService {
  private _clientAnalitics: Analytics;
  private _client: APIClient;

  static options: CustomerioOptions = null;

  constructor(options: CustomerioOptions) {
    CustomerioService.options = options;

    this._clientAnalitics = new Analytics({
      writeKey: options.keyTrack,
      host: options.host,
    });

    this._client = new APIClient(options.api);
  }

  getClientAnalytics() {
    return this._clientAnalitics;
  }

  getClient() {
    return this._client;
  }

  sendEmail(data: SendEmailRequestOptions) {
    return this._client.sendEmail(new SendEmailRequest(data));
  }
}
