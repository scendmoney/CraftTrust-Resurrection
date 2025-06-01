import { Args, Mutation, Resolver } from '@nestjs/graphql';
import CodeModel from './code.model';
import { DataSource, DeepPartial, MoreThanOrEqual } from 'typeorm';
import moment from 'moment';
import ErrorMsgEnum from '@enums/error';
import random from 'lodash/random';
import { TwilioService } from 'libs/twilio/src';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { GenerateCodeSMSInput } from './code.input';

@Resolver(() => CodeModel)
export default class CodeResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly twilioService: TwilioService,
  ) {}

  @Mutation(() => Boolean)
  async generateCodeSMS(
    @Args('payload', {
      type: () => GenerateCodeSMSInput,
      nullable: false,
    })
    { phone }: GenerateCodeSMSInput,
    @CurrentCtx() { ipAddress },
  ): Promise<boolean> {
    const [code, otherCode] = await Promise.all([
      this.dataSource.getRepository(CodeModel).findOne({
        where: {
          phone: phone,
        },
      }),
      this.dataSource.getRepository(CodeModel).count({
        where: {
          ipAddress,
          attemptDate: MoreThanOrEqual(
            moment().utc().subtract(10, 'm').toDate(),
          ),
        },
      }),
    ]);

    if (otherCode > 5) {
      throw Error(ErrorMsgEnum.CodeNoExpired);
    }

    const newCode = random(1000, 9999);
    const attemptDate = new Date();
    const data: DeepPartial<CodeModel> = {
      phone: phone,
      code: newCode,
      attemptDate,
      generateCodeCount: 1,
      ipAddress,
    };

    if (code) {
      const seconds = code.generateCodeCount <= 1 ? 10 : 5 * 60;
      if (
        code.code &&
        code.attemptDate &&
        moment(new Date()).unix() - moment(code.attemptDate).unix() < seconds
      ) {
        throw Error(ErrorMsgEnum.CodeNoExpired);
      }

      data.id = code.id;
      data.generateCodeCount = code.generateCodeCount + 1;
    }
    console.log(data);
    await this.dataSource.getRepository(CodeModel).create(data).save();
    await this.twilioService.sendSMS(`Code: ${newCode}`, phone);
    return true;
  }
}
