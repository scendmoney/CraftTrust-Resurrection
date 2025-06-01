import React, { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';

interface IProps {
  options: { value: string; label: string }[];
  onValueChange: (values: string[]) => void;
  titleText?: string;
}

export const CheckboxFilter: React.FC<IProps> = ({ options, titleText, onValueChange }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newSelectedValues = event.target.checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);

    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  return (
    <Box>
      {titleText && <FormLabel component="legend">{titleText}</FormLabel>}
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                onChange={handleChange}
                value={option.value}
                checked={selectedValues.includes(option.value)}
              />
            }
            label={option.label}
            key={option.value}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
