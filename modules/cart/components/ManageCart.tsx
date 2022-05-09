import { useIntl } from 'react-intl';

import renderPrice from '../../common/utils/renderPrice';
import CartItem from './CartItem';

const ManageCart = ({ user }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="text-slate-700 dark:text-slate-300">
      <div className="mt-4 rounded-lg border border-slate-300 bg-white shadow-sm dark:bg-slate-500">
        <h3 className="sr-only">
          {formatMessage({
            id: 'items_in_cart',
            defaultMessage: 'Items in your cart',
          })}
        </h3>
        <ul className="divide-y divide-slate-300">
          {(user?.cart?.items || []).map((item) => (
            <CartItem key={item._id} {...item} />
          ))}
        </ul>
        <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm">
              {formatMessage({
                id: 'subtotal_vat',
                defaultMessage: 'Subtotal(vat included) 7.7%',
              })}
            </dt>
            <dd className="text-sm font-medium text-gray-900 dark:text-white">
              {renderPrice(user?.cart?.itemsTotal)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">
              {formatMessage({ id: 'shipping', defaultMessage: 'Shipping' })}
            </dt>
            <dd className="text-sm font-medium text-gray-900 dark:text-white">
              {renderPrice(user?.cart?.delivery)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">
              {formatMessage({ id: 'taxes', defaultMessage: 'Taxes' })}
            </dt>
            <dd className="text-sm font-medium text-gray-900 dark:text-white">
              {renderPrice(user?.cart?.taxes)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base font-medium">
              {formatMessage({ id: 'total', defaultMessage: 'Total' })}
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              {renderPrice(user?.cart?.total)}
            </dd>
          </div>
        </dl>

        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
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
