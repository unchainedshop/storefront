import { useIntl } from 'react-intl';
import Link from 'next/link';
import Image from 'next/legacy/image';
import getConfig from 'next/config';
import LoginForm from '../modules/auth/components/LoginForm';
import MetaTags from '../modules/common/components/MetaTags';
import useRedirect from '../modules/auth/hooks/useRedirect';
import defaultNextImageLoader from '../modules/common/utils/defaultNextImageLoader';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const LogIn = () => {
  const { formatMessage } = useIntl();
  useRedirect({ to: '/account', matchUsers: true });

  return (
    <>
      <MetaTags
        title={formatMessage({ id: 'log_in', defaultMessage: 'Log In' })}
      />
      <div className="w-full py-12">
        <div className="rounded-md border-2 bg-white pt-8 shadow-md dark:bg-slate-600 sm:mx-auto sm:max-w-2xl">
          <div className="sm:mx-auto sm:max-w-md">
            <div className="relative mx-auto h-10 w-36 rounded">
              <Image
                src={theme.assets.logo}
                alt={formatMessage({
                  id: 'shop_logo_login',
                  defaultMessage: 'Shop logo',
                })}
                layout="fill"
                placeholder="blur"
                blurDataURL="/placeholder.png"
                className="rounded"
                loader={defaultNextImageLoader}
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {formatMessage({
                id: 'sign_in',
                defaultMessage: 'Sign in',
              })}
            </h2>
          </div>

          <LoginForm>
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-slate-600 hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-400"
                >
                  {formatMessage({
                    id: 'forgot_password',
                    defaultMessage: 'Forgot your password?',
                  })}
                </Link>
              </div>
            </div>
          </LoginForm>
        </div>
      </div>
    </>
  );
};

export default LogIn;
