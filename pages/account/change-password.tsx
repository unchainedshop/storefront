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
      <div className="container mt-5 max-w-full bg-slate-100 pb-10 dark:bg-slate-600 lg:py-12 lg:px-8">
        {loading ? (
          <LoadingItem />
        ) : (
          <div className="mx-4 flex flex-wrap">
            <div className="relative w-full px-4 md:ml-[25%] md:max-w-full md:flex-2">
              <h1>{formatMessage({ id: 'change_password' })}</h1>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div
                  className={`mb-3 grid grid-cols-3 ${
                    errors.password2 ? 'form-error' : ''
                  }`}
                >
                  <label
                    className={`inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ${
                      errors.oldPassword ? 'form-error' : ''
                    }`}
                  >
                    {formatMessage({ id: 'current_password' })}
                  </label>
                  <input
                    className="col-span-2 inline-block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    name="oldPassword"
                    type="password"
                    ref={register({ required: true })}
                  />
                  {errors.oldPassword && (
                    <span className="error-message">
                      {' '}
                      {errors.oldPassword?.message}{' '}
                    </span>
                  )}
                </div>
                <div
                  className={`mb-3 grid grid-cols-3 ${
                    errors.password2 ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {formatMessage({ id: 'new_password' })}
                  </label>
                  <input
                    className="col-span-2 inline-block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    name="newPassword"
                    type="password"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`mb-3 grid grid-cols-3 ${
                    errors.password2 ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    {formatMessage({ id: 'repeat_password' })}
                  </label>
                  <input
                    className="col-span-2 inline-block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    name="password2"
                    type="password"
                    ref={register({
                      validate: (value) =>
                        value === password.current ||
                        formatMessage({ id: 'password_not_match' }),
                    })}
                  />
                  {errors.password2 && <p>{errors.password2.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
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
