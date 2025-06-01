import { ComponentType } from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

export const PercentFormatter: ComponentType<DataTypeProvider.ValueFormatterProps> | undefined = ({
  value
}) => {
  if (isFinite(value)) {
    return <>{value} %</>;
  }
  return <>--</>;
};
