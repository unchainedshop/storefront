import { useContext } from 'react';
import Link from 'next/link';

import { useIntl } from 'react-intl';
import { XIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import renderPrice from '../../common/utils/renderPrice';
import useUser from '../../auth/hooks/useUser';
import { CartContext } from '../CartContext';
import Icon from '../../common/components/Icon';
import CartItem from './CartItem';

const SideCart = ({ isOpen }) => {
  const { user } = useUser();
  const intl = useIntl();
  const context = useContext(CartContext);

  const subtotal = (user?.cart?.items || []).reduce(
    (acc, item) => {
      return {
        ...acc,
        amount: acc.amount + (item?.total?.amount || 0),
      };
    },
    {
      currency: user?.cart?.itemsTotal?.currency,
      amount: 0,
    },
  );
  return (
    <>
      <div
        className={`${isOpen ? 'overlay' : ''} `}
        onClick={() => context.toggleCart()}
      />
      {!user?.cart?.items.length ? (
        <>
          <div
            className={`fixed top-0 right-[-350px] z-[2000] h-full w-[300px] overflow-y-auto bg-white py-4 px-2 text-center shadow-md transition dark:bg-slate-600 lg:right-[450px] lg:w-[-400px] ${
              isOpen ? 'right-0' : ''
            }`}
          >
            <Icon icon="shopping-bag-sad" />
            <p>
              {intl.formatMessage({ id: 'no_product_in_cart' })}{' '}
              <Link href="/shop">
                <a onClick={() => context.toggleCart(false)} className="link">
                  {intl.formatMessage({ id: 'shop' })}
                </a>
              </Link>
            </p>
          </div>
        </>
      ) : (
        <>
          <div
            className={classNames(
              'side-cart-container flex flex-col px-1 dark:bg-slate-900',
              {
                open: isOpen,
              },
            )}
          >
            <div>
              <div className="relative">
                <button
                  aria-label={intl.formatMessage({ id: 'close' })}
                  type="button"
                  className="absolute cursor-pointer appearance-none bg-inherit p-2 text-left text-inherit"
                  onClick={() => context.toggleCart()}
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </div>
              <h3 className="m-0 block p-4 text-center text-lg">
                {intl.formatMessage({ id: 'in_cart' })}
              </h3>
            </div>
            <div className="cart-item-container px-2">
              {user?.cart?.items.length === 0 ? (
                <p>
                  {intl.formatMessage({ id: 'no_product_in_cart' })}{' '}
                  <Link href="/shop">
                    <a
                      onClick={() => context.toggleCart(false)}
                      className="link"
                      href="#"
                    >
                      {intl.formatMessage({ id: 'shop' })}.
                    </a>
                  </Link>
                </p>
              ) : (
                (user?.cart?.items || []).map((item) => (
                  <CartItem key={item._id} {...item} />
                ))
              )}
            </div>
            <div className="p-2 text-center text-slate-900">
              <div className="my-0 mb-4 border-t border-b-0 border-solid py-4">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="mr-2">
                    {intl.formatMessage({ id: 'subtotal' })}{' '}
                  </div>
                  <div>{renderPrice(subtotal)}</div>
                </div>
              </div>
              <Link href={{ pathname: '/review' }}>
                <a
                  className="button button--primary button--big w-75 mb-4 uppercase text-slate-900"
                  onClick={() => context.toggleCart(false)}
                >
                  {intl.formatMessage({ id: 'to_checkout' })}
                </a>
              </Link>
              <Link
                href={`${
                  localStorage.getItem('lastVisitedCategory') || '/shop'
                }`}
              >
                <a
                  className="button button--secondary text-uppercase w-75 mb-3"
                  onClick={() => context.toggleCart(false)}
                >
                  {intl.formatMessage({ id: 'continue_shopping' })}
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SideCart;
