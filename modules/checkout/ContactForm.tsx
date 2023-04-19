import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import Button from '../common/components/Button';

const ContactForm = ({ contact, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<any>({
    defaultValues: contact,
  });
  const { formatMessage } = useIntl();

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
          {formatMessage({
            id: 'email-address',
            defaultMessage: 'Email Address',
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
          {formatMessage({
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
        <Button
          text={formatMessage({
            id: 'save_contact',
            defaultMessage: 'Save Contact Data',
          })}
          type="submit"
          className="inline-flex justify-center mt-2 mr-1 rounded-md border border-transparent bg-slate-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        />
        <Button
          text={formatMessage({
            id: 'cancel',
            defaultMessage: 'Cancel',
          })}
          type="button"
          className="inline-flex justify-center mt-2 mr-1 rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium  slate-800 shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
          onClick={onCancel}
        />
      </div>
    </form>
  );
};

export default ContactForm;
