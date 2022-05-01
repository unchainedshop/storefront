/* eslint-disable react/no-danger */
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import useCreateUser from '../modules/auth/hooks/useCreateUser';
import useUpdateCart from '../modules/checkout/hooks/useUpdateCart';
import Header from '../modules/layout/components/Header';
import LoginForm from '../modules/auth/components/LoginForm';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';
import COUNTRIES from '../modules/common/data/countries-list';

const ErrorDisplay = ({ error }) => {
  const { formatMessage } = useIntl();

  if (!error) return '';
  if (error.message?.includes('Email already exists')) {
    return (
      <div className="my-4 text-red-600">
        👬{' '}
        {formatMessage({ id: 'email_exists', defaultMessage: 'Email exists' })}.
      </div>
    );
  }

  return (
    <div className="my-4 text-red-600">
      👷‍♀️{' '}
      {formatMessage({
        id: 'unknown_error',
        defaultMessage: 'An unknown error occurred.',
      })}
    </div>
  );
};

const SignUp = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors, setError } = useForm();
  const { formatMessage } = useIntl();
  const { updateCart } = useUpdateCart();
  const { createUser, error: formError } = useCreateUser();
  const hasErrors = Object.keys(errors).length;

  useEffect(() => {
    if (formError?.message?.includes('Email already exists.')) {
      setError('emailAddress', {
        type: 'manual',
        message: '👬 User with the same email already exists. Please login',
      });
    }
  }, [formError]);

  const createAccount = watch('account');

  const onSubmit = async ({
    firstName,
    lastName,
    company,
    addressLine,
    postalCode,
    city,
    countryCode,
    emailAddress,
    telNumber,
    account,
    password,
    password2,
  }) => {
    if (account) {
      if (password !== password2) {
        setError('password', {
          type: 'manual',
          message: `👬 ${formatMessage({
            id: 'password_not_match',
            defaultMessage: 'Password not match',
          })}`,
        });
        setError('password2', {
          type: 'manual',
          message: `👬 ${formatMessage({
            id: 'password_not_match',
            defaultMessage: 'Password not match',
          })}`,
        });
        return false;
      }
      try {
        await createUser({
          email: emailAddress,
          password,
          profile: {
            phoneMobile: telNumber,
            address: {
              firstName,
              lastName,
              company,
              addressLine,
              postalCode,
              city,
              countryCode,
            },
          },
        });
      } catch (e) {
        return false;
      }
    }

    await updateCart({
      contact: { emailAddress, telNumber },
      billingAddress: {
        firstName,
        lastName,
        company,
        addressLine,
        postalCode,
        city,
        countryCode,
      },
    });

    router.replace('/review');
    return true;
  };

  const onLogin = () => router.replace('/review');

  return (
    <>
      <MetaTags
        title={`${formatMessage({
          id: 'log_in',
          defaultMessage: 'Log In',
        })} or ${formatMessage({
          id: 'register',
          defaultMessage: 'Register',
        })}`}
      />
      <Header />
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="relative mx-4 w-full lg:max-w-1/2 lg:flex-2">
            <h2>
              {formatMessage({
                id: 'welcome_back',
                defaultMessage: 'Welcome back',
              })}
            </h2>
            <p className="mt-0 mb-4">
              {formatMessage({
                id: 'welcome_back_message',
                defaultMessage: 'Welcome back message',
              })}
            </p>
            <LoginForm onLogin={onLogin} />
          </div>
          <div className="relative mx-4 w-full lg:max-w-1/2 lg:flex-2">
            <h2>
              {formatMessage({
                id: 'new_here',
                defaultMessage: 'New here',
              })}
            </h2>
            <p className="mt-0 mb-4">
              {formatMessage({
                id: 'new_here_message',
                defaultMessage: 'New here message',
              })}
            </p>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row flex flex-wrap">
                <div
                  className={`relative mx-4 mb-4 w-full md:max-w-1/2 md:flex-2 ${
                    errors.firstName && 'text-red-600'
                  }`}
                >
                  <label className="mb-2 block font-bold leading-tight text-color-dark">
                    {formatMessage({
                      id: 'first_name',
                      defaultMessage: 'First Name',
                    })}
                  </label>
                  <input
                    className="block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0"
                    name="firstName"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mx-4 mb-4 w-full md:max-w-1/2 md:flex-2 ${
                    errors.lastName && 'text-red-600'
                  }`}
                >
                  <label className="mb-2 block font-bold leading-tight text-color-dark">
                    {formatMessage({
                      id: 'last_name',
                      defaultMessage: 'Last Name',
                    })}
                  </label>
                  <input
                    className={`block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0 ${
                      errors.lastName && 'border-red-600 text-red-600'
                    }`}
                    name="lastName"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mb-4 w-full px-4 md:max-w-full md:flex-3 ${
                    errors.company && 'text-red-600'
                  }`}
                >
                  <label className="mb-2 block font-bold leading-tight text-color-dark">
                    {formatMessage({
                      id: 'company',
                      defaultMessage: 'Company',
                    })}
                    {formatMessage({
                      id: 'optional',
                      defaultMessage: 'Optional',
                    })}
                  </label>
                  <input
                    className="block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0"
                    name="company"
                    ref={register}
                  />
                </div>
                <div
                  className={`relative mb-4 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.addressLine && 'text-red-600'
                  }`}
                >
                  <label className="mb-2 block font-bold leading-tight text-color-dark">
                    {formatMessage({
                      id: 'address',
                      defaultMessage: 'Address',
                    })}
                  </label>
                  <input
                    className={`block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0 ${
                      errors.addressLine && 'border-red-600 text-red-600'
                    }`}
                    name="addressLine"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mb-4 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.postalCode && 'text-red-600'
                  }`}
                >
                  <label className="mb-2 block font-bold leading-tight text-color-dark">
                    {formatMessage({
                      id: 'postal_code',
                      defaultMessage: 'Postal code',
                    })}
                  </label>
                  <input
                    className={`block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0 ${
                      errors.postalCode && 'border-red-600 text-red-600'
                    }`}
                    name="postalCode"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mb-4 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.city && 'text-red-600'
                  }`}
                >
                  <label className="mb-2 block font-bold leading-tight text-color-dark">
                    {formatMessage({ id: 'city', city: 'City' })}
                  </label>
                  <input
                    className={`block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0 ${
                      errors.city && 'border-red-600 text-red-600'
                    }`}
                    name="city"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mb-4 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.countryCode && 'text-red-600'
                  }`}
                >
                  <label className="mb-2 block font-bold leading-tight text-color-dark">
                    {formatMessage({
                      id: 'country',
                      defaultMessage: 'Country',
                    })}
                  </label>
                  <select
                    name="countryCode"
                    ref={register({ required: true })}
                    className={`block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0 ${
                      errors.countryCode && 'border-red-600 text-red-600'
                    }`}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}{' '}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className={`relative mb-4 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.emailAddress && 'text-red-600'
                  }`}
                >
                  <label className="mb-2 block font-bold leading-tight text-color-dark">
                    {formatMessage({ id: 'email', defaultMessage: 'Email' })}
                  </label>
                  <input
                    className={`block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0 ${
                      errors.emailAddress && 'border-red-600 text-red-600'
                    }`}
                    name="emailAddress"
                    ref={register({ required: true })}
                  />
                </div>
                <div
                  className={`relative mb-4 w-full px-4 md:max-w-1/2 md:flex-2 ${
                    errors.telNumber ? 'text-red-600' : ''
                  }`}
                >
                  <label className="mb-2 block font-bold leading-tight text-color-dark">
                    {formatMessage({
                      id: 'telephone',
                      defaultMessage: 'Telephone',
                    })}
                  </label>
                  <input
                    className={`block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0 ${
                      errors.telNumber && 'border-red-600 text-red-600'
                    }`}
                    name="telNumber"
                    ref={register({ required: false })}
                  />
                </div>
                <div className="relative mb-4 w-full px-4 md:max-w-full md:flex-3">
                  <p className="form-check relative mb-4 block pl-5">
                    <input
                      type="checkbox"
                      className="absolute -ml-5"
                      id="account"
                      name="account"
                      ref={register}
                    />
                    <label className="form-check-label mb-0" htmlFor="account">
                      {formatMessage({
                        id: 'create_an_account',
                        defaultMessage: 'Create an account',
                      })}
                    </label>
                  </p>
                </div>
                {createAccount ? (
                  <>
                    <div
                      className={`relative mb-4 w-full px-4 md:max-w-1/2 md:flex-2 ${
                        errors.password ? 'text-red-600' : ''
                      }`}
                    >
                      <label className="mb-2 block font-bold leading-tight text-color-dark">
                        {formatMessage({
                          id: 'password',
                          defaultMessage: 'Password',
                        })}
                      </label>
                      <input
                        className="block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0"
                        name="password"
                        type="password"
                        ref={register({ required: true })}
                      />
                    </div>
                    <div
                      className={`relative mb-4 w-full px-4 md:max-w-1/2 md:flex-2 ${
                        errors.password2 ? 'text-red-600' : ''
                      }`}
                    >
                      <label className="mb-2 block font-bold leading-tight text-color-dark">
                        {formatMessage({
                          id: 'repeat_password',
                          defaultMessage: 'Repeat Password',
                        })}
                      </label>
                      <input
                        className="block w-full rounded border border-solid border-light-black bg-white bg-clip-padding py-[0.375] px-3 text-base text-color-dark transition focus:border-light-blue focus:shadow-0 focus:outline-0"
                        name="password2"
                        type="password"
                        ref={register({ required: true })}
                      />
                    </div>
                  </>
                ) : (
                  ''
                )}
                <div className="relative w-full max-w-full flex-3 px-4">
                  <p
                    className={`relative mt-0 mb-4 block pl-5 ${
                      errors.conditions ? 'text-red-600' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="absolute -ml-5"
                      id="conditions"
                      name="conditions"
                      ref={register({ required: true })}
                    />
                    <label
                      className={`form-check-label mb-0 ${
                        errors.conditions && 'text-red-600'
                      }`}
                      htmlFor="conditions"
                      dangerouslySetInnerHTML={{
                        __html: formatMessage({
                          id: 'i_have_read_term',
                          defaultMessage: 'I have read term',
                        }),
                      }}
                    />
                  </p>
                </div>
              </div>

              <ErrorDisplay error={formError} />

              <button
                className="button button--primary w-full py-[0.875rem] px-5"
                type="submit"
                disabled={hasErrors}
              >
                {formatMessage({
                  id: 'to_order_review',
                  defaultMessage: 'To Order Rbutton--primaryeview',
                })}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
