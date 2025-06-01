import { FC, useMemo, useState } from 'react';
import { Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  CustomPaging,
  FilteringState,
  PagingState,
  Row,
  RowDetailState,
  SelectionState,
  SortingState,
  TableColumnWidthInfo
} from '@devexpress/dx-react-grid';
import {
  ColumnChooser,
  DragDropProvider,
  Grid,
  PagingPanel,
  Table,
  TableColumnReordering,
  // TableColumnReordering,
  TableColumnResizing,
  TableColumnVisibility,
  TableFilterRow,
  TableFixedColumns,
  TableHeaderRow,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ViewIcon from 'resources/iconsMui/ViewIcon';
import reactGridMapDefaultWidths from 'sharedArchitech/utils/reactGridMapDefaultWidths';

import SortingLabelComponent from './SortingLabelComponent/SortingLabelComponent';
import TableRow from './TableRow/TableRow';
import styles from './styles';
import IProps from './types';
import useTableLocalStorage from './useTableLocalStorage';

const UniversalTable: FC<IProps> = ({
  tableId = 'table',
  rows,
  columns,
  children,

  sorting,
  setSorting,
  filters,
  setFilters,
  columnExtensions,

  selection,
  setSelection,

  totalCount,

  currentPage,
  setPageSize,
  pageSize,
  setCurrentPage,
  pageSizes,
  menuElement,

  onRowClick,

  initialHiddenColumnNames = [],

  expandedRowIds,
  setExpandedRowIds,

  height = '100vh',
  isHideToolbar = false,
  isHideLeftPadding = false,
  isLoading,
  noDataMessage = 'No data',
  fixedColumns
}) => {
  const stylesUm = useMemo(() => {
    return styles(isHideLeftPadding);
  }, [isHideLeftPadding]);
  const getRowId = (row: Row) => row.id;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [columnOrder, setColumnOrder] = useTableLocalStorage<string[]>(
    'columnOrder',
    columns.map((item) => item.name),
    tableId
  );

  const [hiddenColumnNames, setHiddenColumnNames] = useTableLocalStorage<string[]>(
    'hiddenColumnNames',
    initialHiddenColumnNames,
    tableId
  );

  const [columnWidths, setColumnWidths] = useState<TableColumnWidthInfo[]>(
    reactGridMapDefaultWidths(columns)
  );

  const [sortingStateColumnExtensions] = useState([
    { columnName: 'menu', sortingEnabled: false },
    { columnName: 'actions', sortingEnabled: false },
    { columnName: 'products', sortingEnabled: false },
    { columnName: 'orderResolve.id', sortingEnabled: false }
  ]);

  const shouldShowPagingPanel = totalCount > pageSize;

  return (
    <Box sx={stylesUm.container} height={height}>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        {expandedRowIds && setExpandedRowIds ? (
          <RowDetailState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={setExpandedRowIds}
          />
        ) : null}

        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />

        <CustomPaging totalCount={totalCount} />

        <FilteringState filters={filters} onFiltersChange={setFilters} />

        <SelectionState selection={selection} onSelectionChange={setSelection} />

        <DragDropProvider />

        <Table
          messages={{
            noData: isLoading ? '' : noDataMessage
          }}
          columnExtensions={columnExtensions}
          rowComponent={(rest) => <TableRow onRowClick={onRowClick} {...rest} />}
        />

        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
          columnExtensions={sortingStateColumnExtensions}
        />

        <TableColumnReordering order={columnOrder} onOrderChange={setColumnOrder} />

        <TableColumnResizing
          minColumnWidth={80}
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
        />

        <TableHeaderRow
          showSortingControls
          sortLabelComponent={(props) => (
            <SortingLabelComponent
              direction={props.direction}
              onSort={props.onSort}
              sortingEnabled={props.disabled}
            >
              {props.children}
            </SortingLabelComponent>
          )}
        />

        {children}

        <TableFilterRow messages={{ filterPlaceholder: 'Search' }} />

        {isMobile ? null : <TableFixedColumns leftColumns={fixedColumns} />}

        <TableColumnVisibility
          hiddenColumnNames={hiddenColumnNames}
          onHiddenColumnNamesChange={setHiddenColumnNames}
        />

        {shouldShowPagingPanel && <PagingPanel pageSizes={pageSizes} />}

        {!isHideToolbar && <Toolbar />}

        {menuElement && (
          <Template name="toolbarContent">
            <TemplatePlaceholder />
            {menuElement}
          </Template>
        )}

        {!isHideToolbar && (
          <ColumnChooser
            toggleButtonComponent={({ onToggle }) => (
              <IconButton onClick={onToggle}>
                <ViewIcon />
              </IconButton>
            )}
          />
        )}
      </Grid>
    </Box>
  );
};

export default UniversalTable;
