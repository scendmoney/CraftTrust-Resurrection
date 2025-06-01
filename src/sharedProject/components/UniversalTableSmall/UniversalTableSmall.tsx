import { FC, useMemo, useState } from 'react';
import {
  CustomPaging,
  PagingState,
  Row,
  RowDetailState,
  SortingState
} from '@devexpress/dx-react-grid';
import { Grid, PagingPanel, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import Box from '@mui/material/Box';

import SortingLabelComponent from '../UniversalTable/SortingLabelComponent/SortingLabelComponent';

import TableRow from './TableRow/TableRow';
import styles from './styles';
import IProps from './types';

const UniversalTableSmall: FC<IProps> = ({
  rows,
  columns,
  children,
  sorting,
  setSorting,
  columnExtensions,

  totalCount,

  currentPage,
  setPageSize,
  pageSize,
  setCurrentPage,
  pageSizes,

  onRowClick,

  expandedRowIds,
  setExpandedRowIds,
  height = '100vh',
  firstColumnWidth = 'auto',
  lastColumnWidth = 'auto'
}) => {
  const getRowId = (row: Row) => row.id;
  const shouldShowPagingPanel = totalCount > pageSize;

  const [sortingStateColumnExtensions] = useState([{ columnName: 'menu', sortingEnabled: false }]);
  const stylesUm = useMemo(() => {
    return styles(firstColumnWidth, lastColumnWidth, onRowClick);
  }, [firstColumnWidth, lastColumnWidth, onRowClick]);
  return (
    <Box sx={stylesUm.container} height={height}>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <Table
          columnExtensions={columnExtensions}
          rowComponent={(rest) => <TableRow onRowClick={onRowClick} {...rest} />}
        />
        {expandedRowIds && setExpandedRowIds ? (
          <RowDetailState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={setExpandedRowIds}
          />
        ) : null}

        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
          columnExtensions={sortingStateColumnExtensions}
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

        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        {children}

        <CustomPaging totalCount={totalCount} />
        {shouldShowPagingPanel && <PagingPanel pageSizes={pageSizes} />}
      </Grid>
    </Box>
  );
};

export default UniversalTableSmall;
