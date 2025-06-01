import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';

export const getLastMonthDates = () => {
  const now = new Date();
  const lastMonth = subMonths(now, 1);
  const startOfLastMonth = startOfMonth(lastMonth);
  const endOfLastMonth = endOfMonth(lastMonth);
  return {
    startDate: format(startOfLastMonth, 'yyyy-MM-dd'),
    endDate: format(endOfLastMonth, 'yyyy-MM-dd')
  };
};
