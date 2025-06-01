import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import _ from 'lodash';

import styles from './styles';

interface IProps {
  onValueChange: (value: string[]) => void;
  helperText?: string;
  titleText?: string;
  max: number;
  min: number;
  step: number;
  marks:
    | boolean
    | {
        value: number;
        label?: React.ReactNode;
      }[]
    | undefined;
  initialValue?: number[];
  prefix?: string;
  postfix?: string;
}

export const SliderPriceFilter: React.FC<IProps> = ({
  helperText,
  titleText,
  onValueChange,
  max,
  min,
  step,
  marks,
  initialValue = [10, 1000],
  prefix = '',
  postfix = ''
}) => {
  const [value2, setValue2] = React.useState<number[]>(initialValue);

  const debouncedOnValueChange = useRef(
    _.debounce((newValue: string[]) => {
      onValueChange(newValue);
    }, 500)
  ).current;

  const handleChange2 = (event: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setValue2(newValue as number[]);

    debouncedOnValueChange(newValue.map((item) => `${item}`));
  };

  return (
    <Box sx={styles.block}>
      {titleText && <InputLabel sx={styles.label}>{titleText}</InputLabel>}
      <Box px={2}>
        <Slider
          value={value2}
          onChange={handleChange2}
          max={max}
          min={min}
          step={step}
          disableSwap
          marks={marks}
          valueLabelDisplay="auto"
          valueLabelFormat={valuetext}
          color="secondary"
        />
      </Box>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Box>
  );

  function valuetext(value: number) {
    return `${prefix}${value}${postfix}`;
  }
};
