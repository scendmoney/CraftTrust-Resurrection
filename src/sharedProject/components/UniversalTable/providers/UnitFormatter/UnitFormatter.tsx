import { ComponentType } from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import roundDownWithDecimals from 'utils/roundDownWithDecimals';

export const UnitFormatter: ComponentType<DataTypeProvider.ValueFormatterProps> | undefined = ({
  value
}) => {
  if (isFinite(value)) {
    return <>{roundDownWithDecimals(Number(value), 3)} lb</>;
  }
  return <>--</>;
};
