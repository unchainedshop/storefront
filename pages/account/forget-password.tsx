import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { LockClosedIcon } from '@heroicons/react/solid';

import useForgotPassword from '../../modules/auth/hooks/useForgotPassword';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';

const PasswordForget = () => {
  const { register, handleSubmit } = useForm();
  const { forgotPassword, loading, error } = useForgotPassword();
  const [emailSent, setEmailSent] = useState('');
  const { formatMessage } = useIntl();
  const onSubmit = async ({ email }) => {
    const { success } = await forgotPassword({ email });
    if (success) setEmailSent(formatMessage({ id: 'confirmation_sent' }));
  };

  return (
    <>
      <MetaTags title={formatMessage({ id: 'forgot_password' })} />
      <Header />
      <div className="">
        {loading && <LoadingItem />}
        {emailSent && <div className="text-center"> {emailSent} </div>}
        {!loading && !emailSent && (
          <div className="mx-auto w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
            <div className="mx-auto">
              <div>
                <LockClosedIcon className="mx-auto h-24 w-24 text-lime-600" />
              </div>
              <h1 className="text-center text-6xl font-bold text-slate-700 dark:text-slate-300">
                {formatMessage({ id: 'forgot_password' })}
              </h1>
              <p className="mt-4 text-center text-lg font-medium text-slate-600 dark:text-slate-400">
                {formatMessage({
                  id: 'forget_message',
                  defaultMessage: 'Enter your email address',
                })}
              </p>
              <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  {formatMessage({ id: 'email' })}
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    ref={register({ required: true })}
                    className="block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm"
                  />
                  <span className="error-message form-error text-center">
                    {error && error.message}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    className="inline-flex items-center rounded-md border border-slate-300 bg-lime-600 px-4 py-2 text-sm font-medium text-slate-100 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    type="submit"
                  >
                    {formatMessage({ id: 'request_new_password' })}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PasswordForget;
