import { useIntl } from 'react-intl';

import renderPrice from '../../common/utils/renderPrice';
import CartItem from './CartItem';

const ManageCart = ({ user }) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
        <h3 className="sr-only">
          {formatMessage({
            id: 'items_in_cart',
            defaultMessage: 'Items in your cart',
          })}
        </h3>
        <ul className="divide-y divide-gray-200">
          {(user?.cart?.items || []).map((item) => (
            <CartItem key={item._id} {...item} />
          ))}
        </ul>
      </div>
      <div className="text-right">
        <div className="border-top mt-0 py-3">
          <div className="d-flex justify-content-between flex-wrap">
            <div>{formatMessage({ id: 'vat_included' })} 7.7%</div>
            <div>{renderPrice(user?.cart?.taxes)}</div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="border-top mt-0 py-3">
          <div className="d-flex justify-content-between flex-wrap">
            <div>{formatMessage({ id: 'delivery_charges' })}</div>
            <div>{renderPrice(user?.cart?.delivery)}</div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <h4 className="border-top border-bottom mt-0 py-3">
          <div className="d-flex justify-content-between flex-wrap">
            <div>{formatMessage({ id: 'total_amount' })}</div>
            <div>{renderPrice(user?.cart?.total)}</div>
          </div>
        </h4>
      </div>
    </div>
  );
};

export default ManageCart;
