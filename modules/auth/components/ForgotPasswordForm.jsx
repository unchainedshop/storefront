import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';

import Button from '../../common/components/Button';
import ErrorMessage from '../../common/components/ErrorMessage';
import EmailField from '../../forms/components/EmailField';

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

      <EmailField
        name="email"
        id="email-address"
        type="email"
        error={errors?.email}
        placeholder={formatMessage({
          id: 'email_address',
          defaultMessage: 'Email Address',
        })}
        label={formatMessage({
          id: 'email_address',
          defaultMessage: 'Email Address',
        })}
        {...register('email', { required: true })}
      />

      {errors?.submit && <ErrorMessage message={errors.submit?.message} />}
      <div className="mb-6 mt-6">
        <Button
          disabled={Object.keys(errors).length}
          type="submit"
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
