import classNames from 'classnames';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';

import Button from '../../common/components/Button';
import ErrorMessage from '../../common/components/ErrorMessage';
import useForgotPassword from '../hooks/useForgotPassword';

const ForgotPasswordForm = () => {
  const { formatMessage } = useIntl();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { forgotPassword } = useForgotPassword();

  const onSubmit = async ({ email }) => {
    try {
      await forgotPassword({ email });
      toast.success(
        formatMessage(
          {
            id: 'reset_link_sent',
            defaultMessage: 'Password reset link sent to {email} ',
          },
          {
            email,
          },
        ),
      );
    } catch (e) {
      if (e.message?.toLowerCase()?.includes('user not found')) {
        setError('email', {
          type: 'manual',
          message: formatMessage({
            id: 'email_address_not_exist',
            defaultMessage: 'Provided email does not exist',
          }),
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <p className="py-4">
        {formatMessage({
          id: 'forgot_password_header_description',
          defaultMessage:
            "Enter your email address below and we'll send you a link to reset your password!",
        })}
      </p>
      <div className="form-row">
        <div className={`mb-3 col-md-6 ${errors.email ? 'text-red-500' : ''}`}>
          <label className="form-label">
            {formatMessage({
              id: 'email',
              defaultMessage: 'Email',
            })}
          </label>
          <input
            className={classNames(
              'relative mt-1 block w-full dark:focus:autofill dark:hover:autofill dark:autofill  dark:placeholder:text-white dark:bg-slate-900 dark:text-slate-200 appearance-none rounded-md border-2 border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400',

              {
                'border-2 border-color-danger-600  placeholder:text-red-500':
                  !!errors?.email,
              },
            )}
            name="email"
            id="email-address"
            type="email"
            defaultValue=""
            label={formatMessage({
              id: 'email_address',
              defaultMessage: 'Email Address',
            })}
            placeholder={formatMessage({
              id: 'email_address',
              defaultMessage: 'Email Address',
            })}
            {...register('email', { required: true })}
          />
        </div>
      </div>
      {errors?.email && <ErrorMessage message={errors.email?.message} />}
      <div className="mb-6 mt-6">
        <Button
          disabled={Object.keys(errors).length}
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-slate-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
          text={formatMessage({
            id: 'send_rest_link',
            defaultMessage: 'Send reset link',
          })}
        />
      </div>
      <p className="text-center text-sm text-slate-400">
        {formatMessage({
          id: 'dont_have_account',
          defaultMessage: "Don't have an account yet?",
        })}
        {'  '}
        <Link
          href="/sign-up"
          className="font-semibold text-slate-500 dark:text-slate-400 focus:text-slate-600 dark:hover:text-slate-300 focus:underline focus:outline-none"
        >
          {formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })}
        </Link>
        .
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
