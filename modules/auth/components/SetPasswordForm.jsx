import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import { useFormContext } from '../../forms/lib/useFormWithContext';
import useSetPassword from '../hooks/useSetPassword';

const SetPasswordForm = ({ userId }) => {
  const { formatMessage } = useIntl();
  const { setPassword } = useSetPassword();

  const { setError } = useFormContext();

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
    <Form onSubmit={onSubmit}>
      <TextField
        placeholder={formatMessage({
          id: 'new_password',
          defaultMessage: 'New password',
        })}
        label={formatMessage({
          id: 'new_password',
          defaultMessage: 'New password',
        })}
        name="newPassword"
        id="newPassword"
        required
      />

      <FormErrors />
      <div className="mt-6">
        <SubmitButton>
          {formatMessage({
            id: 'set-password',
            defaultMessage: 'Set password',
          })}
        </SubmitButton>
      </div>
    </Form>
  );
};

export default SetPasswordForm;
