import Link from 'next/link';
import { useContext } from 'react';
import { useIntl } from 'react-intl';

import {
  BookmarkIcon,
  LogoutIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import OrderButton from '../../orders/components/UserOrderButton';
import { CartContext } from '../../cart/CartContext';
import useUser from '../hooks/useUser';

const LoginCart = () => {
  const { user } = useUser();
  const { formatMessage } = useIntl();
  const context = useContext(CartContext);

  return user ? (
    <div className="flex items-center gap-x-3">
      {user?.bookmarks && (
        <Link href="/bookmarks">
          <a className="flex items-center gap-x-3">
            <BookmarkIcon className="h-6 w-6" />
            {user?.bookmarks?.length ? (
              <span>{user?.bookmarks?.length}</span>
            ) : (
              ''
            )}

            <span className="hidden md:block">
              {formatMessage({
                id: 'bookmarks',
                defaultMessage: 'Bookmarks',
              })}
            </span>
          </a>
        </Link>
      )}
      <a
        className="flex cursor-pointer items-center gap-x-3"
        onClick={() => context.toggleCart(!context.isCartOpen)}
      >
        <ShoppingCartIcon className="inline-flex h-6 w-6 select-none items-center justify-center dark:text-white" />

        {user?.cart?.items?.length ? (
          <span className="inline-block rounded-[50%] text-center font-bold leading-relaxed text-slate-900 dark:text-slate-300">
            {user?.cart?.items.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        ) : (
          ''
        )}
        <span className="hidden md:block">
          {formatMessage({ id: 'cart', defaultMessage: 'Cart' })}
        </span>
      </a>
      {user?.isGuest ? (
        <div className="ml-2 md:ml-4">
          <Link href="/sign-up">
            <a className="my-1 mr-4">
              {formatMessage({ id: 'sign_up', defaultMessage: 'Sign Up' })}
            </a>
          </Link>
          <Link href="/login">
            <a className="my-1">
              {formatMessage({ id: 'log_in', defaultMessage: 'Log In' })}
            </a>
          </Link>
        </div>
      ) : (
        <OrderButton />
      )}

      {!user.isGuest ? (
        <>
          <Link href="/account">
            <a className="flex items-center gap-x-3">
              <UserCircleIcon className="inline-flex h-6 w-6 select-none items-center justify-center dark:text-white" />
              <span className="hidden md:block">
                {formatMessage({ id: 'account', defaultMessage: 'Account' })}
              </span>
            </a>
          </Link>
          <Link href="/logout">
            <a className="flex items-center gap-x-3">
              <LogoutIcon className="inline-flex h-6 w-6 select-none items-center justify-center dark:text-white" />
              <span className="hidden md:block">
                {formatMessage({ id: 'log_out', defaultMessage: 'Log Out' })}
              </span>
            </a>
          </Link>
        </>
      ) : (
        ' '
      )}
    </div>
  ) : (
    <div className="flex items-center gap-x-3">
      <Link href="/sign-up">
        <a>{formatMessage({ id: 'sign_up', defaultMessage: 'Sign Up' })}</a>
      </Link>
      <Link href="/login">
        <a>{formatMessage({ id: 'log_in', defaultMessage: 'Log In' })}</a>
      </Link>
    </div>
  );
};

export default LoginCart;
