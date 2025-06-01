import { Dispatch, ReactElement, SetStateAction } from 'react';
import { Column, Row, Sorting } from '@devexpress/dx-react-grid';
import { Table } from '@devexpress/dx-react-grid-material-ui';

interface IProps {
  rows: Row[];
  columns: Column[];
  columnExtensions: Table.ColumnExtension[];
  children?: ReactElement;

  setPageSize: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  sorting: Sorting[];
  setSorting: Dispatch<SetStateAction<Sorting[]>>;

  pageSizes: number[];
  pageSize: number;
  currentPage: number;

  isLoading: boolean;

  totalCount: number;

  menuElement?: ReactElement;

  initialHiddenColumnNames?: string[];

  onRowClick?: (id: string | number) => void;

  expandedRowIds?: (string | number)[];
  setExpandedRowIds?: Dispatch<SetStateAction<(string | number)[]>>;
  height?: string;
  firstColumnWidth?: string;
  lastColumnWidth?: string;
}

export default IProps;
