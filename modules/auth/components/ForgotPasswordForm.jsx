import Link from 'next/link';

import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';

import EmailField from '../../forms/components/EmailField';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import { useFormContext } from '../../forms/lib/useFormWithContext';

import useForgotPassword from '../hooks/useForgotPassword';

const ForgotPasswordForm = () => {
  const { formatMessage } = useIntl();

  const { setError } = useFormContext();

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
      if (e.message?.toLowerCase()?.includes('not found')) {
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
    <Form onSubmit={onSubmit} className="form">
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
        placeholder={formatMessage({
          id: 'email_address',
          defaultMessage: 'Email Address',
        })}
        label={formatMessage({
          id: 'email_address',
          defaultMessage: 'Email Address',
        })}
        required
      />

      <FormErrors />
      <div className="mb-6 mt-6">
        <SubmitButton>
          {formatMessage({
            id: 'send_rest_link',
            defaultMessage: 'Send reset link',
          })}
        </SubmitButton>
      </div>
      <p className="text-center text-sm text-slate-400">
        {formatMessage({
          id: 'dont_have_account',
          defaultMessage: "Don't have an account yet?",
        })}
        <Link
          href="/sign-up"
          className="font-semibold text-slate-500 dark:text-slate-400 focus:text-slate-600 dark:hover:text-slate-300 focus:underline focus:outline-none"
        >
          {formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })}
        </Link>
        .
      </p>
    </Form>
  );
};

export default ForgotPasswordForm;
