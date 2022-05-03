import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import PrimaryButton from '../../common/components/Button';

import useLoginWithPassword from '../hooks/useLoginWithPassword';

const LoginForm = ({ onLogin = null }) => {
  const { register, handleSubmit, errors, setError } = useForm();
  const { formatMessage } = useIntl();
  const { loginWithPassword, error } = useLoginWithPassword();
  const hasErrors = Object.keys(errors).length > 0;

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
    await loginWithPassword({ email, password });
    onLogin?.();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row flex flex-wrap">
        <div
          className={`flex w-full flex-col justify-between ${
            errors.email && 'text-red-600'
          }`}
        >
          <label className="mb-2 block font-bold leading-tight text-color-dark dark:text-slate-300">
            {formatMessage({ id: 'email', defaultMessage: 'Email' })}
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-light-black bg-white bg-clip-padding py-2 px-3 text-base text-color-dark placeholder-slate-400 shadow-sm transition focus:border-light-blue focus:shadow-0 focus:outline-0 focus:ring-light-blue dark:shadow-white"
            name="email"
            type="email"
            ref={register({ required: true })}
          />
        </div>
        <div
          className={`mt-4 flex w-full flex-col justify-between ${
            errors.password && 'text-red-600'
          }`}
        >
          <label className="mb-2 block font-bold leading-tight text-color-dark dark:text-slate-300">
            {formatMessage({ id: 'password', defaultMessage: 'Password' })}
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-light-black bg-white bg-clip-padding py-2 px-3 text-base text-color-dark placeholder-slate-400 shadow-sm transition focus:border-light-blue focus:shadow-0 focus:outline-0 focus:ring-light-blue dark:shadow-white"
            type="password"
            name="password"
            ref={register({ required: true })}
          />
          <Link href="/account/forget-password">
            <a className="mt-2 text-right">
              <small
                id="passwordForgot"
                className="mt-1 block text-[#6c757d] dark:text-slate-300"
              >
                {formatMessage({
                  id: 'forgot_password',
                  defaultMessage: 'Forgot password',
                })}
              </small>
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
      <PrimaryButton
        type="submit"
        text={formatMessage({ id: 'log_in', defaultMessage: 'Log In' })}
        disabled={hasErrors}
      />
    </form>
  );
};

export default LoginForm;
