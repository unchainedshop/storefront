import { KeyIcon } from '@heroicons/react/solid';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useIntl } from 'react-intl';

import useChangePassword from '../../modules/auth/hooks/useChangePassword';
import Button from '../../modules/common/components/Button';
import ErrorMessage from '../../modules/common/components/ErrorMessage';
import MetaTags from '../../modules/common/components/MetaTags';
import PasswordField from '../../modules/forms/components/PasswordField';

const ChangePassword = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();

  const { changePassword } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ newPassword, confirmPassword, oldPassword }) => {
    if (confirmPassword && newPassword && newPassword !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: formatMessage({
          id: 'password-does-not-match',
          defaultMessage: 'Password does not match',
        }),
      });
      return;
    }
    if (newPassword === oldPassword) {
      setError('newPassword', {
        type: 'manual',
        message: formatMessage({
          id: 'password_identical',
          defaultMessage:
            'Provided new password identical to previous password',
        }),
      });
      return;
    }

    try {
      await changePassword({ oldPassword, newPassword });
      toast.success(
        formatMessage({
          id: 'password-change-success',
          defaultMessage: 'Password changed successfully.',
        }),
      );
      router.push('/account');
    } catch (error) {
      if (error?.message?.toLowerCase().includes('incorrect credential')) {
        setError('oldPassword', {
          type: 'manual',
          message: formatMessage({
            id: 'old_password_not_correct',
            defaultMessage: 'Wrong password, please try again',
          }),
        });
        return;
      }
      if (
        error?.message
          ?.toLowerCase()
          ?.includes('password is not set for account')
      ) {
        setError('submit', {
          type: 'manual',
          message: formatMessage({
            id: 'password-not-set-error',
            defaultMessage:
              'Password is not set for account. please assign a password using set password instead or contact system admin',
          }),
        });
        return;
      }

      setError('submit', {
        type: 'manual',
        message: formatMessage(
          {
            id: 'password_change_failed',
            defaultMessage: 'Password change failed, try again later',
          },
          { error: error.message },
        ),
      });
    }
  };

  return (
    <>
      <MetaTags
        title={formatMessage({
          id: 'update_password',
          defaultMessage: 'Update Password',
        })}
      />
      <div className="bg-slate-100 dark:bg-slate-600">
        <div className="mx-auto mt-5 w-full p-10 sm:max-w-md md:max-w-lg lg:max-w-xl">
          <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-500">
            <div>
              <KeyIcon className="mx-auto h-24 w-24 text-slate-600 dark:text-white" />
            </div>
            <h1 className="text-center text-6xl font-bold text-slate-600 dark:text-slate-300">
              {formatMessage({
                id: 'change_password',
                defaultMessage: 'Change Password',
              })}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-4">
              <PasswordField
                {...register('oldPassword', {
                  required: true,
                })}
                error={errors.oldPassword}
                label={formatMessage({
                  id: 'current_password',
                  defaultMessage: 'Current password',
                })}
                placeholder={formatMessage({
                  id: 'current_password',
                  defaultMessage: 'Current password',
                })}
                name="oldPassword"
                id="oldPassword"
              />
              <PasswordField
                {...register('newPassword', {
                  required: true,
                })}
                error={errors.newPassword}
                label={formatMessage({
                  id: 'new_password',
                  defaultMessage: 'New password',
                })}
                placeholder={formatMessage({
                  id: 'new_password',
                  defaultMessage: 'New password',
                })}
                name="newPassword"
                id="newPassword"
                required
                className="text-sm"
              />
              <PasswordField
                error={errors.confirmPassword}
                {...register('confirmPassword', {
                  required: true,
                })}
                label={formatMessage({
                  id: 'confirm-password',
                  defaultMessage: 'Confirm password',
                })}
                placeholder={formatMessage({
                  id: 'confirm-password',
                  defaultMessage: 'Confirm password',
                })}
                name="confirmPassword"
                id="confirmPassword"
                required
                className="text-sm"
              />
              {errors.submit && (
                <ErrorMessage message={errors.submit.message} />
              )}
              <Button
                type="submit"
                className="w-full"
                text={formatMessage({
                  id: 'reset_password',
                  defaultMessage: 'Reset password',
                })}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
