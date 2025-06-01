import { Injectable } from '@nestjs/common';
import { ConfigurationTypesEnum } from './configuration.enum';
import ErrorMsgEnum from '@enums/error';

@Injectable()
export class ConfigurationService {
  static validateConfiguration(type: ConfigurationTypesEnum, value: string) {
    switch (type) {
      case ConfigurationTypesEnum.commissionOrderCultivator:
      case ConfigurationTypesEnum.commissionOrderBuyer: {
        if (isNaN(Number(value))) {
          throw Error(ErrorMsgEnum.PayloadWrong);
        }
        break;
      }
    }
  }
}
