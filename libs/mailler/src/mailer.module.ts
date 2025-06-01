import { DynamicModule, Module } from '@nestjs/common';
import { MailerSMTPService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { IMailerToGo } from './mailer.interface';

@Module({})
export class MailerSMTPModule {
  static register(options: IMailerToGo): DynamicModule {
    MailerSMTPService._options = options;

    const providers = [MailerSMTPService];
    const exports = [MailerSMTPService];

    return {
      module: MailerSMTPModule,
      providers,
      exports,
      imports: [
        MailerModule.forRoot({
          preview: false,
          transport: options.url,
          defaults: {
            from: `"No Reply" <noreply@${options.domain}>`,
          },
          template: {
            dir: `${__dirname}/templates/pages/`,
            adapter: new EjsAdapter(),
            options: {
              strict: false,
              context: {
                fields: options.fields,
                ...options.fields,
              },
            },
          },
        }),
      ],
      global: true,
    };
  }
}
