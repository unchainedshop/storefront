import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

const ContactForm = ({ contact, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<any>({
    defaultValues: contact,
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
    <form className="form" onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {intl.formatMessage({
            id: 'email',
            defaultMessage: 'E-Mail Address',
          })}
        </label>

        <input
          type="email"
          className={classNames(
            'mt-1 block w-full appearance-none rounded-md border focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:bg-slate-300 sm:text-sm',
            {
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.emailAddress,
              'border-red-300 focus:border-red-500 focus:ring-red-500':
                errors.emailAddress,
            },
          )}
          {...register('emailAddress', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {intl.formatMessage({
            id: 'telNumber',
            defaultMessage: 'Mobile Phone',
          })}
        </label>
        <input
          type="tel"
          className={classNames(
            'mt-1 block w-full appearance-none rounded-md border focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm dark:bg-slate-300 sm:text-sm',
            {
              'border-slate-300 focus:border-slate-900 focus:ring-slate-900':
                !errors.telNumber,
              'border-red-300 focus:border-red-500 focus:ring-red-500':
                errors.telNumber,
            },
          )}
          {...register('telNumber', { required: true })}
        />
      </div>
      {errors.root?.message && (
        <div className="text-red-600">{errors.root.message as string}</div>
      )}
      <div className="pt-3">
        <input
          type="submit"
          className="mr-1 rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-stone-50"
          value={intl.formatMessage({
            id: 'save_contact',
            defaultMessage: 'Save Contact Data',
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

export default ContactForm;
