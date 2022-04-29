import { useContext } from 'react';
import Link from 'next/link';

import { useIntl } from 'react-intl';
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
            className={`side-cart-container py-4 px-2 text-center ${
              isOpen ? 'open' : ''
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
            className={`side-cart-container flex flex-col px-1 ${
              isOpen ? 'open' : ''
            }`}
          >
            <div>
              <div className="relative">
                <button
                  aria-label={intl.formatMessage({ id: 'close' })}
                  type="button"
                  className="no-button close-cart-button absolute p-2"
                  onClick={() => context.toggleCart()}
                >
                  <Icon className="h-3.5 w-3.5" icon="close" />
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
            <div className="p-2 text-center">
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
                  className="button button--primary button--big w-75 mb-4 uppercase"
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
