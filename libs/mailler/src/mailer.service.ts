import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerSMTPService {
  static _options;

  constructor(private readonly mailerService: MailerService) {}

  async sendMail(sendMailOptions: ISendMailOptions) {
    const options = { ...sendMailOptions };
    options.context.fields = {
      ...options.context?.fields,
      ...MailerSMTPService._options.fields,
    };

    return this.mailerService.sendMail(options);
  }
}
