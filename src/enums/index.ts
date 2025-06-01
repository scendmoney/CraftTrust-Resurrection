import { registerEnumType } from '@nestjs/graphql';
import {
  FileTypeEnum,
  FilterFieldTypeEnum,
  FilterOperationEnum,
  SortDirectionEnum,
} from './common';
import ErrorMsgEnum from './error';

registerEnumType(ErrorMsgEnum, { name: 'ErrorMsgEnum' });
registerEnumType(FileTypeEnum, { name: 'FileTypeEnum' });
registerEnumType(FilterFieldTypeEnum, { name: 'FilterFieldTypeEnum' });
registerEnumType(FilterOperationEnum, { name: 'FilterOperationEnum' });
registerEnumType(SortDirectionEnum, { name: 'SortDirectionEnum' });
