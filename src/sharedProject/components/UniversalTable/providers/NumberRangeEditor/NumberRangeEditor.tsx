import { useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import _ from 'lodash';

import PopoverEditorWrapper from '../PopoverEditorWrapper/PopoverEditorWrapper';

import marksPrice from './modules/marksPrice';
import styles from './styles';

interface IProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  prefix?: string;
  suffix?: string;
  type?: 'price' | 'carat';
}

export const NumberRangeEditor: React.FC<IProps> = ({
  value,
  onValueChange,
  prefix = '$',
  suffix = '',
  type = 'dollar'
}) => {
  const [valueToShow, setValueToShow] = useState<number[]>(
    value?.map((item) => Number(item)) || []
  );

  const [value2, setValue2] = useState<number[]>([50, 950]);

  const debouncedOnValueChange = useRef(
    _.debounce((newValue: string[]) => {
      onValueChange(newValue);
    }, 500)
  ).current;

  const marksUm = useMemo(() => {
    return marksPrice(prefix, suffix);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange2 = (event: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setValueToShow(newValue);
    setValue2(newValue as number[]);

    debouncedOnValueChange(newValue.map((item) => `${item}`));
  };

  return (
    <PopoverEditorWrapper
      value={valueToShow.map((item) => `${item}`)}
      title={'Price'}
      onRemove={() => {
        setValue2([10, 950]);
        setValueToShow([]);
        debouncedOnValueChange([]);
      }}
      columnName={type}
    >
      <Box pl={1} pr={1.5} flexGrow={1} sx={styles.block}>
        <InputLabel sx={styles.label}>Price</InputLabel>
        <Slider
          value={value2}
          onChange={handleChange2}
          max={1000}
          min={0}
          step={1}
          disableSwap
          marks={marksUm}
          valueLabelDisplay="auto"
          // valueLabelFormat={valuetext}
          color="secondary"
        />
      </Box>
    </PopoverEditorWrapper>
  );
};
