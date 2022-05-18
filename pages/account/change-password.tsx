import { KeyIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import useChangePassword from '../../modules/auth/hooks/useChangePassword';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';

const ChangePassword = () => {
  const { register, handleSubmit, errors, watch, setError } = useForm();
  const { formatMessage } = useIntl();
  const router = useRouter();
  const password = useRef({});
  password.current = watch('newPassword', '');
  const { changePassword, loading, error } = useChangePassword();

  const onSubmit = async ({ newPassword, oldPassword }) => {
    try {
      await changePassword({ newPassword, oldPassword });
      router.push('/account');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    if (error?.message?.includes('Invalid credentials')) {
      setError('oldPassword', {
        type: 'manual',
        message: formatMessage({ id: 'old_password_not_correct' }),
      });
    }
  }, [error]);

  return (
    <>
      <MetaTags
        title={formatMessage({
          id: 'update_password',
          defaultMessage: 'Update Password',
        })}
      />
      <Header />
      <div className="bg-slate-100 dark:bg-slate-600">
        {loading ? (
          <LoadingItem />
        ) : (
          <div className="mx-auto mt-5 w-full p-10 sm:max-w-md md:max-w-lg lg:max-w-xl">
            <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-500">
              <div>
                <KeyIcon className="mx-auto h-24 w-24 text-fuchsia-600" />
              </div>
              <h1 className="text-center text-6xl font-bold text-slate-600 dark:text-slate-300">
                {formatMessage({ id: 'change_password' })}
              </h1>

              <form
                className="mt-10 space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className={classNames({ 'form-error': errors.password2 })}>
                  <label
                    htmlFor="oldPassword"
                    className={classNames(
                      'block text-sm font-medium text-slate-700 dark:text-slate-300',
                      {
                        'form-error': errors.oldPassword,
                      },
                    )}
                  >
                    {formatMessage({ id: 'current_password' })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      id="oldPassword"
                      name="oldPassword"
                      ref={register({ required: true })}
                      className="block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm"
                    />
                    {errors.oldPassword && (
                      <span className="error-message">
                        {errors.oldPassword?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className={classNames({ 'form-error': errors.password2 })}>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'new_password' })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      ref={register({ required: true })}
                      className="block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm"
                    />
                  </div>
                </div>
                <div className={classNames({ 'form-error': errors.password2 })}>
                  <label
                    htmlFor="password2"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'repeat_password' })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      id="password2"
                      name="password2"
                      ref={register({
                        validate: (value) =>
                          value === password.current ||
                          formatMessage({ id: 'password_not_match' }),
                      })}
                      className="block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm"
                    />
                    {errors.password2 && <p>{errors.password2.message}</p>}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  {formatMessage({ id: 'reset_password' })}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
