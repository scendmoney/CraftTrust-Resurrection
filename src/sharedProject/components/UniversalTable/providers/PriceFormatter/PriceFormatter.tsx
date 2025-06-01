import { ComponentType } from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

export const PriceFormatter: ComponentType<DataTypeProvider.ValueFormatterProps> | undefined = ({
  value
}) => {
  if (isFinite(value)) {
    return <>${value.toFixed(2)}</>;
  }
  return <>--</>;
};
