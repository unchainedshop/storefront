import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { CogIcon, KeyIcon, UserCircleIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';
import UpdateProfileForm from '../../modules/auth/components/UpdateProfileForm';
import useSetUsername from '../../modules/auth/hooks/useSetUsername';
import useUser from '../../modules/auth/hooks/useUser';
import MetaTags from '../../modules/common/components/MetaTags';
import COUNTRIES from '../../modules/common/data/countries-list';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import useRemoveEmail from '../../modules/auth/hooks/useRemoveEmail';
import useAddEmail from '../../modules/auth/hooks/useAddEmail';
import useResendVerificationEmail from '../../modules/auth/hooks/useResendVerificationEmail';
import useRedirect from '../../modules/auth/hooks/useRedirect';
import Button from '../../modules/common/components/Button';
import Verified from '../../modules/common/components/Verified';
import UserName from '../../modules/common/components/UserName';

const subNavigation = [
  { name: 'General', href: '#general', icon: UserCircleIcon, current: true },
  { name: 'Address', href: '#adress', icon: KeyIcon, current: false },
  { name: 'Password', href: '#password', icon: KeyIcon, current: false },
];

const Account = () => {
  const { user } = useUser();
  const { formatMessage } = useIntl();
  const { register, handleSubmit, errors } = useForm();
  const [newEmail, setNewEmail] = useState('');
  const [updateProfile, setUpdateProfile] = useState(false);

  const { removeEmail } = useRemoveEmail();
  const { addEmail } = useAddEmail();
  const { resendVerificationEmail } = useResendVerificationEmail();

  useRedirect({ to: '/login', matchAnonymous: true, matchGuests: true });

  const showDebugInfo = false;
  // const showUsername = user?.roles?.includes('admin');
  const showUsername = true;
  const onProfileUpdateComplete = (value) => {
    if (value) setUpdateProfile(false);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const { profile = {} } = user;

  return (
    <>
      <MetaTags
        title={
          user?.username ||
          formatMessage({ id: 'account', defaultMessage: 'Account' })
        }
      />
      <Header />

      <main className="max-w-full bg-slate-100 pb-10 lg:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
            <nav className="space-y-1">
              {subNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-50 text-orange-600 hover:bg-white'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? 'text-orange-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-1 mr-3 h-6 w-6 flex-shrink-0',
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* General */}
          <section
            id="general"
            className="space-y-6 sm:px-6 lg:col-span-9 lg:col-start-4 lg:px-0"
            aria-labelledby="payment-details-heading"
          >
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="bg-white py-6 px-4 sm:p-6">
                  <div className="divide-y divide-gray-200">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {formatMessage({
                          id: 'account',
                          defaultMessage: 'Account',
                        })}
                      </h3>
                    </div>
                    <div className="mt-6">
                      <div className="divide-y divide-gray-200">
                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                          {showUsername && <UserName user={user} />}
                        </div>

                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                          <div className="text-sm font-medium text-gray-500">
                            {formatMessage({
                              id: 'full_name',
                              defaultMessage: 'Full Name',
                            })}
                          </div>
                          <div className="mb-2 flex items-center gap-2 sm:col-span-2">
                            <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                              {updateProfile ? (
                                <input
                                  className="form-control"
                                  defaultValue={profile?.address?.firstName}
                                  name="firstName"
                                  ref={register({ required: true })}
                                />
                              ) : (
                                <span className="mb-1">
                                  {user?.profile?.address?.firstName}
                                </span>
                              )}
                            </div>

                            <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                              {updateProfile ? (
                                <input
                                  className={`form-control ${
                                    errors.lastName && 'form-error'
                                  }`}
                                  name="lastName"
                                  defaultValue={profile?.address?.lastName}
                                  ref={register({ required: true })}
                                />
                              ) : (
                                <span className="mb-1">
                                  {user?.profile?.address?.lastName}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                          <h2 className="text-sm font-medium text-gray-500">
                            {formatMessage({
                              id: 'email',
                              defaultMessage: 'Email',
                            })}
                          </h2>
                          {user?.emails?.map((e, i) => (
                            <div
                              key={e.address}
                              className="mb-1 flex flex-wrap items-center"
                            >
                              <span className="text-lg font-extrabold">
                                {i + 1}. {e.address}
                              </span>
                              <Verified isActive={e.verified} />
                              {!e.verified && (
                                <Button
                                  text={formatMessage({
                                    id: 'resend',
                                    defaultMessage: 'ReSend',
                                  })}
                                  type="button"
                                  className="my-2 px-0 py-0 text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                  onClick={() =>
                                    resendVerificationEmail(e.address)
                                  }
                                />
                              )}
                              {user?.emails?.length > 1 && (
                                <Button
                                  text={formatMessage({
                                    id: 'remove',
                                    defaultMessage: 'Remove',
                                  })}
                                  type="button"
                                  className="my-2 text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                  onClick={() => removeEmail(e.address)}
                                />
                              )}
                            </div>
                          ))}
                          {/* <div className="form-row">
                              <label className="form-label">
                                {formatMessage({
                                  id: 'add_email',
                                  defaultMessage: 'Add Email',
                                })}
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                onChange={(e) => setNewEmail(e.target.value)}
                                value={newEmail}
                              />
                            </div> */}
                          <Button
                            text={formatMessage({
                              id: 'add_email',
                              defaultMessage: 'Add Email',
                            })}
                            type="button"
                            className="rounded-md py-0 px-0 font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            onClick={() => addEmail(newEmail)}
                          />
                        </div>

                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                          <div className="mb-1 text-sm font-medium text-gray-500">
                            {formatMessage({
                              id: 'company',
                              defaultMessage: 'Company',
                            })}
                          </div>
                          {updateProfile ? (
                            <input
                              className="form-control"
                              name="company"
                              defaultValue={profile?.address?.company}
                              ref={register}
                            />
                          ) : (
                            <div className="mb-1">
                              {user?.profile?.address?.Company}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>

          {/* Address */}
          <section
            aria-labelledby="payment-details-heading"
            className="pt-6 sm:px-6 lg:col-span-9 lg:col-start-4 lg:px-0"
          >
            <div className="space-y-6 ">
              <form action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="bg-white py-6 px-4 sm:p-6">
                    <div>
                      <h1
                        id="payment-details-heading"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {formatMessage({
                          id: 'address',
                          defaultMessage: 'Address',
                        })}
                      </h1>
                    </div>

                    <div className="mt-6 grid grid-cols-4 gap-6">
                      <div className="col-span-4 sm:col-span-2">
                        <div className="mb-1">
                          {formatMessage({
                            id: 'address',
                            defaultMessage: 'Address',
                          })}
                        </div>
                        {updateProfile ? (
                          <input
                            className={`form-control ${
                              errors.addressLine && 'form-error'
                            }`}
                            name="addressLine"
                            defaultValue={profile?.address?.addressLine}
                            ref={register({ required: true })}
                          />
                        ) : (
                          <div className="mb-1">
                            {user?.profile?.address?.addressLine}
                          </div>
                        )}
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <div className="mb-1">
                          {formatMessage({
                            id: 'address_2',
                            defaultMessage: 'Address 2',
                          })}
                        </div>
                        {updateProfile ? (
                          <input
                            className={`form-control ${
                              errors.addressLine && 'form-error'
                            }`}
                            name="addressLine"
                            defaultValue={user?.profile?.address?.addressLine2}
                            ref={register({ required: false })}
                          />
                        ) : (
                          <div className="mb-1">
                            {user?.profile?.address?.addressLine2}
                          </div>
                        )}
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <div className="mb-1">
                          {formatMessage({
                            id: 'telephone',
                            defaultMessage: 'Telephone',
                          })}
                        </div>
                        {updateProfile ? (
                          <input
                            className={`form-control ${
                              errors.telNumber && 'form-error'
                            }`}
                            name="telNumber"
                            defaultValue={profile?.phoneMobile}
                            ref={register({ required: true })}
                          />
                        ) : (
                          <div className="mb-1">
                            {user?.profile?.phoneMobile}
                          </div>
                        )}
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <div className="mb-1">
                          {formatMessage({
                            id: 'postal_code',
                            defaultMessage: 'Postal Code',
                          })}
                        </div>
                        {updateProfile ? (
                          <input
                            className={`form-control ${
                              errors.postalCode && 'form-error'
                            }`}
                            name="postalCode"
                            defaultValue={profile?.address?.postalCode}
                            ref={register({ required: true })}
                          />
                        ) : (
                          <div className="mb-1">
                            {user?.profile?.address?.postalCode}
                          </div>
                        )}
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <div className="mb-1">
                          {formatMessage({
                            id: 'country',
                            defaultMessage: 'Country',
                          })}
                        </div>
                        {updateProfile ? (
                          <select
                            name="countryCode"
                            defaultValue={profile?.address?.countryCode}
                            ref={register({ required: true })}
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
                        ) : (
                          <div className="mb-1">
                            {
                              COUNTRIES.filter(
                                (c) =>
                                  c.code ===
                                  user?.profile?.address?.countryCode,
                              )[0]?.name
                            }
                          </div>
                        )}
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <div className="mb-1">
                          {formatMessage({
                            id: 'region',
                            defaultMessage: 'Region',
                          })}
                        </div>
                        {updateProfile ? (
                          <input
                            className={`form-control ${
                              errors.regionCode && 'form-error'
                            }`}
                            name="regionCode"
                            defaultValue={profile?.address?.regionCode}
                          />
                        ) : (
                          <div className="mb-1">
                            {user?.profile?.address?.regionCode}
                          </div>
                        )}
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <div className="mb-1">
                          {formatMessage({
                            id: 'city',
                            defaultMessage: 'City',
                          })}
                        </div>
                        {updateProfile ? (
                          <input
                            className={`form-control ${
                              errors.city && 'form-error'
                            }`}
                            name="city"
                            defaultValue={profile?.address?.city}
                            ref={register({ required: true })}
                          />
                        ) : (
                          <div className="mb-1">
                            {user?.profile?.address?.city}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <Button
                      text={formatMessage({
                        id: 'update_address',
                        defaultMessage: 'update address',
                      })}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      onClick={() => setUpdateProfile(true)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </section>

          {/* Password */}
          <section
            aria-labelledby="password"
            className="lg:col-span-9 lg:col-start-4"
          >
            <div className="mt-6 bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
              <div className="px-4 sm:px-6">
                <h2
                  id="password"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {formatMessage({
                    id: 'password',
                    defaultMessage: 'Password',
                  })}
                </h2>
              </div>
              <div className="mt-6 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-t border-gray-200">
                      <Link href="account/change-password">
                        <a className="button button--small button--secondary">
                          {formatMessage({
                            id: 'change_password',
                            defaultMessage: 'Change Password',
                          })}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {showDebugInfo && (
            <section
              aria-labelledby="password"
              className="lg:col-span-9 lg:col-start-4"
            >
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span className="mb-1">
                  {formatMessage({
                    id: 'guest',
                    defaultMessage: 'Guest',
                  })}
                </span>
                <span className="mb-1">
                  {user?.isGuest ? (
                    <b>
                      {formatMessage({
                        id: 'yes',
                        defaultMessage: 'Yes',
                      })}
                    </b>
                  ) : (
                    <b>
                      {formatMessage({
                        id: 'no',
                        defaultMessage: 'No',
                      })}
                    </b>
                  )}
                </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                <span className="mb-1">
                  {formatMessage({
                    id: 'number_of_orders',
                    defaultMessage: 'Number Of Orders',
                  })}
                </span>
                <span className="mb-1"> {user?.order?.length || 0}</span>
              </div>
            </section>
          )}
        </div>
      </main>

      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="relative max-w-full flex-3 p-4">
            {updateProfile ? (
              <UpdateProfileForm
                user={user}
                onSuccess={onProfileUpdateComplete}
                onCancel={onProfileUpdateComplete}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
