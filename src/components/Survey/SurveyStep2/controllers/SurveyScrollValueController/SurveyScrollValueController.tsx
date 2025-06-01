import { FC, useEffect, useRef, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { debounce } from 'lodash';

import styles from './styles';

export type TLabelValue = {
  label: string;
  value: string | number;
  img?: string | null | undefined;
  additionalText?: string | number;
};

const SurveyScrollValueController: FC<{
  onChange: (value: TLabelValue | null) => void;
  value: TLabelValue | null;
  options: TLabelValue[];
}> = ({ onChange, value, options }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState<TLabelValue | null>(value);
  const [userScrolled, setUserScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current && userScrolled) {
        const wrapper = wrapperRef.current;

        const centerPosition = wrapper.scrollLeft + wrapper.clientWidth / 2;

        let closestDistance = Infinity;
        let closestValue = null;

        Array.from(wrapper.children).forEach((child, index) => {
          if (child instanceof HTMLElement) {
            const childCenter = child.offsetLeft + child.clientWidth / 2;
            const distance = Math.abs(centerPosition - childCenter);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestValue = options[index];
            }
          }
        });

        setSelectedValue(closestValue);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 200);
    const currentWrapper = wrapperRef.current;

    currentWrapper?.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      currentWrapper?.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [options, userScrolled]);

  const scrollBy = (offset: number) => {
    if (wrapperRef.current) {
      setUserScrolled(true);
      wrapperRef.current.scrollLeft += offset;
    }
  };

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue, onChange]);

  return (
    <Box sx={styles.valueWrapper} ref={wrapperRef}>
      {options.map((item) => (
        <Box
          key={item.value}
          sx={{
            ...styles.valueItem
          }}
        >
          <ButtonBase
            onClick={() => {
              setSelectedValue(item);
              setUserScrolled(true);
            }}
            sx={{
              ...styles.round,
              ...{
                border: selectedValue === item ? '2px solid #EB4F4F' : '2px solid #ddd',
                backgroundColor: selectedValue === item ? '#fff' : '#ddd',
                opacity: selectedValue === item ? '1' : '0.75'
              }
            }}
          >
            {item?.img ? (
              <Box component="img" src={item.img} />
            ) : (
              <Typography fontWeight={700} fontSize={34} variant="h5">
                {item.additionalText}
              </Typography>
            )}
          </ButtonBase>
          <Typography fontWeight={500} fontSize={24} variant="h4">
            {item.label}
          </Typography>
        </Box>
      ))}
      <Box sx={styles.filler} />
      <IconButton sx={styles.arrowLeft} onClick={() => scrollBy(-170)} size="small">
        <KeyboardArrowLeftIcon />
      </IconButton>
      <IconButton sx={styles.arrowRight} onClick={() => scrollBy(170)} size="small">
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default SurveyScrollValueController;
