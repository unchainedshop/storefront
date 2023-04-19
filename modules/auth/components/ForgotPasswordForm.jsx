import Link from 'next/link';
import { useIntl } from 'react-intl';

import EmailField from '../../forms/components/EmailField';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';

const ForgotPasswordForm = ({ onSubmit, onSubmitSuccess = () => true }) => {
  const { formatMessage } = useIntl();

  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    getSubmitErrorMessage: async () => {
      form.formik.setFieldError(
        'email',
        formatMessage({
          id: 'email_address_not_exist',
          defaultMessage: 'Provided email does not exist',
        }),
      );
    },
    initialValues: {
      email: '',
    },
  });
  return (
    <Form
      form={form}
      className="mt-8 space-y-6 px-4 pt-3 pb-8 shadow sm:rounded-lg sm:px-10"
    >
      <div>
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
          label={formatMessage({
            id: 'email_address',
            defaultMessage: 'Email Address',
          })}
          placeholder={formatMessage({
            id: 'email_address',
            defaultMessage: 'Email Address',
          })}
          required
        />
      </div>
      <FormErrors />
      <div className="mb-6">
        <SubmitButton
          className="w-full "
          label={formatMessage({
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
    </Form>
  );
};

export default ForgotPasswordForm;
