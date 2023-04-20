import classNames from 'classnames';

import useField, { FieldHookProps } from '../hooks/useField';

interface ChoicesFieldProps extends FieldHookProps {
  multiple?: boolean;
  choiceClassName?: string;
  choiceContainerClassName?: string;
  labelClassName?: string;
}

const ChoicesField = ({ multiple, options, ...props }: ChoicesFieldProps) => {
  const field = useField({ multiple, options, ...props });
  const {
    choiceClassName,
    choiceContainerClassName,
    labelClassName,
    inputClassName,
  } = props;

  const mappableValue =
    typeof field.value === 'string' ? [field.value] : field.value;
  const { className, hideLabel } = props;
  return (
    <div
      className={classNames('container', className, {
        'is-invalid': !!field.error,
        disabled: field.disabled,
        required: field.required,
      })}
    >
      <label
        className={classNames('text-sm', className, {
          'text-red-600': !!field.error,
          'sr-only': hideLabel,
        })}
      >
        {field.label}
      </label>

      <div className={classNames(`row ${choiceContainerClassName}`, className)}>
        {Object.entries(field.options).map(([value, display]: any) => (
          <div
            className={classNames(`mb-3 ${choiceClassName}`, className)}
            key={value}
          >
            <label
              htmlFor={`${field.name}-${value}`}
              className={classNames('', labelClassName)}
            >
              <input
                value={value}
                checked={mappableValue.includes(value)}
                className={classNames(
                  'mr-2 h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-400',
                  inputClassName,
                )}
                disabled={field.disabled}
                id={`${field.name}-${value}`}
                name={field.name}
                onChange={field.onChange}
                type={field.multiple ? 'checkbox' : 'radio'}
              />
              <span>{display}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

ChoicesField.defaultProps = {
  multiple: false,
  choiceClassName: 'col-md-6 col-lg-4',
  choiceContainerClassName: '',
  labelClassName: '',
};

export default ChoicesField;
