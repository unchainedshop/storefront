import classnames from 'classnames';
import React from 'react';

import FieldWrapper from './FieldWrapper';

const TextField = React.forwardRef((props, ref) => {
  return (
    <FieldWrapper {...props}>
      <input
        className={classnames(
          'relative mt-1 block w-full dark:focus:autofill dark:hover:autofill dark:autofill dark:placeholder:text-white dark:bg-slate-900 dark:text-slate-200 appearance-none rounded-md border-2 border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400',
          props.className,
          {
            'border-2 border-color-danger-600 placeholder:text-red-300':
              !!props.error,
          },
        )}
        ref={ref}
        disabled={props.disabled}
        id={props.name}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        type={props.type}
        value={props.value}
      />
    </FieldWrapper>
  );
});

export default TextField;
