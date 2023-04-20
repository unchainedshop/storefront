import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';
import Button from '../../common/components/Button';
import ErrorMessage from '../../common/components/ErrorMessage';
import PasswordField from '../../forms/components/PasswordField';

import useResetPassword from '../hooks/useResetPassword';

const ResetPasswordForm = ({ token }) => {
  const { formatMessage } = useIntl();
  const { resetPassword } = useResetPassword();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        {...register('newPassword', {
          required: true,
        })}
        error={errors?.newPassword}
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
      />

      <PasswordField
        {...register('confirmPassword', {
          required: true,
        })}
        name="confirmPassword"
        error={errors?.confirmPassword}
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
        {errors.submit && <ErrorMessage message={errors.submit.message} />}
      </div>
      <Button
        type="submit"
        text={formatMessage({
          id: 'rest_password',
          defaultMessage: 'Reset password',
        })}
        className="w-full"
      />
    </form>
  );
};

export default ResetPasswordForm;
