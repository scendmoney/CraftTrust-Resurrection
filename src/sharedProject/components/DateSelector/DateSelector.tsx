import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parseISO } from 'date-fns';

import ButtonUi from '../ButtonUi/ButtonUi';
import { EButtonType } from '../ButtonUi/types';

import { dateOptions } from './utils/dateOptions';
import { getCurrentMonthDates } from './utils/getCurrentMonthDates';
import { getLastMonthDates } from './utils/getLastMonthDates';
import styles from './styles';

const DateSelector: FC<{
  dateFrom: string | null;
  setDateFrom: Dispatch<SetStateAction<string | null>>;
  dateTo: string | null;
  setDateTo: Dispatch<SetStateAction<string | null>>;
  selectedType: string;
  setSelectedType: Dispatch<SetStateAction<string>>;
  hideInSmallWidth?: boolean;
}> = ({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  selectedType,
  setSelectedType,
  hideInSmallWidth
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getLabelUm = useMemo(() => {
    const formattedDateFrom = dateFrom ? format(parseISO(dateFrom), 'dd.MM') : '';
    const formattedDateTo = dateTo ? format(parseISO(dateTo), 'dd.MM') : '';
    if (selectedType.includes(formattedDateFrom) || selectedType.includes(formattedDateTo)) {
      if (dateFrom === null && dateTo === null) {
        return 'All Time';
      }
      return selectedType;
    }
    switch (selectedType) {
      case 'currentMonth':
        return 'Current Month';
      case 'pastMonth':
        return 'Past Month';
      case 'allTime':
        return 'All Time';
      default:
        return 'Current Month';
    }
  }, [dateFrom, dateTo, selectedType]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (type: string) => {
    switch (type) {
      case 'currentMonth': {
        const { startDate: startCurrent, endDate: endCurrent } = getCurrentMonthDates();
        setDateFrom(startCurrent);
        setDateTo(endCurrent);
        setSelectedType('currentMonth');
        break;
      }
      case 'pastMonth': {
        const { startDate: startLast, endDate: endLast } = getLastMonthDates();
        setDateFrom(startLast);
        setDateTo(endLast);
        setSelectedType('pastMonth');
        break;
      }
      case 'allTime': {
        setDateFrom(null);
        setDateTo(null);
        setSelectedType('allTime');
        break;
      }
      default:
        break;
    }
  };

  const handleDateChange = (newDateFrom: string | null, newDateTo: string | null) => {
    const formattedDateFrom = newDateFrom ? format(parseISO(newDateFrom), 'dd.MM') : '';
    const formattedDateTo = newDateTo ? format(parseISO(newDateTo), 'dd.MM') : '';
    setDateFrom(newDateFrom);
    setDateTo(newDateTo);

    let newSelectedType = 'allTime';
    if (formattedDateFrom && formattedDateTo) {
      newSelectedType = `${formattedDateFrom} - ${formattedDateTo}`;
    } else if (formattedDateFrom) {
      newSelectedType = `From ${formattedDateFrom}`;
    } else if (formattedDateTo) {
      newSelectedType = `To ${formattedDateTo}`;
    }
    setSelectedType(newSelectedType);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (type: string) => {
    handleChange(type);
    handleClose();
  };

  return (
    <>
      {isMobile && hideInSmallWidth ? (
        <IconButton onClick={handleClick} color={'default'}>
          <CalendarMonthIcon />
        </IconButton>
      ) : (
        <ButtonUi
          var={open ? EButtonType.Secondary : EButtonType.Gray}
          onClick={handleClick}
          endIcon={<CalendarMonthIcon />}
          style={{ justifyContent: 'space-between' }}
        >
          {getLabelUm}
        </ButtonUi>
      )}

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Box sx={styles.container}>
          <Box sx={styles.datePickers}>
            <DatePicker
              slots={{ openPickerIcon: CalendarTodayOutlinedIcon }}
              closeOnSelect
              value={dateFrom ? parseISO(dateFrom) : null}
              onChange={(newValue) =>
                handleDateChange(newValue ? format(newValue, 'yyyy-MM-dd') : null, dateTo)
              }
              disableFuture
              formatDensity="dense"
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () => setDateFrom(null)
                },
                clearButton: { size: 'small' },
                openPickerButton: { size: 'small' },
                openPickerIcon: { fontSize: 'small', sx: {} },

                textField: {
                  variant: 'standard',

                  sx: styles.inputContainer,
                  placeholder: 'Start Date',
                  fullWidth: true
                }
              }}
            />
            <DatePicker
              slots={{ openPickerIcon: CalendarTodayOutlinedIcon }}
              closeOnSelect
              value={dateTo ? parseISO(dateTo) : null}
              onChange={(newValue) =>
                handleDateChange(dateFrom, newValue ? format(newValue, 'yyyy-MM-dd') : null)
              }
              disableFuture
              formatDensity="dense"
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () => {
                    setDateTo(null);
                  }
                },
                clearButton: { size: 'small' },
                openPickerButton: { size: 'small' },
                openPickerIcon: { fontSize: 'small', sx: {} },

                textField: {
                  variant: 'standard',

                  sx: styles.inputContainer,
                  placeholder: 'End Date',
                  fullWidth: true
                }
              }}
            />
          </Box>
          <Divider />

          <MenuList sx={{ p: 0 }}>
            {dateOptions.map((option) => (
              <MenuItem
                key={option.type}
                onClick={() => handleMenuItemClick(option.type)}
                sx={{ py: 1 }}
                disabled={selectedType === option.type}
              >
                <Typography variant="body1" fontWeight={500}>
                  {option.label}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </Menu>
    </>
  );
};

export default DateSelector;
