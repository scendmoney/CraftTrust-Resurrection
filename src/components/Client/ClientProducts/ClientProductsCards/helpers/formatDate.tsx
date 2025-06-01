import { format, parseISO } from 'date-fns';
export const formatDate = (harvestDate: string) => {
  const date = parseISO(harvestDate);
  const formattedDate = format(date, 'MMMM do, yyyy');
  return formattedDate;
};
