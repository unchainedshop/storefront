import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import toast from 'react-hot-toast';
import useForgotPassword from '../hooks/useForgotPassword';

const ForgotPasswordForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<any, any>();
  const { formatMessage } = useIntl();
  const { forgotPassword } = useForgotPassword();

  const onSubmit = async ({ email }) => {
    try {
      const forgotPasswordResult = await forgotPassword({ email });
      if (forgotPasswordResult.errors?.length)
        throw forgotPasswordResult.errors[0];
      toast.success(
        formatMessage({
          id: 'email_reset_password_instructions_sent',
          defaultMessage: 'An email with reset instructions has been sent',
        }),
      );
      onSuccess?.(
        formatMessage({
          id: 'email_reset_password_instructions_sent',
          defaultMessage: 'An email with reset instructions has been sent',
        }),
      );
    } catch (error: any) {
      setError('root', {
        message: `👷‍♀️ ${formatMessage({
          id: `login_error_${
            error?.extensions?.code?.toLowerCase?.() ?? 'unknown'
          }`,
          defaultMessage: error.message || error.name,
        })}`,
      });
      toast.error(`Login failed, try again`);
    }
  };

  return (
    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {formatMessage({ id: 'email', defaultMessage: 'Email' })}
      </label>
      <div className="mt-1">
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          {...register('email', { required: true })}
          className="block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:bg-slate-600 dark:text-slate-600 sm:text-sm"
        />
        {errors.root?.message && (
          <span className="error-message form-error text-center">
            {errors.root.message}
          </span>
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="inline-flex items-center rounded-md border border-slate-300 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="submit"
        >
          {formatMessage({
            id: 'request_new_password',
            defaultMessage: 'Request new password',
          })}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
