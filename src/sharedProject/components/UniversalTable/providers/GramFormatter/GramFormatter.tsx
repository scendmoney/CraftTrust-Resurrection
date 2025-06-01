import { ComponentType } from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

export const GramFormatter: ComponentType<DataTypeProvider.ValueFormatterProps> | undefined = ({
  value
}) => {
  if (isFinite(value)) {
    return <>{value} g</>;
  }
  return <>--</>;
};
