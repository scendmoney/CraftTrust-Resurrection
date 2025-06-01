import { Injectable, OnModuleInit } from '@nestjs/common';
import { TwilioOptions } from './twilio.types';
import Twilio from 'twilio';
import ErrorMsgEnum from '@enums/error';
import { Client } from '@twilio/conversations';
import { CONFIG } from '@config/index';

@Injectable()
export class TwilioService implements OnModuleInit {
  static options: TwilioOptions = null;
  private _client: Twilio.Twilio = null;

  constructor(options: TwilioOptions) {
    TwilioService.options = options;
  }

  async onModuleInit() {
    this._client = Twilio(
      TwilioService.options.twilioAccountSid,
      TwilioService.options.twilioAuthToken,
    );
  }

  async sendSMS(message: string, phone: string): Promise<boolean> {
    if (CONFIG.twilio.isSendSMS) {
      if (phone[0] !== '+') {
        phone = `+${phone}`;
      }
      await this._client.messages.create({
        from: TwilioService.options.twilioPhone,
        body: message,
        to: phone
          .replaceAll('(', '')
          .replaceAll(')', '')
          .replaceAll(' ', '')
          .replaceAll('-', ''),
      });
    }
    return true;
  }

  async sendWhatsapp(message: string, phone: string): Promise<boolean> {
    await this._client.messages.create({
      from: `whatsapp:${TwilioService.options.twilioWhatsApp}`,
      body: message,
      to: `whatsapp:${phone}`,
    });

    return true;
  }

  async createChat(userIdentities: string[]): Promise<string> {
    if (!userIdentities.length) {
      throw new Error(ErrorMsgEnum.ChatUsersWrong);
    }
    const userTokens = await Promise.all(
      userIdentities.map((item) => this.generateToken(item)),
    );

    const client = new Client(userTokens[0]);
    const conversation = await client.createConversation({
      attributes: { reachabilityEnabled: true },
    });
    await Promise.all(
      userIdentities.map((item) => {
        conversation.add(item);
      }),
    );

    return conversation.sid;
  }

  async generateToken(identity: string): Promise<string> {
    const AccessToken = Twilio.jwt.AccessToken;
    const ChatGrant = AccessToken.ChatGrant;

    const chatGrant = new ChatGrant({
      serviceSid: TwilioService.options.twilioServiceChatSid,
    });
    const token = new AccessToken(
      TwilioService.options.twilioAccountSid,
      TwilioService.options.twilioApiKey,
      TwilioService.options.twilioApiSecret,
      {
        identity: identity,
      },
    );

    token.addGrant(chatGrant);
    new Client(token.toJwt());

    return token.toJwt();
  }
}
