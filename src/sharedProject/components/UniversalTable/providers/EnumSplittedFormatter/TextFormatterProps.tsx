import { ComponentType } from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import splitCamelCase from 'utils/splitCamelCase';

export const EnumSplittedFormatter:
  | ComponentType<DataTypeProvider.ValueFormatterProps>
  | undefined = ({ value }) => {
  if (value) {
    return <>{splitCamelCase(value)}</>;
  }
  return <>--</>;
};
