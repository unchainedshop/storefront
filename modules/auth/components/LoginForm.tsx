import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

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
          <label className="mb-2 block font-bold leading-tight text-color-dark">
            {formatMessage({ id: 'email', defaultMessage: 'Email' })}
          </label>
          <input
            className="block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0"
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
          <label className="mb-2 block font-bold leading-tight text-color-dark">
            {formatMessage({ id: 'password', defaultMessage: 'Password' })}
          </label>
          <input
            className="block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0"
            type="password"
            name="password"
            ref={register({ required: true })}
          />
          <Link href="/account/forget-password">
            <a className="mt-2 text-right">
              <small id="passwordForgot" className="mt-1 block text-[#6c757d]">
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
      <button
        className="button button--primary align-center mt-4 w-full py-[0.875] px-5 font-bold text-white"
        type="submit"
        disabled={hasErrors}
      >
        {formatMessage({ id: 'log_in', defaultMessage: 'Log In' })}
      </button>
    </form>
  );
};

export default LoginForm;
