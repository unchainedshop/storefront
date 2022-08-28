import classNames from 'classnames';
import { useIntl } from 'react-intl';
import COUNTRIES from '../data/countries-list';

const EditableField = ({
  register,
  name,
  value,
  type = 'text',
  validator = false,
  errors,
}) => {
  const { formatMessage } = useIntl();
  if (type === 'country') {
    return (
      <select
        className={classNames(
          'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:ring-slate-900 dark:bg-slate-300 dark:text-slate-800 dark:shadow-white sm:text-sm',
          {
            'border-red-300 focus:border-red-600 focus:outline-none focus:ring-red-600':
              errors?.[name]?.message,
          },
        )}
        name={name}
        defaultValue={value}
        ref={register(validator)}
      >
        <option value="">
          {formatMessage({
            id: 'please_select',
            defaultMessage: 'Please select...',
          })}
        </option>
        {COUNTRIES.map((c) => (
          <option value={c.code} key={c.code}>
            {c.name}
          </option>
        ))}
      </select>
    );
  }
  return (
    <input
      className={classNames(
        'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:ring-slate-900 dark:bg-slate-300 dark:text-slate-800 dark:shadow-white sm:text-sm',
        {
          'border-red-300 focus:border-red-600 focus:outline-none focus:ring-red-600':
            errors?.[name]?.message,
        },
      )}
      type={type}
      name={name}
      defaultValue={value}
      ref={register(validator)}
    />
  );
};

export default EditableField;
