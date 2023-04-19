import { zonedTimeToUtc } from 'date-fns-tz';

const useFormatDateTime = () => {
  const formatDateTime = (date, options: Intl.DateTimeFormatOptions = {}) => {
    if (!date) return 'n/a';
    try {
      return Intl.DateTimeFormat(navigator.language || 'de-ch', options).format(
        new Date(date).getTime(),
      );
    } catch {
      return Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(date).getTime());
    }
  };

  const getDateFormatPattern = () => {
    const getPatternForPart = (part) => {
      switch (part.type) {
        case 'day':
          return 'd'.repeat(part.value.length);
        case 'month':
          return 'M'.repeat(part.value.length);
        case 'year':
          return 'y'.repeat(part.value.length);
        case 'literal':
          return part.value;
        default:
          return 'dd.mm.yyyy';
      }
    };

    return new Intl.DateTimeFormat(navigator.language || 'de-ch')
      .formatToParts(new Date())
      .map(getPatternForPart)
      .join('');
  };

  const parseDate = (value) => {
    return zonedTimeToUtc(
      value,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
  };

  return { formatDateTime, getDateFormatPattern, parseDate };
};

export default useFormatDateTime;
