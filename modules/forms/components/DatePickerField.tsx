import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

import useField, { FieldHookProps } from '../hooks/useField';
import { validateDate } from '../lib/validators';
import FieldWrapper from './FieldWrapper';

const defaultParseDate = (value) => {
  if (value && validateDate.isValid(value)) {
    return new Date(value);
  }
  return null;
};

const DatePickerField = ({
  validators = [],
  className,
  parseDate = defaultParseDate,
  datePickerOptions = {},
  ...props
}: FieldHookProps) => {
  const field = useField({
    validators: [...validators, validateDate],
    ...props,
  });
  const { getDateFormatPattern } = useFormatDateTime();

  return (
    <FieldWrapper {...field} className={props.containerClassName}>
      <DatePicker
        disabled={field.disabled}
        id={field.id}
        name={field.name}
        className={classnames(
          'relative mt-0 block w-full appearance-none rounded-md rounded-b-md border-2 border-slate-200 dark:border-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-200 dark:bg-slate-900 placeholder-slate-400 shadow-sm focus:z-10 focus:border-slate-400 focus:outline-none focus:ring-slate-400',
          className,
          {
            'border-red-300': !!field.error,
          },
        )}
        onChange={(date) => field.setValue(parseDate(date))}
        dateFormat={getDateFormatPattern()}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText={field.placeholder}
        selected={field.value ? new Date(field.value) : null}
        autoComplete="off"
        {...props}
        {...datePickerOptions}
      />
    </FieldWrapper>
  );
};

export default DatePickerField;
