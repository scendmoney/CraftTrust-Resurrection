import { Dispatch, ReactElement, SetStateAction } from 'react';
import { Column, Filter, Row, Sorting } from '@devexpress/dx-react-grid';
import { Table } from '@devexpress/dx-react-grid-material-ui';

interface IProps {
  tableId?: string;
  rows: Row[];
  columns: Column[];
  columnExtensions: Table.ColumnExtension[];
  children?: ReactElement;

  sorting: Sorting[];
  setSorting: Dispatch<SetStateAction<Sorting[]>>;
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;

  setPageSize: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;

  setSelection: Dispatch<SetStateAction<Array<number | string>>>;
  selection: Array<number | string>;

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
  isHideToolbar?: boolean;
  isHideLeftPadding?: boolean;
  noDataMessage?: string;
  fixedColumns?: string[];
}

export default IProps;
