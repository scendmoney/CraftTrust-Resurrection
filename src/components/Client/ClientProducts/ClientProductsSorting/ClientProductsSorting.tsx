import { FC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { SortDirectionEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import SortDirectionDownIcon from 'resources/iconsMui/SortDirectionDownIcon';
import SortDirectionUpIcon from 'resources/iconsMui/SortDirectionUpIcon';
import MenuButton from 'sharedProject/components/MenuButton/MenuButton';

import styles from './styles';

const ClientProductsSorting: FC<{
  sortsOptions: {
    label: string;
    value: string;
    onClick: () => void;
  }[];
  direction: SortDirectionEnum;
  changeDirection: (direction: SortDirectionEnum) => void;
}> = ({ sortsOptions, changeDirection, direction }) => {
  return (
    <Box sx={styles.sorting}>
      <MenuButton options={sortsOptions} initialOption="Harvest Date" />
      <Box sx={styles.divider} />
      <IconButton
        onClick={() =>
          changeDirection(
            direction === SortDirectionEnum.Asc ? SortDirectionEnum.Desc : SortDirectionEnum.Asc
          )
        }
      >
        {direction === SortDirectionEnum.Asc ? (
          <SortDirectionDownIcon htmlColor={colors.black1} sx={styles.iconButton} />
        ) : (
          <SortDirectionUpIcon htmlColor={colors.black1} sx={styles.iconButton} />
        )}
      </IconButton>
    </Box>
  );
};
export default ClientProductsSorting;
