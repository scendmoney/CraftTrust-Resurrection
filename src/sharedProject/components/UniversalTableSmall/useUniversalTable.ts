import { useState } from 'react';
import { Row } from '@devexpress/dx-react-grid';

const useUniversalTable = ({
  initialPageSizes = [10, 25, 100]
}: {
  initialPageSizes?: number[];
}) => {
  const [total, setTotal] = useState<number>(0);
  const [rows, setRows] = useState<Row[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSizes] = useState<number[]>(initialPageSizes);

  return {
    actions: {
      setRows,
      setTotal,
      setCurrentPage,
      setPageSize
    },

    status: {
      pageSizes,
      pageSize,
      currentPage,
      total,
      rows
    }
  };
};

export default useUniversalTable;
