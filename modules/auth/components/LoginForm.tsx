import classNames from 'classnames';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import LoadingItem from '../../common/components/LoadingItem';

import useLoginWithPassword from '../hooks/useLoginWithPassword';
import useUser from '../hooks/useUser';

const LoginForm = ({ onLogin = null }) => {
  const { register, handleSubmit, errors, setError } = useForm();
  const { formatMessage } = useIntl();
  const { loginWithPassword, error } = useLoginWithPassword();
  const hasErrors = Object.keys(errors).length > 0;
  const { loading } = useUser();

  useEffect(() => {
    if (error?.message?.includes('Invalid credentials')) {
      setError('email', {
        type: 'manual',
        message: `👷‍♀️ ${formatMessage({
          id: 'invalid_email_password',
          defaultMessage: 'Invalid password',
        })}`,
      });
    }
  }, [error]);

  const onSubmit = async ({ email, password }) => {
    try {
      await loginWithPassword({ email, password });
      onLogin?.();
      toast.success('Login is successfully');
    } catch (err) {
      toast.error(`Login failed with ${err}`);
    }
  };

  if (loading) {
    <LoadingItem />;
  }

  return (
    <>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow dark:bg-slate-500 sm:rounded-lg sm:px-10">
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
                    'block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm',
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
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  ref={register({ required: true })}
                  className={classNames(
                    'block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm',
                    {
                      'border-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500':
                        errors.password,
                    },
                  )}
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
              ? Object.values(errors).map((err) => (
                  <div key={err.message} className="text-red-600">
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
