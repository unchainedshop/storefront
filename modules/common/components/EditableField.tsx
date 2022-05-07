import { useIntl } from 'react-intl';
import COUNTRIES from '../data/countries-list';

const EditableField = ({
  register,
  name,
  value,
  type = 'text',
  required = false,
}) => {
  const { formatMessage } = useIntl();
  if (type === 'country') {
    return (
      <select
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        name={name}
        defaultValue={value}
        ref={register({ required })}
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
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      type={type}
      name={name}
      defaultValue={value}
      ref={register({ required })}
    />
  );
};

export default EditableField;
