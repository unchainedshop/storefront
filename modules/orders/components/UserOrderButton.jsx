import Link from 'next/link';
import { useIntl } from 'react-intl';
import Icon from '../../common/components/Icon';

import useUserOrderOrderList from '../hooks/useUserOrderList';

const OrderButton = () => {
  const { orders } = useUserOrderOrderList();
  const { formatMessage } = useIntl();
  if (orders.length === 0) return null;

  return (
    <Link href="/orders">
      <a className="flex items-center">
        <Icon className="mr-2" icon="common-file-stack" />
        <span className="hidden md:block">
          {formatMessage({ id: 'my_orders', defaultMessage: 'My Orders' })}
        </span>
      </a>
    </Link>
  );
};

export default OrderButton;
