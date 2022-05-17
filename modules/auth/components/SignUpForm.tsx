import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import LoadingItem from '../../common/components/LoadingItem';

import COUNTRIES from '../../common/data/countries-list';
import useCreateUser from '../hooks/useCreateUser';

const SignUpForm = ({ onSuccessGoTo = '/account' }) => {
  const router = useRouter();
  const intl = useIntl();
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
        message: `👬 ${intl.formatMessage({
          id: 'email_exists_please_login',
        })}`,
      });
    }
  }, [error]);

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto">
        <div className="py-4 lg:grid lg:grid-cols-2">
          <div className="rounded-lg bg-white shadow-lg lg:col-start-2">
            <h1 className="text-center">
              {intl.formatMessage({ id: 'sign_up' })}
            </h1>

            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap">
                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.firstName ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'first_name' })}
                  </label>
                  <input
                    className="block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600"
                    name="firstName"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.lastName ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'last_name' })}
                  </label>
                  <input
                    className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                      errors.lastName && 'form-error'
                    }`}
                    name="lastName"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.company ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'company' })} {'  '}{' '}
                    {intl.formatMessage({ id: 'optional' })}
                  </label>
                  <input
                    className="block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600"
                    name="company"
                    ref={register}
                  />
                </div>
                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.addressLine ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'address' })}
                  </label>
                  <input
                    className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                      errors.addressLine && 'form-error'
                    }`}
                    name="addressLine"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.postalCode ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'postal_code' })}
                  </label>
                  <input
                    className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                      errors.postalCode && 'form-error'
                    }`}
                    name="postalCode"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.city ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'city' })}
                  </label>
                  <input
                    className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                      errors.city && 'form-error'
                    }`}
                    name="city"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.regionCode ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'region' })}{' '}
                    {intl.formatMessage({ id: 'optional' })}
                  </label>
                  <input
                    className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                      errors.regionCode && 'form-error'
                    }`}
                    name="regionCode"
                  />
                </div>
                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.countryCode ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'country' })}
                  </label>
                  <select
                    name="countryCode"
                    defaultValue="CH"
                    ref={register({ required: true })}
                    className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                      errors.countryCode && 'form-error'
                    }`}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {' '}
                        {c.name}{' '}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.emailAddress ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'email' })}
                  </label>
                  <input
                    className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                      errors.emailAddress && 'form-error'
                    }`}
                    name="emailAddress"
                    ref={register({ required: true })}
                  />
                  {errors.emailAddress && (
                    <span> {errors.emailAddress?.message} </span>
                  )}
                </div>
                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.telNumber ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'telephone' })}
                  </label>
                  <input
                    className={`block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600 ${
                      errors.telNumber && 'form-error'
                    }`}
                    name="telNumber"
                    ref={register({ required: true })}
                  />
                </div>

                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.password ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'password' })}
                  </label>
                  <input
                    className="block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600"
                    name="password"
                    type="password"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mb-3 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.password2 ? 'form-error' : ''
                  }`}
                >
                  <label className="inline-block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 ">
                    {intl.formatMessage({ id: 'repeat_password' })}
                  </label>
                  <input
                    className="block w-full rounded-md border border-solid border-slate-900 bg-slate-100 py-2 px-2 text-sm placeholder-slate-500 transition focus:border-slate-900 focus:text-slate-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:text-slate-600"
                    name="password2"
                    type="password"
                    ref={register({
                      validate: (value) =>
                        value === password.current ||
                        'The passwords do not match',
                    })}
                  />
                  {errors.password2 && <p>{errors.password2.message}</p>}
                </div>
                {loading && <LoadingItem />}
                <div className="mx-8 w-full">
                  <button
                    type="submit"
                    className="my-4 py-4 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {intl.formatMessage({ id: 'register_user' })}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
