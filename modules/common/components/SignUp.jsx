import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import useCreateUser from '../../auth/hooks/useCreateUser';
import useUpdateCart from '../../checkout/hooks/useUpdateCart';
import EditableField from './EditableField';
import PasswordVisible from './PasswordVisible';

const ErrorDisplay = ({ error }) => {
  const { formatMessage } = useIntl();

  if (!error) return '';
  if (error.message?.includes('Email already exists')) {
    return (
      <div className="my-4 text-red-600 lg:col-span-6">
        👬{' '}
        {formatMessage({ id: 'email_exists', defaultMessage: 'Email exists' })}.
      </div>
    );
  }

  return (
    <div className="my-4 text-red-600 lg:col-span-6">
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
  const { formatMessage } = useIntl();
  const { updateCart } = useUpdateCart();
  const { createUser, error: formError } = useCreateUser();
  const { register, handleSubmit, watch, errors, setError } = useForm();
  const hasErrors = Object.keys(errors).length;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState(false);

  const signUpFields = [
    {
      name: 'firstName',
      type: 'text',
      label: formatMessage({
        id: 'first_name',
        defaultMessage: 'First name',
      }),
      validator: {
        required: formatMessage({
          id: 'error_firstName',
          defaultMessage: 'First Name is required',
        }),
      },
    },
    {
      name: 'lastName',
      type: 'text',
      label: formatMessage({
        id: 'last_name',
        defaultMessage: 'Last name',
      }),
      validator: {
        required: formatMessage({
          id: 'error_lastName',
          defaultMessage: 'Last Name is required',
        }),
      },
    },
    {
      name: 'company',
      type: 'text',
      label: formatMessage({
        id: 'company',
        defaultMessage: 'Company',
      }),
      validator: false,
      width: 'half',
    },
    {
      name: 'addressLine',
      type: 'text',
      label: formatMessage({
        id: 'address',
        defaultMessage: 'address',
      }),
      validator: {
        required: formatMessage({
          id: 'error_address',
          defaultMessage: 'Address is required',
        }),
      },
      width: 'half',
    },
    {
      name: 'postalCode',
      type: 'text',
      label: formatMessage({
        id: 'postal_code',
        defaultMessage: 'Postal code',
      }),
      validator: {
        required: formatMessage({
          id: 'error_postalCode',
          defaultMessage: 'Postal code is required',
        }),
      },
      width: 'half',
    },
    {
      name: 'telNumber',
      type: 'tel',
      label: formatMessage({
        id: 'telNumber',
        defaultMessage: 'Telephone',
      }),
      width: 'half',
    },
    {
      name: 'city',
      type: 'text',
      label: formatMessage({
        id: 'city',
        defaultMessage: 'City',
      }),
      validator: {
        required: formatMessage({
          id: 'error_city',
          defaultMessage: 'City is required',
        }),
      },
      width: 'third',
    },
    {
      name: 'regionCode',
      type: 'text',
      label: formatMessage({
        id: 'region',
        defaultMessage: 'Region',
      }),
      validator: false,
      width: 'third',
    },
    {
      name: 'countryCode',
      type: 'country',
      label: formatMessage({
        id: 'country',
        defaultMessage: 'Country',
      }),
      validator: {
        required: formatMessage({
          id: 'error_country',
          defaultMessage: 'Country is Required',
        }),
      },
      width: 'third',
    },
    {
      name: 'emailAddress',
      type: 'email',
      label: formatMessage({
        id: 'emailAddress',
        defaultMessage: 'Email',
      }),
      validator: {
        required: formatMessage({
          id: 'error_email',
          defaultMessage: 'Email is Required',
        }),
      },
    },
  ];

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
    regionCode,
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
              regionCode,
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
        regionCode,
      },
    });

    router.replace({ pathname: '/review', query: { newSignUp: 'true' } });
    return true;
  };

  const password = useRef({});
  password.current = watch('password', '');
  const createAccount = watch('account');

  useEffect(() => {
    if (formError?.message?.includes('Email already exists.')) {
      setError('emailAddress', {
        type: 'manual',
        message: '👬 User with the same email already exists. Please login',
      });
    }
  }, [formError]);

  return (
    <div>
      <form
        className="space-y-6 lg:grid lg:grid-cols-6 lg:gap-4 lg:space-y-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        {signUpFields.map(({ name, label, type, validator, width }) => (
          <div
            key={name}
            className={
              // eslint-disable-next-line no-nested-ternary
              width === 'half'
                ? 'lg:col-span-3'
                : width === 'third'
                ? 'lg:col-span-2'
                : 'lg:col-span-6'
            }
          >
            <div className="flex justify-between">
              <label
                htmlFor={name}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {label}
              </label>
              {!validator && (
                <span className="text-sm font-medium text-slate-400 dark:text-slate-300">
                  {formatMessage({
                    id: `${name}_optional`,
                    defaultMessage: 'Optional',
                  })}
                </span>
              )}
            </div>
            <div className="mt-1">
              <EditableField
                name={name}
                id={name}
                type={type}
                register={register}
                validator={validator}
                errors={errors}
              />

              {errors[name] && (
                <p className="text-sm text-red-600">
                  {errors?.[name]?.message}
                </p>
              )}
            </div>
          </div>
        ))}

        <div className="relative flex items-start lg:col-span-6">
          <div className="flex h-5 items-center">
            <input
              type="checkbox"
              id="account"
              name="account"
              ref={register}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="account"
              className="font-medium text-slate-700 dark:text-slate-300"
            >
              {formatMessage({
                id: 'create_an_account',
                defaultMessage: 'Create an account',
              })}
            </label>
          </div>
        </div>

        {createAccount ? (
          <>
            <div className="lg:col-span-3">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  {formatMessage({
                    id: 'password',
                    defaultMessage: 'Password',
                  })}
                </label>
              </div>
              <div className="relative mt-1">
                <EditableField
                  name="password"
                  id="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  register={register}
                  validator={{
                    required: formatMessage({
                      id: 'error_password',
                      defaultMessage: 'Password is required',
                    }),
                  }}
                  errors={errors}
                />
                <PasswordVisible
                  isPasswordVisible={isPasswordVisible}
                  setIsPasswordVisible={setIsPasswordVisible}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex justify-between">
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  {formatMessage({
                    id: 'repeat_password',
                    defaultMessage: 'Repeat Password',
                  })}
                </label>
              </div>
              <div className="relative mt-1">
                <EditableField
                  name="password2"
                  id="password2"
                  type={isPassword2Visible ? 'text' : 'password'}
                  register={register}
                  validator={{
                    required: formatMessage({
                      id: 'error_password2',
                      defaultMessage: 'Password is required',
                    }),
                  }}
                  errors={errors}
                />

                <PasswordVisible
                  isPasswordVisible={isPassword2Visible}
                  setIsPasswordVisible={setIsPassword2Visible}
                />
                {errors.password2 && (
                  <p className="text-sm text-red-600">
                    {errors.password2.message}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          ''
        )}

        <ErrorDisplay error={formError} />

        <div className="md:col-span-6">
          <button
            type="submit"
            disabled={hasErrors}
            className="flex w-full justify-center rounded-md border border-transparent bg-slate-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            {formatMessage({
              id: 'guest_checkout_submit_button',
              defaultMessage: 'Continue to Payment',
            })}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
