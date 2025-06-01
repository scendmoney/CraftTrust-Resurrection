import React from 'react';
import { Table } from '@devexpress/dx-react-grid-material-ui';

interface IProps extends Table.DataRowProps {
  onRowClick?: (id: number | string) => void;
}

const TableRow = ({ row, onRowClick, ...restProps }: IProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Table.Row
      {...restProps}
      // eslint-disable-next-line no-alert
      onClick={handleOnRowClick}
      style={
        onRowClick
          ? {
              cursor: 'pointer'
            }
          : undefined
      }
    />
  );

  function handleOnRowClick(event: React.MouseEvent<HTMLElement>) {
    if (onRowClick) {
      event.stopPropagation();
      onRowClick(row.id);
    }
  }
};

export default TableRow;
