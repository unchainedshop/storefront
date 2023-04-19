/* eslint-disable no-undef */
import classnames from 'classnames';

import useField, { FieldHookProps } from '../hooks/useField';
import FieldWrapper from './FieldWrapper';

export interface SelectFieldOptions {
  [key: string]: string | JSX.Element;
}

interface SelectFieldProps extends FieldHookProps {
  options: SelectFieldOptions;
}

const SelectField = (props: SelectFieldProps) => {
  const { options, ...field } = useField(props);
  const { className } = props || { className: '' };

  return (
    <FieldWrapper {...field}>
      <div className="select-wrap">
        <select
          className={classnames(
            'mt-1 block w-full dark:bg-slate-900 rounded-md border-1 border-slate-200 dark:text-white dark:border-slate-700 py-2.5 pl-3 pr-10 text-base text-black-400 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-slate-400 sm:text-sm',
            className,
            {
              'border-red-300 text-red-600': !!field.error,
            },
          )}
          disabled={field.disabled}
          id={field.name}
          name={field.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
        >
          {(!!field.placeholder || !field.required) && (
            <option
              className="dark:text-slate-200"
              value=""
              disabled={field.required}
              hidden={field.required}
            >
              {field.placeholder || field.label}
            </option>
          )}
          {Object.entries(options).map(([value, display]: any) => (
            <option className="dark:text-slate-200" key={value} value={value}>
              {display}
            </option>
          ))}
        </select>
      </div>
    </FieldWrapper>
  );
};

export default SelectField;
