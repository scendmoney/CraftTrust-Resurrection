import { useEffect, useState } from 'react';
import { Filter, Row, Sorting } from '@devexpress/dx-react-grid';

const useUniversalTable = ({
  initialSorting = [{ columnName: 'id', direction: 'desc' }],
  initialFilters = [],
  initialPageSizes = [20, 50, 100]
}: {
  initialSorting?: Sorting[];
  initialFilters?: Filter[];
  initialPageSizes?: number[];
}) => {
  const [sorting, setSorting] = useState<Sorting[]>(initialSorting);
  const [filters, setFilters] = useState<Filter[]>(initialFilters);

  const [total, setTotal] = useState<number>(0);
  const [rows, setRows] = useState<Row[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageSizes] = useState<number[]>(initialPageSizes);

  const [selection, setSelection] = useState<Array<number | string>>([]);

  useEffect(() => {
    setCurrentPage(0);
  }, [filters]);

  return {
    actions: {
      setRows,
      setSorting,
      setFilters,
      setTotal,
      setCurrentPage,
      setPageSize,
      setSelection
    },

    status: {
      pageSizes,
      pageSize,
      currentPage,
      selection,

      total,

      filters,
      sorting,
      rows
    }
  };
};

export default useUniversalTable;
