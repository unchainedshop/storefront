import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  ViewGridAddIcon,
} from '@heroicons/react/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
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

const subNavigation = [
  { name: 'General', href: '#general', icon: UserCircleIcon, current: false },
  { name: 'Account', href: '#account', icon: CogIcon, current: false },
  { name: 'Password', href: '#password', icon: KeyIcon, current: false },
  { name: 'Address', href: '#password', icon: KeyIcon, current: false },
];

const payments = [
  {
    id: 1,
    date: '1/1/2020',
    datetime: '2020-01-01',
    description: 'Business Plan - Annual Billing',
    amount: 'CA$109.00',
    href: '#',
  },
  // More payments...
];

const Account = () => {
  const { user } = useUser();
  const [updateUsername, setUpdateUserName] = useState(false);
  const { formatMessage } = useIntl();
  const [username, setUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [updateProfile, setUpdateProfile] = useState(false);

  const { setUsername } = useSetUsername();
  const { removeEmail } = useRemoveEmail();
  const { addEmail } = useAddEmail();
  const { resendVerificationEmail } = useResendVerificationEmail();

  useRedirect({ to: '/login', matchAnonymous: true, matchGuests: true });

  const showDebugInfo = false;
  const showUsername = user?.roles?.includes('admin');
  const onProfileUpdateComplete = (value) => {
    if (value) setUpdateProfile(false);
  };

  const updateName = async (name) => {
    await setUsername({ username: name, userId: user._id });
    setUpdateUserName(!updateUsername);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

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
          <div
            id="general"
            className="space-y-6 sm:px-6 lg:col-span-9 lg:col-start-4 lg:px-0"
          >
            <section aria-labelledby="payment-details-heading">
              <form action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="bg-white py-6 px-4 sm:p-6">
                    <div className="divide-y divide-gray-200">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Profile
                        </h3>
                        <p className="max-w-2xl text-sm text-gray-500">
                          This information will be displayed publicly so be
                          careful what you share.
                        </p>
                      </div>
                      <div className="mt-6">
                        <div className="divide-y divide-gray-200">
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            {true && (
                              <div className="mb-4 flex flex-wrap items-center justify-between pb-4">
                                <h2 className="my-0 text-sm font-medium capitalize text-gray-500">
                                  {formatMessage({
                                    id: 'username',
                                    defaultMessage: 'username',
                                  })}
                                </h2>
                                {!updateUsername ? (
                                  <>
                                    <span className="my-1 flex text-sm text-gray-900 sm:col-span-2 sm:my-0">
                                      {user?.username ||
                                        formatMessage({
                                          id: 'no_username_set',
                                          defaultMessage: 'No username set',
                                        })}
                                    </span>
                                    <button
                                      type="button"
                                      className="button button--small button--secondary rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                      onClick={() =>
                                        setUpdateUserName(!updateUsername)
                                      }
                                    >
                                      {formatMessage({
                                        id: 'change_username',
                                        defaultMessage: 'Change username',
                                      })}
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <input
                                      className="form-control my-2"
                                      type="text"
                                      onChange={(e) =>
                                        setUserName(e.target.value)
                                      }
                                      value={username}
                                    />
                                    <button
                                      type="button"
                                      className="button button--small button--primary"
                                      onClick={() => updateName(username)}
                                    >
                                      {formatMessage({
                                        id: 'save_username',
                                        defaultMessage: 'Save',
                                      })}
                                    </button>
                                    <button
                                      type="button"
                                      className="button button--small text-danger"
                                      onClick={() =>
                                        setUpdateUserName(!updateUsername)
                                      }
                                    >
                                      {formatMessage({
                                        id: 'cancel',
                                        defaultMessage: 'Cancel',
                                      })}
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <span className="flex-grow">Chelsea Hagon</span>
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Update
                                </button>
                              </span>
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">
                              Photo
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <span className="flex-grow">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                              </span>
                              <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                                <button
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Update
                                </button>
                                <span
                                  className="text-gray-300"
                                  aria-hidden="true"
                                >
                                  |
                                </span>
                                <button
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Remove
                                </button>
                              </span>
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">
                              Email
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <span className="flex-grow">
                                chelsea.hagon@example.com
                              </span>
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Update
                                </button>
                              </span>
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500">
                              Job title
                            </dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <span className="flex-grow">
                                Human Resources Manager
                              </span>
                              <span className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                  Update
                                </button>
                              </span>
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>

          {/* Payment details */}
          <div className="space-y-6 sm:px-6 lg:col-span-9 lg:col-start-4 lg:px-0">
            <section aria-labelledby="payment-details-heading">
              <form action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="bg-white py-6 px-4 sm:p-6">
                    <div>
                      <h2
                        id="payment-details-heading"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Payment details
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Update your billing information. Please note that
                        updating your location could affect your tax rates.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-4 gap-6">
                      <div className="col-span-4 sm:col-span-2">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="cc-given-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="cc-family-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-1">
                        <label
                          htmlFor="expiration-date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Expration date
                        </label>
                        <input
                          type="text"
                          name="expiration-date"
                          id="expiration-date"
                          autoComplete="cc-exp"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                          placeholder="MM / YY"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-1">
                        <label
                          htmlFor="security-code"
                          className="flex items-center text-sm font-medium text-gray-700"
                        >
                          <span>Security code</span>
                          <QuestionMarkCircleIcon
                            className="ml-1 h-5 w-5 flex-shrink-0 text-gray-300"
                            aria-hidden="true"
                          />
                        </label>
                        <input
                          type="text"
                          name="security-code"
                          id="security-code"
                          autoComplete="cc-csc"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ZIP / Postal code
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </section>

            {/* Plan */}

            {/* Billing history */}
            <section aria-labelledby="billing-history-heading">
              <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
                <div className="px-4 sm:px-6">
                  <h2
                    id="billing-history-heading"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Billing history
                  </h2>
                </div>
                <div className="mt-6 flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Description
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Amount
                              </th>
                              {/*
                                  `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                */}
                              <th
                                scope="col"
                                className="relative px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                <span className="sr-only">View receipt</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {payments.map((payment) => (
                              <tr key={payment.id}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                  <time dateTime={payment.datetime}>
                                    {payment.date}
                                  </time>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {payment.description}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {payment.amount}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <a
                                    href={payment.href}
                                    className="text-orange-600 hover:text-orange-900"
                                  >
                                    View receipt
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="relative max-w-full flex-3 p-4">
            <h1 className="my-12 dark:text-white">
              {formatMessage({ id: 'account', defaultMessage: 'Account' })}
            </h1>
            {updateProfile ? (
              <UpdateProfileForm
                user={user}
                onSuccess={onProfileUpdateComplete}
                onCancel={onProfileUpdateComplete}
              />
            ) : (
              <div className="-mx-4 flex flex-wrap">
                <div className="col-md-6 relative w-full p-4 md:max-w-1/2 md:flex-2">
                  {showUsername && (
                    <div className="d-flex align-items-center justify-content-between border-bottom mb-2 mb-3 flex-wrap pb-3">
                      <h2 className="my-0">
                        {formatMessage({
                          id: 'username',
                          defaultMessage: 'username',
                        })}
                      </h2>
                      {!updateUsername ? (
                        <>
                          <span className="mb-1">
                            {user?.username ||
                              formatMessage({
                                id: 'no_username_set',
                                defaultMessage: 'No username set',
                              })}
                          </span>
                          <button
                            type="button"
                            className=" button button--small button--secondary"
                            onClick={() => setUpdateUserName(!updateUsername)}
                          >
                            {formatMessage({
                              id: 'change_username',
                              defaultMessage: 'Change username',
                            })}
                          </button>
                        </>
                      ) : (
                        <>
                          <input
                            className="form-control my-2"
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                          />
                          <button
                            type="button"
                            className="button button--small button--primary"
                            onClick={() => updateName(username)}
                          >
                            {formatMessage({
                              id: 'save_username',
                              defaultMessage: 'Save',
                            })}
                          </button>
                          <button
                            type="button"
                            className="button button--small text-danger"
                            onClick={() => setUpdateUserName(!updateUsername)}
                          >
                            {formatMessage({
                              id: 'cancel',
                              defaultMessage: 'Cancel',
                            })}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  <div className="d-flex align-items-center justify-content-between border-bottom mb-2 flex-wrap pb-3">
                    <h2 className="d-inline-block my-0 mr-3">
                      {formatMessage({
                        id: 'password',
                        defaultMessage: 'Password',
                      })}
                    </h2>
                    <Link href="account/change-password">
                      <a className="button button--small button--secondary">
                        {formatMessage({
                          id: 'change_password',
                          defaultMessage: 'Change Password',
                        })}
                      </a>
                    </Link>
                  </div>
                  <div>
                    <h2>
                      {formatMessage({ id: 'email', defaultMessage: 'Email' })}
                    </h2>
                    {user?.emails?.map((e, i) => (
                      <div key={e.address} className="border-bottom mb-2 pb-1">
                        <label className="form-label mb-1">
                          {i + 1}.{' '}
                          {formatMessage({
                            id: 'email',
                            defaultMessage: 'Email',
                          })}
                        </label>
                        <span className="d-flex justify-content-between align-items-center mb-1 flex-wrap">
                          {e.address}
                          {e.verified ? (
                            <span className="pill-success m-2">
                              <span className="pill px-2 py-1">
                                {formatMessage({
                                  id: 'verified',
                                  defaultMessage: 'Verified',
                                })}
                              </span>
                            </span>
                          ) : (
                            <>
                              <span className="pill-warning m-2">
                                <span className="pill px-2 py-1">
                                  {formatMessage({
                                    id: 'not_verified',
                                    defaultMessage: 'Not Verified',
                                  })}
                                </span>
                              </span>
                              <button
                                type="button"
                                className="button button--small button--primary my-2"
                                onClick={() =>
                                  resendVerificationEmail(e.address)
                                }
                              >
                                {formatMessage({
                                  id: 'resend_verification',
                                  defaultMessage: 'Resend Verification Email',
                                })}
                              </button>
                            </>
                          )}
                          {user?.emails?.length > 1 && (
                            <button
                              type="button"
                              className="button button--small button--secondary my-2"
                              onClick={() => removeEmail(e.address)}
                            >
                              {formatMessage({
                                id: 'remove_email',
                                defaultMessage: 'Remove Email',
                              })}
                            </button>
                          )}
                        </span>
                      </div>
                    ))}
                    <div className="form-row">
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
                    </div>
                    <button
                      type="button"
                      className="button button--small button--secondary mt-2 mb-5"
                      onClick={() => addEmail(newEmail)}
                    >
                      {formatMessage({
                        id: 'add_email',
                        defaultMessage: 'Add Email',
                      })}
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h2 className="my-0">Address</h2>
                    {!updateProfile && (
                      <button
                        type="button"
                        className="button button--small button--secondary"
                        onClick={() => setUpdateProfile(true)}
                      >
                        {formatMessage({
                          id: 'change_address',
                          defaultMessage: 'change address',
                        })}
                      </button>
                    )}
                  </div>
                  {showDebugInfo && (
                    <>
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
                        <span className="mb-1">
                          {' '}
                          {user?.order?.length || 0}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {formatMessage({
                        id: 'first_name',
                        defaultMessage: 'First Name',
                      })}
                    </span>
                    <span className="mb-1">
                      {user?.profile?.address?.firstName}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {formatMessage({
                        id: 'last_name',
                        defaultMessage: 'Last Name',
                      })}
                    </span>
                    <span className="mb-1">
                      {user?.profile?.address?.lastName}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {formatMessage({
                        id: 'company',
                        defaultMessage: 'Company',
                      })}
                    </span>
                    <span className="mb-1">
                      {user?.profile?.address?.Company}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {formatMessage({
                        id: 'address',
                        defaultMessage: 'Address',
                      })}
                    </span>
                    <span className="mb-1">
                      {' '}
                      {user?.profile?.address?.addressLine}{' '}
                      {user?.profile?.address?.addressLine2 && (
                        <>
                          <br />
                          {user?.profile?.address?.addressLine2}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {formatMessage({
                        id: 'telephone',
                        defaultMessage: 'Telephone',
                      })}
                    </span>
                    <span className="mb-1"> {user?.profile?.phoneMobile} </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {formatMessage({
                        id: 'postal_code',
                        defaultMessage: 'Postal Code',
                      })}
                    </span>
                    <span className="mb-1">
                      {' '}
                      {user?.profile?.address?.postalCode}{' '}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {formatMessage({ id: 'city', defaultMessage: 'City' })}
                    </span>
                    <span className="mb-1">
                      {' '}
                      {user?.profile?.address?.city}{' '}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {formatMessage({
                        id: 'region',
                        defaultMessage: 'Region',
                      })}
                    </span>
                    <span className="mb-1">
                      {' '}
                      {user?.profile?.address?.regionCode}{' '}
                    </span>
                  </div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
                    <span className="mb-1">
                      {formatMessage({
                        id: 'country',
                        defaultMessage: 'Country',
                      })}
                    </span>
                    <span className="mb-1">
                      {
                        COUNTRIES.filter(
                          (c) => c.code === user?.profile?.address?.countryCode,
                        )[0]?.name
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
