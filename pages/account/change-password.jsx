import { KeyIcon } from '@heroicons/react/solid';

import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { useIntl } from 'react-intl';

import useChangePassword from '../../modules/auth/hooks/useChangePassword';
import MetaTags from '../../modules/common/components/MetaTags';
import Form from '../../modules/forms/components/Form';
import FormErrors from '../../modules/forms/components/FormErrors';
import PasswordField from '../../modules/forms/components/PasswordField';
import SubmitButton from '../../modules/forms/components/SubmitButton';
import useForm from '../../modules/forms/hooks/useForm';

const ChangePassword = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();

  const { changePassword } = useChangePassword();

  const onSubmit = async ({ oldPassword, newPassword }) => {
    const { data } = await changePassword({ oldPassword, newPassword });

    return data?.changePassword;
  };

  const form = useForm({
    submit: onSubmit,
    enableReinitialize: true,
    onSubmitSuccess: () => {
      toast.success(
        formatMessage({
          id: 'password-change-success',
          defaultMessage: 'Password changed successfully.',
        }),
      );

      router.push('/account');
      return true;
    },
    getSubmitErrorMessage: (error) => {
      if (error?.message?.includes('Invalid credentials')) {
        return formatMessage({
          id: 'old_password_not_correct',
          defaultMessage: 'Wrong password, please try again',
        });
      }
      if (error?.message?.includes('Password is not set for account')) {
        return formatMessage({
          id: 'password-not-set-error',
          defaultMessage:
            'Password is not set for account. please assign a password using set password instead',
        });
      }

      return formatMessage(
        {
          id: 'password_change_failed',
          defaultMessage: 'Password change failed, try again later',
        },
        { error: error.message },
      );
    },
    validate: ({ newPassword, oldPassword, confirmPassword }) => {
      if (newPassword === oldPassword) {
        return {
          misMatchError: formatMessage({
            id: 'password_identical',
            defaultMessage:
              'Provided new password identical to previous password',
          }),
        };
      }
      if (confirmPassword && newPassword && newPassword !== confirmPassword) {
        form.formik.setFieldError(
          'confirmPassword',
          formatMessage({
            id: 'password-does-not-match',
            defaultMessage: 'Password does not match',
          }),
        );
        return {
          misMatchError: formatMessage({
            id: 'password-does-not-match',
            defaultMessage: 'Password does not match',
          }),
        };
      }
      return {};
    },
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

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

            <Form form={form} className="mt-10 space-y-4">
              <PasswordField
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
                required
                className="text-sm"
              />
              <PasswordField
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
              <FormErrors displayFieldErrors />
              <SubmitButton
                className="w-full"
                label={formatMessage({
                  id: 'reset_password',
                  defaultMessage: 'Reset password',
                })}
              />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
