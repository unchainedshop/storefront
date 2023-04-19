import classNames from 'classnames';

import useField, { CommonFieldProps } from '../hooks/useField';

const CheckboxField = (props: CommonFieldProps) => {
  const {
    disabled,
    labelClassName,
    containerClassName,
    inputClassName,
    hideLabel,
    errorMessage,
    ...checkboxProps
  } = props;
  const field = useField({ ...props, type: 'checkbox' });
  return (
    <div
      className={classNames(
        '',
        {
          'text-red-600': !!field.error,
          checkbox: true,
          disabled: field.disabled,
          required: field.required,
        },
        containerClassName,
      )}
    >
      <input
        checked={!!field.value}
        disabled={disabled}
        id={field.name}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        type="checkbox"
        className={
          (classNames(
            'h-4 w-4 rounded-sm border-slate-300 text-slate-600 focus:ring-slate-400',
          ),
          inputClassName)
        }
        {...checkboxProps}
      />
      <label
        htmlFor={field.name}
        className={classNames(
          'text-sm text-slate-900 dark:text-slate-200',
          labelClassName,
          {
            'text-danger': !!field.error,
          },
        )}
      >
        {field.label}
      </label>
    </div>
  );
};

export default CheckboxField;
