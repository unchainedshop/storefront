import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import OrderPriceSummary from '../../checkout/components/OrderPriceSummary';
import useCheckoutCartMutation from '../../checkout/hooks/useCheckoutCart';
import { useAppContext } from '../../common/components/AppContextWrapper';
import CurrencySelector from '../../common/components/CurrencySelector';

import CartItem from './CartItem';

const ManageCart = ({ user }) => {
  const { formatMessage } = useIntl();
  const { checkoutCart } = useCheckoutCartMutation();
  const { replace } = useRouter();
  const { selectedCurrency, changeCurrency } = useAppContext();
  const handleOnClick = async () => {
    try {
      await checkoutCart({
        orderId: user?.cart?._id,
        orderContext: {},
        paymentContext: {},
        deliveryContext: {},
      });
      toast.success(
        formatMessage({
          id: 'checked_out_success',
          defaultMessage: 'Checkout successfully',
        }),
      );

      replace({
        pathname: '/thank-you',
        query: { orderId: user?.cart?._id },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  };

  const canCheckout =
    user &&
    user?.cart &&
    user?.cart?.billingAddress.addressLine &&
    user?.cart?.billingAddress.city &&
    user?.cart?.contact?.emailAddress;

  return (
    <div className="text-slate-700 dark:text-slate-300">
      <div className="mt-4 rounded-lg border border-slate-300 bg-white shadow-sm dark:bg-slate-500">
        <h3 className="sr-only">
          {formatMessage({
            id: 'items_in_cart',
            defaultMessage: 'Items in your cart',
          })}
        </h3>
        <CurrencySelector
          onChange={(e) => {
            changeCurrency(e.target.value);
          }}
          selectedCurrency={selectedCurrency}
        />
        <ul className="divide-y divide-slate-300">
          {(user?.cart?.items || []).map((item) => (
            <CartItem key={item._id} {...item} />
          ))}
        </ul>
        <OrderPriceSummary order={user?.cart} />

        <div className="border-t border-slate-200 py-6 px-4 sm:px-6">
          {!canCheckout ? (
            <p className="p-5 text-center font-bold text-red-400">
              {formatMessage({
                id: 'required_info_missing_for_checkout',
                defaultMessage:
                  'Billing address missing and email are required for successful checkout, please provide this information',
              })}
            </p>
          ) : null}
          <button
            disabled={!canCheckout}
            type="submit"
            onClick={handleOnClick}
            className={classNames(
              'w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-50',
              {
                'bg-indigo-200': !canCheckout,
                'hover:bg-indigo-200': !canCheckout,
              },
            )}
          >
            {formatMessage({
              id: 'confirm',
              defaultMessage: 'Confirm order',
            })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCart;
