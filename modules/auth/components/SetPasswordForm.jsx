import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';
import Button from '../../common/components/Button';
import ErrorMessage from '../../common/components/ErrorMessage';
import TextField from '../../forms/components/TextField';
import useSetPassword from '../hooks/useSetPassword';

const SetPasswordForm = ({ userId }) => {
  const { formatMessage } = useIntl();
  const { setPassword } = useSetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ newPassword }) => {
    try {
      await setPassword({
        newPassword,
        userId,
      });

      toast.success(
        formatMessage({
          id: 'password_success',
          defaultMessage: 'Password changed successfully.',
        }),
      );
    } catch (e) {
      if (e.message?.toLowerCase()?.includes('permission')) {
        setError('submit', {
          type: 'manual',
          message: formatMessage(
            {
              id: 'need-permission-to-set-password',
              defaultMessage:
                "You don't have the necessary permission to set password. Contact system admin",
            },
            { error: e.message },
          ),
        });
      } else {
        setError('submit', {
          type: 'manual',
          message: formatMessage(
            {
              id: 'password_change_failed',
              defaultMessage: 'Password change failed, {error} try again later',
            },
            { error: e.message },
          ),
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        placeholder={formatMessage({
          id: 'new_password',
          defaultMessage: 'New password',
        })}
        label={formatMessage({
          id: 'new_password',
          defaultMessage: 'New password',
        })}
        error={errors.newPassword}
        name="newPassword"
        id="newPassword"
        required
        {...register('newPassword', { required: true })}
      />

      {errors?.submit && <ErrorMessage message={errors?.submit.message} />}
      <div className="mt-6">
        <Button
          type="submit"
          text={formatMessage({
            id: 'set-password',
            defaultMessage: 'Set password',
          })}
        />
      </div>
    </form>
  );
};

export default SetPasswordForm;
