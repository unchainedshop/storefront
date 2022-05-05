import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import {
  IdentificationIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import useUser from '../../modules/auth/hooks/useUser';
import MetaTags from '../../modules/common/components/MetaTags';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import useRedirect from '../../modules/auth/hooks/useRedirect';
import Address from '../../modules/common/components/Address';
import General from '../../modules/common/components/General';

const subNavigation = [
  { name: 'General', href: '#general', icon: UserCircleIcon, current: true },
  {
    name: 'Address',
    href: '#address',
    icon: IdentificationIcon,
    current: false,
  },
  { name: 'Password', href: '#password', icon: KeyIcon, current: false },
];

const Account = () => {
  const { user } = useUser();
  const { formatMessage } = useIntl();

  useRedirect({ to: '/login', matchAnonymous: true, matchGuests: true });

  const showDebugInfo = true;

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

      <main className="max-w-full bg-slate-100 pb-10 dark:bg-slate-600 lg:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
            <nav className="space-y-1">
              {subNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-slate-50 text-orange-600 hover:bg-white hover:text-slate-900'
                      : 'text-slate-900 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-200',
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? 'text-orange-500'
                        : 'text-slate-400 group-hover:text-slate-500',
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
          <General user={user} />

          {/* Address */}
          <Address user={user} />

          {/* Password */}
          <section
            aria-labelledby="password"
            className="lg:col-span-9 lg:col-start-4"
          >
            <div className="mt-6 bg-white pt-6 shadow dark:bg-slate-500 sm:overflow-hidden sm:rounded-md">
              <div className="px-4 sm:px-6">
                <h2
                  id="password"
                  className="text-lg font-medium leading-6 text-slate-900 dark:text-slate-100"
                >
                  {formatMessage({
                    id: 'password',
                    defaultMessage: 'Password',
                  })}
                </h2>
              </div>
              <div className="mt-6 flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-t border-slate-200 py-8">
                      <Link href="account/change-password">
                        <a className=" text-lg font-medium text-purple-700 hover:text-purple-600 dark:text-purple-400">
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
              <div className="mt-6 bg-white px-4 pt-6 shadow dark:bg-slate-500 dark:text-slate-200 sm:overflow-hidden sm:rounded-md sm:px-6">
                <div className="m-2 flex flex-col sm:flex-row">
                  <span className="mb-1">
                    {formatMessage({
                      id: 'guest',
                      defaultMessage: 'Guest',
                    })}
                  </span>
                  <span className="mx-4 mb-1">
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
                <div className="m-2 flex flex-col sm:flex-row">
                  <span className="mb-1">
                    {formatMessage({
                      id: 'number_of_orders',
                      defaultMessage: 'Number Of Orders',
                    })}
                  </span>
                  <span className="mx-4 mb-1"> {user?.order?.length || 0}</span>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Account;
