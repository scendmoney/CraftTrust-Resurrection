import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from 'mui/theme/colors';
import ArrowDownIcon from 'resources/iconsMui/ArrowDownIcon';
import ArrowUpIcon from 'resources/iconsMui/ArrowUpIcon';

import styles from './styles';

interface SortingLabelComponentProps {
  children: React.ReactNode;
  direction: 'desc' | 'asc' | null;
  onSort: (parameters: { direction: 'desc' | 'asc' }) => void;
  sortingEnabled?: boolean;
}

const SortingLabelComponent: React.FC<SortingLabelComponentProps> = ({
  children,
  direction,
  onSort,
  sortingEnabled
}) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    if (sortingEnabled) {
      return;
    }
    const newDirection = direction === 'asc' ? 'desc' : 'asc';
    onSort({ direction: newDirection });
  };
  const renderIcon = (direction: string | null) => {
    return !sortingEnabled ? (
      <Box sx={styles.iconWrapper}>
        <ArrowUpIcon fill={direction === 'asc' ? colors.black : colors.gray5} />
        <ArrowDownIcon fill={direction === 'desc' ? colors.black : colors.gray5} />
      </Box>
    ) : null;
  };
  return (
    <Box
      onClick={handleClick}
      sx={styles.labelWrapper}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Typography color={direction ? colors.black : colors.gray5} variant="subtitle2">
        {children}
      </Typography>
      <Box style={styles.icon}>{direction || hover ? renderIcon(direction) : null}</Box>
    </Box>
  );
};

export default SortingLabelComponent;
