import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import getConfig from 'next/config';
import Image from 'next/image';
import classNames from 'classnames';

import { toast } from 'react-toastify';
import COUNTRIES from '../../common/data/countries-list';
import useCreateUser from '../hooks/useCreateUser';
import defaultNextImageLoader from '../../common/utils/getDefaultNextImageLoader';
import PasswordVisible from '../../common/components/PasswordVisible';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const SignUpForm = ({ onSuccessGoTo = '/login' }) => {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const { createUser, error } = useCreateUser();
  const password = useRef({});
  password.current = watch('password', '');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState(false);

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
      toast.success('User created successfully');
      router.push(onSuccessGoTo);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    if (error?.message?.includes('E-Mail already exists')) {
      setError('emailAddress', {
        type: 'manual',
        message: `👬 ${formatMessage({
          id: 'email_exists_please_login',
          defaultMessage:
            'A User with the same email exists already. Please sign-in',
        })}`,
      });
    }
  }, [error]);

  return (
    <div className="bg-slate-100 dark:bg-slate-600 lg:grid lg:grid-cols-2">
      <div className="flex flex-col justify-center py-6 px-2 sm:px-3 lg:flex-none lg:px-10 xl:px-12">
        <div className="mx-auto w-full rounded-lg border border-slate-200 bg-white px-2 py-6 drop-shadow-lg dark:bg-slate-500 sm:px-3 lg:px-10 xl:px-12">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {formatMessage({ id: 'welcome', defaultMessage: 'Welcome' })}
            </h2>
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
                      className="inline-flex w-full justify-center rounded-md border border-slate-300 bg-white py-2 px-4 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50"
                    >
                      <span className="sr-only">
                        {formatMessage({
                          id: 'facebook',
                          defaultMessage: 'Sign up with Facebook',
                        })}
                      </span>
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
                      <span className="sr-only">
                        {formatMessage({
                          id: 'twitter',
                          defaultMessage: 'Sign up with Twitter',
                        })}
                      </span>
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
                      <span className="sr-only">
                        {formatMessage({
                          id: 'github',
                          defaultMessage: 'Sign up with GitHub',
                        })}
                      </span>
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
                    {formatMessage({
                      id: 'email_sign_up',
                      defaultMessage: 'Or continue with',
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form
                className="space-y-6 md:grid md:grid-cols-6 md:gap-4 md:space-y-0"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="md:col-span-6">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({
                      id: 'first_name',
                      defaultMessage: 'First name',
                    })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      ref={register({ required: true })}
                      className={classNames(
                        'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                        {
                          'border-red-300 focus:border-red-600 focus:outline-none focus:ring-red-600':
                            errors.firstName,
                        },
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600">
                        {formatMessage({
                          id: 'error_firstName',
                          defaultMessage: 'First Name is required',
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-6">
                  <label
                    htmlFor="lastName"
                    className="inline-block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({
                      id: 'last_name',
                      defaultMessage: 'Last name',
                    })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      ref={register({ required: true })}
                      className={classNames(
                        'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none  dark:text-slate-600 sm:text-sm',
                        {
                          'border-red-300 focus:border-red-600 focus:outline-none focus:ring-red-600':
                            errors.lastName,
                        },
                      )}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600">
                        {formatMessage({
                          id: 'error_lastName',
                          defaultMessage: 'Last Name is required',
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-3">
                  <label
                    htmlFor="addressLine"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({
                      id: 'address',
                      defaultMessage: 'Address',
                    })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="addressLine"
                      name="addressLine"
                      ref={register({ required: true })}
                      className={classNames(
                        'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                        {
                          'border-red-300 focus:border-red-600 focus:outline-none focus:ring-red-600':
                            errors.addressLine,
                        },
                      )}
                    />
                    {errors.addressLine && (
                      <p className="text-sm text-red-600">
                        {formatMessage({
                          id: 'error_address',
                          defaultMessage: 'Address is required',
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-3">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({
                      id: 'company',
                      defaultMessage: 'Company',
                    })}{' '}
                    {'  '}{' '}
                    {formatMessage({
                      id: 'optional',
                      defaultMessage: 'Optional',
                    })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      ref={register}
                      className="block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="md:col-span-3">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({
                      id: 'postal_code',
                      defaultMessage: 'Postal code',
                    })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      ref={register({ required: true })}
                      className={classNames(
                        'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                        {
                          'border-red-300 focus:border-red-600 focus:outline-none focus:ring-red-600':
                            errors.postalCode,
                        },
                      )}
                    />
                    {errors.postalCode && (
                      <p className="text-sm text-red-600">
                        {formatMessage({
                          id: 'error_postalCode',
                          defaultMessage: 'Postal code is required',
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-3">
                  <label
                    htmlFor="telNumber"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({
                      id: 'telephone',
                      defaultMessage: 'Telephone',
                    })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="telNumber"
                      autoComplete="tel"
                      ref={register({ required: false })}
                      className={classNames(
                        'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                        {
                          'border-red-300 focus:border-red-600 focus:outline-none focus:ring-red-600':
                            errors.telNumber,
                        },
                      )}
                    />
                    {errors.telNumber && (
                      <p className="text-sm text-red-600">
                        {formatMessage({
                          id: 'error_telNumber',
                          defaultMessage: 'Telephone number is required',
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'city', defaultMessage: 'City' })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      ref={register({ required: true })}
                      className={classNames(
                        'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                        {
                          'mt-2 text-sm text-red-600': errors.city,
                        },
                      )}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-600">
                        {formatMessage({
                          id: 'error_city',
                          defaultMessage: 'City is required',
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="regionCode"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({ id: 'region', defaultMessage: 'Region' })}{' '}
                    {formatMessage({
                      id: 'optional',
                      defaultMessage: 'Optional',
                    })}
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="regionCode"
                      name="regionCode"
                      ref={register}
                      className={classNames(
                        'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                        {
                          'border-red-300 focus:border-red-600 focus:outline-none focus:ring-red-600':
                            errors.regionCode,
                        },
                      )}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="countryCode"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({
                      id: 'country',
                      defaultMessage: 'Country',
                    })}
                  </label>
                  <select
                    id="countryCode"
                    name="countryCode"
                    defaultValue="CH"
                    ref={register({ required: true })}
                    className="block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {formatMessage({ id: 'email', defaultMessage: 'Email' })}
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    autoComplete="email"
                    ref={register({
                      required: 'Email is required',
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    className={classNames(
                      'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                      {
                        'border-red-300 focus:border-red-600 focus:outline-none focus:ring-red-600':
                          errors.emailAddress,
                      },
                    )}
                  />
                  {errors.emailAddress && (
                    <p className="text-sm text-red-600">
                      {errors.emailAddress?.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({
                      id: 'password',
                      defaultMessage: 'Password',
                    })}
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      id="password"
                      name="password"
                      ref={register({
                        required: {
                          value: true,
                          message: 'Password is required',
                        },
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                        pattern: {
                          value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                          message:
                            'Password must contain at least one numeric digit, one uppercase and one lowercase letter',
                        },
                      })}
                      autoComplete="new-password"
                      className={classNames(
                        'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                        {
                          'border-red-300 focus:border-red-600 focus:outline-none focus:ring-red-600':
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
                        {errors.password?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-3">
                  <label
                    htmlFor="password2"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {formatMessage({
                      id: 'repeat_password',
                      defaultMessage: 'Repeat Password',
                    })}
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={isPassword2Visible ? 'text' : 'password'}
                      id="password2"
                      name="password2"
                      ref={register({
                        validate: (value) =>
                          value === password.current ||
                          'The passwords do not match',
                      })}
                      autoComplete="new-password"
                      className={classNames(
                        'block w-full appearance-none rounded-md border border-slate-300 bg-slate-100 py-2 px-3 placeholder-slate-400 shadow-sm transition focus:border-slate-900 focus:text-slate-900 focus:outline-none focus:ring-slate-900 dark:text-slate-600 sm:text-sm',
                        {
                          'border-red-300 focus:border-red-600 focus:outline-none focus:ring-red-600':
                            errors.password2,
                        },
                      )}
                    />
                    <PasswordVisible
                      isPasswordVisible={isPassword2Visible}
                      setIsPasswordVisible={setIsPassword2Visible}
                    />
                    {errors.password2 && (
                      <p className="text-sm text-red-600">
                        {errors.password2?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-6">
                  {error?.message?.includes('Navision auth failed') && (
                    <div className="bg-red-300 text-red-600">
                      {error.message}
                      {formatMessage({
                        id: 'error',
                        defaultMessage: ', Try again later',
                      })}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-slate-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
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
      <div className="relative hidden py-6 lg:block">
        <div className="relative h-full w-full opacity-50">
          <span>
            <Image
              src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL="/placeholder.png"
              className="z-0 rounded-lg"
              loader={defaultNextImageLoader}
            />
          </span>
        </div>
        <span className="absolute top-1/3 left-1/3">
          <Image
            src={theme.assets.logo}
            alt={formatMessage({
              id: 'shop_logo_sign_up',
              defaultMessage: 'Shop logo',
            })}
            layout="fixed"
            width={144}
            height={40}
            placeholder="blur"
            blurDataURL="/placeholder.png"
            className="mx-auto rounded"
            loader={defaultNextImageLoader}
          />
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
