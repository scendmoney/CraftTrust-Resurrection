import { InputType, PickType } from '@nestjs/graphql';
import ConfigurationModel from './configuration.model';

@InputType({ description: 'Input data for update commission' })
export class ConfigurationUpdateInput extends PickType(
  ConfigurationModel,
  ['type', 'value'],
  InputType,
) {}
