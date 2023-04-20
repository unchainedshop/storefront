import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import Button from '../common/components/Button';
import ErrorMessage from '../common/components/ErrorMessage';

import COUNTRIES from '../common/data/countries-list';
import TextField from '../forms/components/TextField';

const AddressForm = ({ address, onSubmit, onCancel }) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      countryCode: 'CH',
      ...address,
    },
  });
  const { formatMessage } = useIntl();

  const submitHandler = handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (e) {
      setError('root', {
        message: e.message,
      });
    }
  });

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <TextField
          label={formatMessage({
            id: 'first_name',
            defaultMessage: 'First Name',
          })}
          error={errors.firstName}
          {...register('firstName', { required: true })}
        />
      </div>
      <div className="mb-3">
        <TextField
          label={formatMessage({
            id: 'last-name',
            defaultMessage: 'Last Name',
          })}
          error={errors.lastName}
          {...register('lastName', { required: true })}
        />
      </div>
      <div className="mb-3">
        <TextField
          label={`${formatMessage({
            id: 'company-name',
            defaultMessage: 'Company Name',
          })}   ${formatMessage({
            id: 'optional',
            defaultMessage: '(Optional)',
          })}`}
          {...register('company')}
        />
      </div>
      <div className="mb-3">
        <TextField
          label={formatMessage({ id: 'address', defaultMessage: 'Address' })}
          error={errors.addressLine}
          {...register('addressLine', { required: true })}
        />
        <TextField {...register('addressLine2')} />
      </div>
      <div className="mb-3">
        <TextField
          label={formatMessage({
            id: 'postal-code-or-zip',
            defaultMessage: 'Postal Code / ZIP',
          })}
          error={errors.postalCode}
          {...register('postalCode', { required: true })}
        />
      </div>
      <div className="mb-3">
        <TextField
          label={formatMessage({
            id: 'city',
            defaultMessage: 'City',
          })}
          error={errors.city}
          {...register('city', { required: true })}
        />
      </div>
      <div className="mb-3">
        <TextField
          label={`${formatMessage({ id: 'region', defaultMessage: 'Region' })} 
          ${formatMessage({
            id: 'optional',
            defaultMessage: '(Optional)',
          })}`}
          {...register('regionCode')}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {formatMessage({ id: 'country', defaultMessage: 'Country' })}
        </label>
        <select
          className={classNames(
            'mt-1 block w-full appearance-none rounded-md border focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:bg-slate-300 sm:text-sm',
            {
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.countryCode,
              'border-red-300 focus:border-red-500 focus:ring-red-500':
                errors.countryCode,
            },
          )}
          {...register('countryCode', { required: true })}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {' '}
              {c.name}{' '}
            </option>
          ))}
        </select>
      </div>
      {errors.root?.message && <ErrorMessage message={errors.root.message} />}
      <div className="pt-3">
        <div className="pt-3">
          <Button
            text={formatMessage({
              id: 'save_address',
              defaultMessage: 'Save Address',
            })}
            type="submit"
          />
          <Button
            text={formatMessage({
              id: 'cancel',
              defaultMessage: 'Cancel',
            })}
            className=" bg-white sm:text-black text-black hover:bg-slate-200"
            type="button"
            onClick={onCancel}
          />
        </div>
      </div>
    </form>
  );
};

export default AddressForm;
