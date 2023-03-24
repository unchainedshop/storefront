import { useIntl } from 'react-intl';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import MetaTags from '../modules/common/components/MetaTags';
import ForgotPasswordForm from '../modules/auth/components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const onSuccess = async () => {
    router.push({ pathname: 'login' });
  };

  return (
    <>
      <MetaTags
        title={formatMessage({
          id: 'forgot_password',
          defaultMessage: 'Forgot your password?',
        })}
      />
      <div className="px-4 sm:px-0">
        <div className="mx-auto mt-10 w-full rounded-md bg-white p-6 dark:bg-slate-500 sm:max-w-md md:max-w-lg lg:max-w-xl">
          <div className="mx-auto">
            <div>
              <LockClosedIcon className="mx-auto h-24 w-24 text-slate-900" />
            </div>
            <h1 className="text-center text-6xl font-bold text-slate-900 dark:text-slate-300">
              {formatMessage({
                id: 'forgot_password',
                defaultMessage: 'Forgot your password?',
              })}
            </h1>
            <p className="mt-4 text-center text-lg font-medium text-slate-600 dark:text-slate-400">
              {formatMessage({
                id: 'forget_message',
                defaultMessage: 'Enter your email address',
              })}
            </p>
            <ForgotPasswordForm onSuccess={onSuccess} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
