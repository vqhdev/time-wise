import { DateTime } from 'luxon';
import { DateTimeFormats } from '@/types/datetime-formats.ts';

export function parseDateTime(
  value: string,
  fromDate: DateTimeFormats,
  fmt?: string,
): DateTime | null {
  let dateTime: DateTime | null = null;
  switch (fromDate) {
    case 'milliseconds':
      dateTime = DateTime.fromMillis(parseInt(value, 10));
      break;
    case 'seconds':
      dateTime = DateTime.fromSeconds(parseInt(value, 10));
      break;
    case 'iso':
      dateTime = DateTime.fromISO(value);
      break;
    case 'http':
      dateTime = DateTime.fromHTTP(value);
      break;
    case 'rfc2822':
      dateTime = DateTime.fromRFC2822(value);
      break;
    case 'sql':
      dateTime = DateTime.fromSQL(value);
      break;
    case 'custom':
      dateTime = DateTime.fromFormat(value, fmt ?? '');
      break;
  }
  if (dateTime?.invalidReason) {
    return null;
  }
  return dateTime;
}
