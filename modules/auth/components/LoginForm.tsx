import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import LoadingItem from '../../common/components/LoadingItem';
import PasswordVisible from '../../common/components/PasswordVisible';

import useLoginWithPassword from '../hooks/useLoginWithPassword';
import useUser from '../hooks/useUser';
import { storeLoginToken } from '../utils/store';

const LoginForm = ({ onLogin = null }) => {
  const { register, handleSubmit, errors, setError } = useForm();
  const { formatMessage } = useIntl();
  const { logInWithPassword, error } = useLoginWithPassword();
  const hasErrors = Object.keys(errors).length > 0;
  const { loading } = useUser();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (error?.message?.includes('Invalid credentials')) {
      setError('account', {
        type: 'manual',
        message: `👷‍♀️ ${formatMessage({
          id: 'invalid_credentials',
          defaultMessage: 'Invalid credentials',
        })}`,
      });
    }
  }, [error]);

  const onSubmit = async ({ email, password }) => {
    try {
      const { data } = await logInWithPassword({
        email,
        password,
      });

      const { id, token, tokenExpires } = data?.loginWithPassword || {};

      await storeLoginToken(id, token, new Date(tokenExpires));
      onLogin?.();
      toast.success('Login is successfully');
    } catch (err) {
      toast.error(`Login failed, try again`);
    }
  };

  if (loading) {
    <LoadingItem />;
  }

  return (
    <>
      <div className="mt-8 sm:mx-auto sm:max-w-md">
        <div className="py-8 px-4 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {formatMessage({ id: 'email', defaultMessage: 'Email' })}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={register({ required: true })}
                  className={classNames(
                    'block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-slate-900 dark:bg-slate-300 sm:text-sm',
                    {
                      'border-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500':
                        errors.email,
                    },
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">
                    {formatMessage({
                      id: 'error_email',
                      defaultMessage: 'Email is required',
                    })}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {formatMessage({ id: 'password', defaultMessage: 'Password' })}
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  autoComplete="current-password"
                  ref={register({ required: true })}
                  className={classNames(
                    'block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-slate-900 dark:bg-slate-300 sm:text-sm',
                    {
                      'border-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500':
                        errors.password,
                    },
                  )}
                />
                <PasswordVisible
                  isPasswordVisible={isPasswordVisible}
                  setIsPasswordVisible={setIsPasswordVisible}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {formatMessage({
                      id: 'error_password',
                      defaultMessage: 'Password is required',
                    })}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link href="/account/forget-password">
                  <a className="font-medium text-slate-600 hover:text-slate-500 dark:text-slate-300 dark:hover:text-slate-400">
                    {formatMessage({
                      id: 'forgot_password',
                      defaultMessage: 'Forgot your password?',
                    })}
                  </a>
                </Link>
              </div>
            </div>

            {hasErrors
              ? Object.values(errors).map((err, key) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={`${err.message}${key}`} className="text-red-600">
                    {err.message}
                  </div>
                ))
              : ''}

            {error?.message?.includes('Navision auth failed') && (
              <div className="my-2 rounded bg-red-300 p-1 text-red-600">
                {error.message}
                {formatMessage({
                  id: 'error',
                  defaultMessage: ', Try again later',
                })}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-slate-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                {formatMessage({ id: 'sign_in', defaultMessage: 'Sign in' })}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
