/* eslint-disable react/no-danger */
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ReactElement, useEffect } from 'react';
import { useIntl } from 'react-intl';

import useCreateUser from '../modules/auth/hooks/useCreateUser';
import useUpdateCart from '../modules/checkout/hooks/useUpdateCart';
import LoginForm from '../modules/auth/components/LoginForm';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';
import COUNTRIES from '../modules/common/data/countries-list';

const ErrorDisplay = ({ error }): ReactElement => {
  const intl = useIntl();
  if (!error) return null;
  if (error.message?.includes('Email already exists')) {
    return (
      <div className="form-error my-3">
        👬{' '}
        {intl.formatMessage({
          id: 'email_exists',
          defaultMessage: 'E-Mail exists already, login?',
        })}
        .
      </div>
    );
  }

  return <div className="form-error my-3">👷‍♀️ An unknown error occurred.</div>;
};

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<any>();
  const intl = useIntl();
  const { updateCart } = useUpdateCart();
  const { createUser, error: formError } = useCreateUser();
  const hasErrors = !!Object.keys(errors).length;

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
          message: `👬 ${intl.formatMessage({
            id: 'password_not_match',
            defaultMessage: 'Passwords do not match',
          })}`,
        });
        setError('password2', {
          type: 'manual',
          message: `👬 ${intl.formatMessage({
            id: 'password_not_match',
            defaultMessage: 'Passwords do not match',
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
        title={`${intl.formatMessage({
          id: 'log_in',
          defaultMessage: 'Login',
        })} or ${intl.formatMessage({
          id: 'register',
          defaultMessage: 'Register',
        })}`}
      />

      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h2>
              {intl.formatMessage({
                id: 'welcome_back',
                defaultMessage: 'Welcome back',
              })}
            </h2>
            <p className="mt-0 mb-3">
              {intl.formatMessage({
                id: 'welcome_back_message',
                defaultMessage: 'Nice you are back again, continue',
              })}
            </p>
            <LoginForm onLogin={onLogin} />
          </div>
          <div className="col-lg-6">
            <h2>
              {' '}
              {intl.formatMessage({
                id: 'new_here',
                defaultMessage: 'New here',
              })}{' '}
            </h2>
            <p className="mt-0 mb-3">
              {intl.formatMessage({
                id: 'new_here_message',
                defaultMessage: 'Are you new here?',
              })}
            </p>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div
                  className={`col-md-6 mb-3 ${
                    errors.firstName ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({
                      id: 'first_name',
                      defaultMessage: 'Firstname',
                    })}
                  </label>
                  <input
                    className="form-control"
                    name="firstName"
                    {...register('firstName', { required: true })}
                  />
                </div>
                <div
                  className={`col-md-6 mb-3 ${
                    errors.lastName ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({
                      id: 'last_name',
                      defaultMessage: 'Lastname',
                    })}
                  </label>
                  <input
                    className={`form-control ${
                      errors.lastName && 'form-error'
                    }`}
                    name="lastName"
                    {...register('lastName', { required: true })}
                  />
                </div>
                <div
                  className={`col-md-12 mb-3 ${
                    errors.company ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({
                      id: 'company',
                      defaultMessage: 'Company Name',
                    })}{' '}
                    {intl.formatMessage({
                      id: 'optional',
                      defaultMessage: '(Optional)',
                    })}
                  </label>
                  <input
                    className="form-control"
                    name="company"
                    {...register('company')}
                  />
                </div>
                <div
                  className={`col-md-6 mb-3 ${
                    errors.addressLine ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({
                      id: 'address',
                      defaultMessage: 'Address',
                    })}
                  </label>
                  <input
                    className={`form-control ${
                      errors.addressLine && 'form-error'
                    }`}
                    name="addressLine"
                    {...register('addressLine', { required: true })}
                  />
                </div>
                <div
                  className={`col-md-6 mb-3 ${
                    errors.postalCode ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({
                      id: 'postal_code',
                      defaultMessage: 'Postal Code',
                    })}
                  </label>
                  <input
                    className={`form-control ${
                      errors.postalCode && 'form-error'
                    }`}
                    name="postalCode"
                    {...register('postalCode', { required: true })}
                  />
                </div>
                <div
                  className={`col-md-6 mb-3 ${errors.city ? 'form-error' : ''}`}
                >
                  <label className="form-label">
                    {intl.formatMessage({ id: 'city', defaultMessage: 'City' })}
                  </label>
                  <input
                    className={`form-control ${errors.city && 'form-error'}`}
                    name="city"
                    {...register('city', { required: true })}
                  />
                </div>
                <div
                  className={`col-md-6 mb-3 ${
                    errors.countryCode ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({
                      id: 'country',
                      defaultMessage: 'Country',
                    })}
                  </label>
                  <select
                    name="countryCode"
                    {...register('countryCode', { required: true })}
                    className={`form-control ${
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
                  className={`col-md-6 mb-3 ${
                    errors.emailAddress ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({
                      id: 'email',
                      defaultMessage: 'E-Mail Address',
                    })}
                  </label>
                  <input
                    className={`form-control ${
                      errors.emailAddress && 'form-error'
                    }`}
                    name="emailAddress"
                    {...register('emailAddress', { required: true })}
                  />
                </div>
                <div
                  className={`col-md-6 mb-3 ${
                    errors.telNumber ? 'form-error' : ''
                  }`}
                >
                  <label className="form-label">
                    {intl.formatMessage({
                      id: 'telephone',
                      defaultMessage: 'Telephone Number',
                    })}
                  </label>
                  <input
                    className={`form-control ${
                      errors.telNumber && 'form-error'
                    }`}
                    name="telNumber"
                    {...register('telNumber')}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <p className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="account"
                      name="account"
                      {...register('account')}
                    />
                    <label className="form-check-label mb-0" htmlFor="account">
                      {intl.formatMessage({
                        id: 'create_an_account',
                        defaultMessage: 'Create a new account',
                      })}
                    </label>
                  </p>
                </div>
                {createAccount ? (
                  <>
                    <div
                      className={`col-md-6 mb-3 ${
                        errors.password ? 'form-error' : ''
                      }`}
                    >
                      <label className="form-label">
                        {intl.formatMessage({
                          id: 'password',
                          defaultMessage: 'Password',
                        })}
                      </label>
                      <input
                        className="form-control"
                        name="password"
                        type="password"
                        {...register('password', { required: true })}
                      />
                    </div>
                    <div
                      className={`col-md-6 mb-3 ${
                        errors.password2 ? 'form-error' : ''
                      }`}
                    >
                      <label className="form-label">
                        {intl.formatMessage({
                          id: 'repeat_password',
                          defaultMessage: 'Repeat password',
                        })}
                      </label>
                      <input
                        className="form-control"
                        name="password2"
                        type="password"
                        {...register('password2', { required: true })}
                      />
                    </div>
                  </>
                ) : (
                  ''
                )}
                <div className="col-12">
                  <p
                    className={`form-check mt-0 mb-4 ${
                      errors.conditions ? 'form-error' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="conditions"
                      name="conditions"
                      {...register('conditions', { required: true })}
                    />
                    <label
                      className={`form-check-label mb-0 ${
                        errors.conditions && 'form-error'
                      }`}
                      htmlFor="conditions"
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({
                          id: 'i_have_read_term',
                          defaultMessage:
                            'I have read the terms and conditions',
                        }),
                      }}
                    />
                  </p>
                </div>
              </div>

              <ErrorDisplay error={formError} />

              <button
                className="button button--primary button--big w-100"
                type="submit"
                disabled={hasErrors}
              >
                {intl.formatMessage({
                  id: 'to_order_review',
                  defaultMessage: 'Continue to Order Review',
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
