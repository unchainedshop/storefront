import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import PasswordField from '../../forms/components/PasswordField';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';
import useSetPassword from '../hooks/useSetPassword';

const SetPasswordForm = ({ userId }) => {
  const { formatMessage } = useIntl();
  const { setPassword } = useSetPassword();
  const onSubmit = async ({ newPassword }) => {
    const { data } = await setPassword({
      newPassword,
      userId,
    });

    return data?.setPassword;
  };

  const form = useForm({
    submit: onSubmit,
    enableReinitialize: true,
    onSubmitSuccess: () => {
      toast.success(
        formatMessage({
          id: 'password_success',
          defaultMessage: 'Password changed successfully.',
        }),
      );
    },
    getSubmitErrorMessage: (error) => {
      return formatMessage(
        {
          id: 'password_change_failed',
          defaultMessage: 'Password change failed, try again later',
        },
        { error: error.message },
      );
    },
    initialValues: {
      newPassword: '',
    },
  });

  return (
    <Form form={form}>
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
      <FormErrors />
      <div className="mt-6">
        <SubmitButton
          label={formatMessage({
            id: 'set-password',
            defaultMessage: 'Set password',
          })}
          className="w-full"
        />
      </div>
    </Form>
  );
};

export default SetPasswordForm;
