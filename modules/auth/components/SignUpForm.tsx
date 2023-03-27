import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import getConfig from 'next/config';
import Image from 'next/legacy/image';
import classNames from 'classnames';
import toast from 'react-hot-toast';
import COUNTRIES from '../../common/data/countries-list';
import useCreateUser from '../hooks/useCreateUser';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
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
  } = useForm<any>();
  const { createUser } = useCreateUser();
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
    } catch (error: any) {
      // eslint-disable-next-line no-console
      if (error?.message?.includes('E-Mail already exists')) {
        setError('root', {
          type: 'manual',
          message: `👬 ${formatMessage({
            id: 'email_exists_please_login',
            defaultMessage:
              'A User with the same email exists already. Please sign-in',
          })}`,
        });
      }
      console.error(e);
    }
  };

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
                      {...register('firstName', { required: true })}
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
                      {...register('lastName', { required: true })}
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
                      {...register('addressLine', { required: true })}
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
                      {...register('company', { required: true })}
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
                      {...register('postalCode', { required: true })}
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
                      {...register('telNumber', { required: true })}
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
                      {...register('city', { required: true })}
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
                      {...register('regionCode')}
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
                    {...register('countryCode', { required: true })}
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
                    {...register('emailAddress', {
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
                      {errors.emailAddress?.message as string}
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
                      {...register('password', {
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
                        {errors.password?.message as string}
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
                      {...register('password2', {
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
                        {errors.password2?.message as string}
                      </p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-6">
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
