import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import getConfig from 'next/config';
import Image from 'next/image';
import classNames from 'classnames';
import LoadingItem from '../../common/components/LoadingItem';

import COUNTRIES from '../../common/data/countries-list';
import useCreateUser from '../hooks/useCreateUser';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const SignUpForm = ({ onSuccessGoTo = '/account' }) => {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const { register, handleSubmit, errors, setError, watch } = useForm();
  const { createUser, error, loading } = useCreateUser();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (form) => {
    const {
      firstName,
      lastName,
      company,
      addressLine,
      addressLine2,
      postalCode,
      city,
      emailAddress,
      telNumber,
      regionCode,
      countryCode,
      password: userPassword,
    } = form;

    const userProfile = {
      email: emailAddress,
      password: userPassword,
      profile: {
        phoneMobile: telNumber,
        address: {
          firstName,
          lastName,
          company,
          addressLine,
          addressLine2,
          postalCode,
          city,
          regionCode,
          countryCode,
        },
      },
    };
    try {
      await createUser(userProfile);
      router.push(onSuccessGoTo);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };
  useEffect(() => {
    if (error?.message?.includes('Email already exists')) {
      setError('emailAddress', {
        type: 'manual',
        message: `👬 ${formatMessage({
          id: 'email_exists_please_login',
        })}`,
      });
    }
  }, [error]);

  return (
    <div className="lg:grid lg:grid-cols-2">
      <div className="flex flex-col justify-center py-6 px-2 sm:px-3 lg:flex-none lg:px-10 xl:px-12">
        <div className="mx-auto w-full rounded-lg border border-slate-400 bg-white px-2 py-6 drop-shadow-lg dark:bg-slate-500 sm:px-3 lg:px-10 xl:px-12">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {formatMessage({ id: 'welcome', defaultMessage: 'Welcome' })}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">
              {formatMessage({
                id: 'create_account',
                defaultMessage: 'Create account for free',
              })}
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {formatMessage({
                    id: 'sign_up_with',
                    defaultMessage: 'Sign up with',
                  })}
                </p>

                <div className="mt-1 grid grid-cols-3 gap-3">
                  <div>
                    <a
                      href="#"
                      className="inline-flex w-full justify-center rounded-md border border-slate-300 bg-white py-2 px-4 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50 dark:bg-slate-400"
                    >
                      <span className="sr-only">Sign in with Facebook</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="inline-flex w-full justify-center rounded-md border border-slate-300 bg-white py-2 px-4 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50"
                    >
                      <span className="sr-only">Sign in with Twitter</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="inline-flex w-full justify-center rounded-md border border-slate-300 bg-white py-2 px-4 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50"
                    >
                      <span className="sr-only">Sign in with GitHub</span>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative mt-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-slate-500 dark:bg-slate-500 dark:text-slate-300">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form
                className="space-y-6 md:grid md:grid-cols-6 md:gap-4 md:space-y-0"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div
                  className={classNames('md:col-span-6', {
                    'form-error': errors.firstName,
                  })}
                >
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'first_name' })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      ref={register({ required: true })}
                      className="block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900  focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div
                  className={classNames('md:col-span-6', {
                    'form-error': errors.lastName,
                  })}
                >
                  <label
                    htmlFor="lastName"
                    className="inline-block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'last_name' })}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    ref={register({ required: true })}
                    className={classNames(
                      'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                      {
                        'form-error': errors.lastName,
                      },
                    )}
                  />
                </div>

                <div
                  className={classNames('md:col-span-3', {
                    'form-error': errors.addressLine,
                  })}
                >
                  <label
                    htmlFor="addressLine"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'address' })}
                  </label>
                  <input
                    type="text"
                    id="addressLine"
                    name="addressLine"
                    ref={register({ required: true })}
                    className={classNames(
                      'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                      {
                        'form-error': errors.addressLine,
                      },
                    )}
                  />
                </div>

                <div
                  className={classNames('md:col-span-3', {
                    'form-error': errors.company,
                  })}
                >
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'company' })} {'  '}{' '}
                    {formatMessage({ id: 'optional' })}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    ref={register}
                    className="block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm"
                  />
                </div>

                <div
                  className={classNames('md:col-span-3', {
                    'form-error': errors.postalCode,
                  })}
                >
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'postal_code' })}
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    ref={register({ required: true })}
                    className={classNames(
                      'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                      {
                        'form-error': errors.postalCode,
                      },
                    )}
                  />
                </div>

                <div
                  className={classNames('md:col-span-3', {
                    'form-error': errors.telNumber,
                  })}
                >
                  <label
                    htmlFor="telNumber"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'telephone' })}
                  </label>
                  <input
                    type="tel"
                    name="telNumber"
                    autoComplete="tel"
                    ref={register({ required: true })}
                    className={classNames(
                      'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                      {
                        'form-error': errors.telNumber,
                      },
                    )}
                  />
                </div>

                <div
                  className={classNames('md:col-span-2', {
                    'form-error': errors.city,
                  })}
                >
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'city' })}
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    ref={register({ required: true })}
                    className={classNames(
                      'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                      {
                        'form-error': errors.city,
                      },
                    )}
                  />
                </div>

                <div
                  className={classNames('md:col-span-2', {
                    'form-error': errors.regionCode,
                  })}
                >
                  <label
                    htmlFor="regionCode"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'region' })}{' '}
                    {formatMessage({ id: 'optional' })}
                  </label>
                  <input
                    type="text"
                    id="regionCode"
                    name="regionCode"
                    ref={register}
                    className={classNames(
                      'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                      {
                        'form-error': errors.regionCode,
                      },
                    )}
                  />
                </div>

                <div
                  className={classNames('md:col-span-2', {
                    'form-error': errors.countryCode,
                  })}
                >
                  <label
                    htmlFor="countryCode"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'country' })}
                  </label>
                  <select
                    id="countryCode"
                    name="countryCode"
                    defaultValue="CH"
                    ref={register({ required: true })}
                    className={classNames(
                      'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                      {
                        'form-error': errors.countryCode,
                      },
                    )}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  className={classNames('md:col-span-4', {
                    'form-error': errors.emailAddress,
                  })}
                >
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {formatMessage({ id: 'email' })}
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    autoComplete="email"
                    ref={register({ required: true })}
                    className={classNames(
                      'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                      {
                        'form-error': errors.emailAddress,
                      },
                    )}
                  />
                  {errors.emailAddress && (
                    <span> {errors.emailAddress?.message} </span>
                  )}
                </div>

                <div
                  className={classNames('md:col-span-3', {
                    'form-error': errors.password,
                  })}
                >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'password' })}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    ref={register({ required: true })}
                    className={classNames(
                      'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                    )}
                  />
                </div>

                <div
                  className={classNames('md:col-span-3', {
                    'form-error': errors.password2,
                  })}
                >
                  <label
                    htmlFor="password2"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'repeat_password' })}
                  </label>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    ref={register({
                      validate: (value) =>
                        value === password.current ||
                        'The passwords do not match',
                    })}
                    className={classNames(
                      'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                    )}
                  />
                  {errors.password2 && <p>{errors.password2.message}</p>}
                </div>

                <div className="md:col-span-6 md:mx-4">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {formatMessage({
                      id: 'register',
                      defaultMessage: 'Register',
                    })}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          className="absolute inset-0 h-full w-full rounded-lg object-cover "
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default SignUpForm;
