import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { ITransactionBlockchainModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import Link from 'next/link';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

const BlockchainTable: FC<{
  data: ITransactionBlockchainModel[] | undefined;
}> = ({ data }) => {
  if (!data) {
    return null;
  }

  const columnsMapping = {
    id: 'ID',
    status: 'Status',
    feeHbar: 'Fee', // TODO
    gasLimit: 'Gas Limit',
    gasUsed: 'Gas Used',
    createdDate: 'Created Date',
    updatedDate: 'Updated Date',
    url: 'Details'
  };

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.dates.updatedDate).getTime();
    const dateB = new Date(b.dates.updatedDate).getTime();
    return dateB - dateA;
  });

  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.values(columnsMapping).map((column, index) => (
              <TableCell key={index}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ color: colors.gray5 }}>
                  {column}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Typography variant="body1" fontWeight={500}>
                  {transaction.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight={500}>
                  {capitalizeFirstLetter(transaction.status)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight={500}>
                  {transaction.feeHbar}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight={500}>
                  {transaction.gasLimit}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight={500}>
                  {transaction.gasUsed}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight={500}>
                  {formatDateTimeDateFns(transaction.dates.createdDate, true)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight={500}>
                  {formatDateTimeDateFns(transaction.dates.updatedDate, true)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight={500}>
                  <Link href={transaction.url} target="_blank" rel="noopener noreferrer">
                    HashScan
                  </Link>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlockchainTable;
