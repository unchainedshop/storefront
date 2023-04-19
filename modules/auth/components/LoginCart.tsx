import Link from 'next/link';
import { useIntl } from 'react-intl';

import {
  BookmarkIcon,
  LogoutIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import OrderButton from '../../orders/components/UserOrderButton';
import useUser from '../hooks/useUser';
import { useApollo } from '../../apollo/apolloClient';
import logOut from '../hooks/logOut';
import { useAppContext } from '../../common/components/AppContextWrapper';

const LoginCart = () => {
  const { user } = useUser();
  const { formatMessage } = useIntl();
  const { isCartOpen, toggleCart } = useAppContext();
  const router = useRouter();
  const apollo = useApollo({ locale: router.locale }, {});

  const onLogout = async () => {
    await logOut(apollo);
    router.push('/login');
  };

  return user ? (
    <div className="flex items-center gap-x-3">
      {user?.bookmarks && (
        <Link href="/bookmarks" className="flex items-center gap-x-3">
          <BookmarkIcon className="h-6 w-6" />
          {user?.bookmarks?.length ? (
            <span>{user?.bookmarks?.length}</span>
          ) : (
            ''
          )}

          <span className="hidden lg:block">
            {formatMessage({
              id: 'bookmarks',
              defaultMessage: 'Bookmarks',
            })}
          </span>
        </Link>
      )}
      <a
        className="flex cursor-pointer items-center gap-x-3"
        onClick={() => toggleCart(!isCartOpen)}
      >
        <ShoppingCartIcon className="inline-flex h-6 w-6 select-none items-center justify-center dark:text-white" />

        {user?.cart?.items?.length ? (
          <span className="inline-block rounded-[50%] text-center font-bold leading-relaxed text-slate-900 dark:text-slate-300">
            {user?.cart?.items.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        ) : (
          ''
        )}
        <span className="hidden lg:block">
          {formatMessage({ id: 'cart', defaultMessage: 'Cart' })}
        </span>
      </a>
      {user?.isGuest ? (
        <div className="ml-2 md:ml-4">
          <Link href="/sign-up" className="my-1 mr-4">
            {formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })}
          </Link>
          <Link href="/login" className="my-1">
            {formatMessage({ id: 'log_in', defaultMessage: 'Log In' })}
          </Link>
        </div>
      ) : (
        <OrderButton />
      )}

      {!user.isGuest ? (
        <>
          <Link href="/account" className="flex items-center gap-x-3">
            <UserCircleIcon className="inline-flex h-6 w-6 select-none items-center justify-center dark:text-white" />
            <span className="hidden lg:block">
              {formatMessage({ id: 'account', defaultMessage: 'Account' })}
            </span>
          </Link>

          <a
            className="flex cursor-pointer items-center gap-x-3"
            onClick={async () => {
              await onLogout();
            }}
          >
            <LogoutIcon className="inline-flex h-6 w-6 select-none items-center justify-center dark:text-white" />
            <span className="hidden lg:block">
              {formatMessage({ id: 'log-out', defaultMessage: 'Logout' })}
            </span>
          </a>
        </>
      ) : (
        ' '
      )}
    </div>
  ) : (
    <div className="flex items-center gap-x-3">
      <Link href="/sign-up">
        {formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })}
      </Link>
      <Link href="/login">
        {formatMessage({ id: 'log_in', defaultMessage: 'Log In' })}
      </Link>
    </div>
  );
};

export default LoginCart;
