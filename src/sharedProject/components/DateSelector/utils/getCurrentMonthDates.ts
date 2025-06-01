import { format, startOfMonth } from 'date-fns';

export const getCurrentMonthDates = () => {
  const now = new Date();
  return {
    startDate: format(startOfMonth(now), 'yyyy-MM-dd'),
    endDate: format(now, 'yyyy-MM-dd')
  };
};
