import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import COUNTRIES from '../common/data/countries-list';

const AddressForm = ({ address, onSubmit, onCancel }) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      countryCode: 'CH',
      ...address,
    },
  });
  const intl = useIntl();

  const submitHandler = handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (e: any) {
      setError('root', {
        message: e.message as string,
      });
    }
  });

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {intl.formatMessage({
            id: 'first_name',
            defaultMessage: 'Firstname',
          })}
        </label>

        <input
          className={classNames(
            'mt-1 block w-full appearance-none rounded-md border focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:bg-slate-300 sm:text-sm',
            {
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.firstName,
              'border-red-300 focus:border-red-500 focus:ring-red-500':
                errors.firstName,
            },
          )}
          {...register('firstName', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {intl.formatMessage({
            id: 'last_name',
            defaultMessage: 'Lastname',
          })}
        </label>
        <input
          className={classNames(
            'mt-1 block w-full appearance-none rounded-md border focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:bg-slate-300 sm:text-sm',
            {
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.lastName,
              'border-red-300 focus:border-red-500 focus:ring-red-500':
                errors.lastName,
            },
          )}
          {...register('lastName', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {intl.formatMessage({
            id: 'company',
            defaultMessage: 'Company Name',
          })}{' '}
          {intl.formatMessage({
            id: 'optional',
            defaultMessage: '(Optional)',
          })}
        </label>
        <input
          className={classNames(
            'mt-1 block w-full appearance-none rounded-md border focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:bg-slate-300 sm:text-sm',
            {
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.company,
              'border-red-300 focus:border-red-500 focus:ring-red-500':
                errors.company,
            },
          )}
          {...register('company')}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {intl.formatMessage({ id: 'address', defaultMessage: 'Address' })}
        </label>
        <input
          className={classNames(
            'mt-1 block w-full appearance-none rounded-md border focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:bg-slate-300 sm:text-sm',
            {
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.addressLine,
              'border-red-300 focus:border-red-500 focus:ring-red-500':
                errors.addressLine,
            },
          )}
          {...register('addressLine', { required: true })}
        />
        <input
          className={classNames(
            'mt-1 block w-full appearance-none rounded-md border focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:bg-slate-300 sm:text-sm',
            {
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.addressLine2,
              'border-red-300 focus:border-red-500 focus:ring-red-500':
                errors.addressLine2,
            },
          )}
          {...register('addressLine2', { required: false })}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {intl.formatMessage({
            id: 'postal_code',
            defaultMessage: 'Postal Code / ZIP',
          })}
        </label>
        <input
          className={classNames(
            'mt-1 block w-full appearance-none rounded-md border focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:bg-slate-300 sm:text-sm',
            {
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.postalCode,
              'border-red-300 focus:border-red-500 focus:ring-red-500':
                errors.postalCode,
            },
          )}
          {...register('postalCode', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          City
        </label>
        <input
          className={classNames(
            'mt-1 block w-full appearance-none rounded-md border focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:bg-slate-300 sm:text-sm',
            {
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.city,
              'border-red-300 focus:border-red-500 focus:ring-red-500':
                errors.city,
            },
          )}
          {...register('city', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {intl.formatMessage({ id: 'region', defaultMessage: 'Region' })}{' '}
          {'  '}{' '}
          {intl.formatMessage({
            id: 'optional',
            defaultMessage: '(Optional)',
          })}
        </label>
        <input
          className={classNames(
            'mt-1 block w-full appearance-none rounded-md border focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:bg-slate-300 sm:text-sm',
            {
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.regionCode,
              'border-red-300 focus:border-red-500 focus:ring-red-500':
                errors.regionCode,
            },
          )}
          {...register('regionCode', { required: false })}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {intl.formatMessage({ id: 'country', defaultMessage: 'Country' })}
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
      {errors.root?.message && (
        <div className="text-red-600">{errors.root.message as string}</div>
      )}
      <div className="pt-3">
        <input
          type="submit"
          className="mr-1 rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-slate-50"
          value={intl.formatMessage({
            id: 'save_address',
            defaultMessage: 'Save Address',
          })}
        />
        <input
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2"
          value={intl.formatMessage({
            id: 'cancel',
            defaultMessage: 'Cancel',
          })}
          onClick={onCancel}
        />
      </div>
    </form>
  );
};

export default AddressForm;
