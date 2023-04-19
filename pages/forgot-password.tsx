import toast from 'react-hot-toast';
import { useIntl } from 'react-intl';
import ForgotPasswordForm from '../modules/auth/components/ForgotPasswordForm';
import useForgotPassword from '../modules/auth/hooks/useForgotPassword';
import ImageWithFallback from '../modules/common/components/ImageWithFallback';
import getLogo from '../modules/common/utils/getLogo';

const ForgotPassword = () => {
  const { forgotPassword } = useForgotPassword();
  const { formatMessage } = useIntl();
  const onSubmitSuccess = (success, { email }) => {
    if (success) {
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
    }
  };
  const onSubmit = async ({ email }) => {
    const { data } = await forgotPassword({ email });
    return data.forgotPassword;
  };
  const logo = getLogo();

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 dark:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <ImageWithFallback
          className="mx-auto"
          src={logo}
          width={160}
          height={100}
          alt={formatMessage({
            id: 'unchained_logo',
            defaultMessage: 'Unchained Logo',
          })}
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
          {formatMessage({
            id: 'forgot-password',
            defaultMessage: 'Forgot your password?',
          })}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-white">
          {formatMessage({
            id: 'forgot-password-description',
            defaultMessage:
              "Enter your email address below and we'll send you an email with a link to reset your password!",
          })}
        </p>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <ForgotPasswordForm
            onSubmit={onSubmit}
            onSubmitSuccess={onSubmitSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = (page) => page;
