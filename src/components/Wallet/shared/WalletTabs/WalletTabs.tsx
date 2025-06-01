import { FC } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useRouter } from 'next/router';

const WalletTabs: FC<{
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
}> = ({ options = [] }) => {
  const router = useRouter();

  return (
    <Box mx={2}>
      <ToggleButtonGroup value={router.pathname} color="primary" exclusive fullWidth>
        {options.map((item) => {
          return (
            <ToggleButton
              disabled={Boolean(item?.disabled)}
              key={item.value}
              value={item.value}
              onClick={(_e, value) => router.push(value)}
            >
              {item.label}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
};

export default WalletTabs;
