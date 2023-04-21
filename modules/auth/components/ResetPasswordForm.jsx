import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import PasswordField from '../../forms/components/PasswordField';
import SubmitButton from '../../forms/components/SubmitButton';
import { useFormContext } from '../../forms/lib/useFormWithContext';

import useResetPassword from '../hooks/useResetPassword';

const ResetPasswordForm = ({ token }) => {
  const { formatMessage } = useIntl();
  const { resetPassword } = useResetPassword();
  const router = useRouter();

  const { setError } = useFormContext();

  const onSubmit = async ({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }
    try {
      await resetPassword({ newPassword, token });
      toast.success(
        formatMessage({
          id: 'password_changed_success',
          defaultMessage: 'Password changed successfully.',
        }),
      );
      router.push('/');
    } catch (e) {
      if (e?.message?.toLowerCase().includes('expired')) {
        setError('submit', {
          type: 'manual',
          message: formatMessage({
            id: 'reset_token_expired',
            defaultMessage: 'Token link invalid or has expired',
          }),
        });
      }
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <PasswordField
        name="newPassword"
        id="new-password"
        placeholder={formatMessage({
          id: 'new_password',
          defaultMessage: 'New password',
        })}
        label={formatMessage({
          id: 'new_password',
          defaultMessage: 'New password',
        })}
        required
      />

      <PasswordField
        required
        name="confirmPassword"
        id="confirm-password"
        placeholder={formatMessage({
          id: 'confirm_password',
          defaultMessage: 'Confirm password',
        })}
        label={formatMessage({
          id: 'confirm_password',
          defaultMessage: 'Confirm password',
        })}
      />

      <div className="mt-2 mb-2 ">
        <FormErrors />
      </div>
      <SubmitButton className="w-full">
        {formatMessage({
          id: 'rest_password',
          defaultMessage: 'Reset password',
        })}
      </SubmitButton>
    </Form>
  );
};

export default ResetPasswordForm;
