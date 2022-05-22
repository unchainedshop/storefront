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
          'block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-300 dark:text-slate-800 dark:shadow-white sm:text-sm',
          {
            'border-red-300 focus:border-red-300 focus:outline-none focus:ring-red-500':
              errors[name],
          },
        )}
        name={name}
        defaultValue={value}
        ref={register(validator)}
      >
        <option value="">{formatMessage({ id: 'please_select' })}</option>
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
        'block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-300 dark:text-slate-800 dark:shadow-white sm:text-sm',
        {
          'border-red-300 focus:border-red-300 focus:outline-none focus:ring-red-500':
            errors[name],
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
