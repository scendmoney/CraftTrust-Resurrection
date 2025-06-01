import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { IProductModel, OrderStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import OrderIdFormatter from 'sharedProject/components/UniversalTable/providers/OrderIdFormatter/OrderIdFormatter';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import styles from './styles';
import { IHeader } from './types';

const ProductMetrcDataChildTable: FC<{ product: IProductModel }> = ({ product }) => {
  const { goToModal } = useProjectRouter();

  function createData(
    id: number,
    orderId: number | undefined,
    orderStatus: OrderStatusEnum,
    weight: number
  ) {
    return { id, orderId, orderStatus, weight };
  }

  const rows = (product?.children || []).map((child) =>
    createData(
      child.id,
      child.orderResolve?.id,
      child.orderResolve?.status as OrderStatusEnum,
      child.quantityStock
    )
  );

  const headers: IHeader[] = [
    { id: 'id', label: 'ID' },
    { id: 'order', label: 'ORDER' },
    { id: 'weight', label: 'WEIGHT' }
  ];

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.id} align="left">
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: colors.gray5 }}>
                  {header.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={styles.row} onClick={() => goToModal({ id: row.id })} hover>
              <TableCell component="th" scope="row">
                <Typography variant="body1" fontWeight={500}>
                  {row.id}
                </Typography>
              </TableCell>
              <TableCell align="left">
                {row.orderId ? (
                  <OrderIdFormatter status={row.orderStatus} id={String(row.orderId)} />
                ) : (
                  <Typography variant="body1" fontWeight={500} sx={{ whiteSpace: 'nowrap' }}>
                    --
                  </Typography>
                )}
              </TableCell>
              <TableCell align="left">
                <Typography variant="body1" fontWeight={500} sx={{ whiteSpace: 'nowrap' }}>
                  {row.weight} lb
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductMetrcDataChildTable;
