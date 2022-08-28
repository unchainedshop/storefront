/* eslint-disable no-return-assign */
import Link from 'next/link';
import { useIntl } from 'react-intl';
import {
  IdentificationIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import useUser from '../../modules/auth/hooks/useUser';
import MetaTags from '../../modules/common/components/MetaTags';
import useRedirect from '../../modules/auth/hooks/useRedirect';
import Address from '../../modules/common/components/Address';
import General from '../../modules/common/components/General';
import LoadingItem from '../../modules/common/components/LoadingItem';

const subNavigation = [
  { name: 'General', href: '#general', icon: UserCircleIcon },
  {
    name: 'Address',
    href: '#address',
    icon: IdentificationIcon,
  },
  { name: 'Password', href: '#password', icon: KeyIcon },
];

const Account = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const showDebugInfo = true;
  useRedirect({ to: '/login', matchAnonymous: true, matchGuests: true });

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <>
      <MetaTags
        title={
          user?.username ||
          formatMessage({ id: 'account', defaultMessage: 'Account' })
        }
      />
      <div className="max-w-full bg-slate-100 pb-10 dark:bg-slate-600 lg:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="h-fit py-6 px-2 sm:px-6 lg:sticky lg:top-24 lg:col-span-3 lg:py-0 lg:px-0">
            <nav className="space-y-1 lg:sticky lg:top-24">
              {subNavigation.map((item) => (
                <Link href={item.href} key={item.name}>
                  <a
                    className={classNames(
                      'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 hover:text-indigo-400 dark:bg-slate-600 dark:text-white dark:hover:text-sky-400',
                      {
                        'bg-slate-50 text-indigo-600 hover:bg-white dark:bg-slate-500 dark:text-sky-400':
                          item.name.toLowerCase() ===
                          (router.asPath.includes('#')
                            ? router.asPath.split('#')[1]
                            : 'general'),
                      },
                    )}
                  >
                    <item.icon
                      className={classNames(
                        '-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-slate-400 group-hover:text-indigo-400 dark:group-hover:text-sky-500',
                        {
                          'text-indigo-600 dark:text-sky-400':
                            item.name.toLowerCase() ===
                            (router.asPath.includes('#')
                              ? router.asPath.split('#')[1]
                              : 'general'),
                        },
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                </Link>
              ))}
            </nav>
          </aside>

          {/* General */}
          <General user={user} />

          {/* Address */}
          <Address user={user} />

          {/* Password */}
          <section
            id="password"
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
                        <a className=" text-lg font-medium text-indigo-600 hover:text-indigo-500 dark:text-sky-400 dark:hover:text-sky-500">
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
                  <Link href="/orders">
                    <a className="link mb-1 text-indigo-600 hover:text-indigo-600 dark:text-sky-400 dark:hover:text-sky-500">
                      {formatMessage(
                        {
                          id: 'number_of_orders',
                          defaultMessage: 'Number Of Orders: {count}',
                        },
                        {
                          count: user?.orders?.length || 0,
                        },
                      )}
                    </a>
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
