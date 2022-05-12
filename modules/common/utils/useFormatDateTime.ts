import { useIntl } from 'react-intl';

const useFormatDateTime = () => {
  const { locale } = useIntl();

  const formatDateTime = (
    date,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  ) => {
    if (!date) return 'N/A';

    return new Intl.DateTimeFormat(locale, options).format(
      new Date(date).getTime(),
    );
  };

  return { formatDateTime };
};

export default useFormatDateTime;
