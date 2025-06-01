import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

function formatDateTimeDateFns(dateString: string | undefined | null, showTime = false): string {
  if (!dateString) {
    return '--';
  }
  const date = parseISO(dateString);
  const localDate = utcToZonedTime(date, Intl.DateTimeFormat().resolvedOptions().timeZone);

  const formatString = showTime ? 'MM.dd.yyyy HH:mm:ss' : 'MM.dd.yyyy';

  return format(localDate, formatString);
}

export default formatDateTimeDateFns;
